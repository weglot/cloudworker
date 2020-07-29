class StubCacheFactory {
  constructor() {
    Object.defineProperty(this, "default", {
      value: new StubCache(),
      writable: false,
    });
  }

  // eslint-disable-next-line no-unused-vars
  open(name) {
    return new StubCache();
  }
}

class StubCache {
  // eslint-disable-next-line no-unused-vars
  async put(req, resp) {
    return undefined;
  }

  // eslint-disable-next-line no-unused-vars
  async match(request, options) {
    return undefined;
  }
  // eslint-disable-next-line no-unused-vars
  async delete(request, options) {
    return false;
  }
}

module.exports = StubCacheFactory;
module.exports._StubCache = StubCache;
