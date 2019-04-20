const path = require('path');

module.exports = {
    target: "web",
    entry: {
        app: ["./public/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle-front.js",
    },
    devtool: 'inline-source-map',
}