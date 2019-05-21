const path = require("path");

module.exports = {
    mode: 'development',
    entry:{index :"./src/app.js",detail:"./src/appBeerDetail.js", add:"./src/appAddBeer"},
    output: {
        path: path.resolve(__dirname, "public/js"),
        filename: "[name]-bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["babel-preset-env"]
                    }
                }
            }
        ]
    }
};
