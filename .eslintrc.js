module.exports = {
  extends: ["eslint:recommended"],
  rules: {
    "prettier/prettier": "error",
    "no-console": 0,
  },
  parserOptions: {
    ecmaVersion: 11,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ["jest", "prettier"],
  env: {
    node: true,
    browser: true,
    commonjs: true,
    jest: true,
    es6: true,
  },
  globals: {
    WebAssembly: true,
    Atomics: true,
    BigInt: true,
    BigInt64Array: true,
    BigUint64Array: true,
    SharedArrayBuffer: true,
  },
};
