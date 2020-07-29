const fetch = require("@dollarshaveclub/node-fetch");
const Request = fetch.Request;
const Response = fetch.Response;
const Headers = fetch.Headers;

async function fetchShim(...args) {
  let req = new Request(...args);

  // In Cloudflare Workers, host header
  // is ignored
  req.headers.delete("host");

  // In Cloudflare, no upstream requests
  // get streamed so read the entire body in and
  // create a new request with that body.
  // Techinically, this can be disabled by Cloudflare support
  // but it's enabled by default so we will use that as
  // our behavior.
  if (req.body) {
    const body = await req.arrayBuffer();
    req = new Request(req, { body: body });
  }

  const resp = await fetch(req);
  return new ShimResponse(resp.body, resp);
}

class ShimResponse extends Response {
  static redirect(url, status) {
    return new ShimResponse("", {
      status: status || 302,
      headers: { Location: url },
    });
  }

  clone() {
    const cloned = super.clone();
    return new ShimResponse(cloned.body, {
      url: cloned.url,
      status: cloned.status,
      statusText: cloned.statusText,
      headers: cloned.headers,
      ok: cloned.ok,
    });
  }
}

class ShimRequest extends Request {
  clone() {
    return new ShimRequest(super.clone());
  }
}

module.exports.fetch = fetchShim;
module.exports.Request = ShimRequest;
module.exports.Response = ShimResponse;
module.exports.Headers = Headers;
