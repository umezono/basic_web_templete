module.exports = function (api) {
  api.cache(true);

  const presets = [
    ["@babel/preset-env", {
      "targets": {
        "node": "current",
        // "browsers": [
        //   "last 2 versions",
        //   "> 5%"
        // ]
      },
      "include": []
    }]
  ];
  const plugins = [];

  return {
    presets,
    plugins
  };
}