"use strict";

module.exports = function (api) {
    const {NODE_ENV="development", SERVER="true"} = process.env;
    api.cache(() => NODE_ENV && SERVER);

    if (SERVER === "true") {
        if (NODE_ENV === "production") {
            return {
                presets: [
                    ["@babel/preset-env", {
                        targets: {
                            node: "current",
                            esmodules: false
                        },
                        useBuiltIns: "entry",
                        corejs: 3,
                        modules: "commonjs"
                    }],
                    "@babel/preset-typescript"
                ],
                plugins: [
                    ["transform-remove-console"],
                    "@babel/plugin-transform-runtime",
                    ["@babel/plugin-transform-async-to-generator"],
                    ["minify-mangle-names"],
                    ["@babel/plugin-transform-object-super"] ,
                    ["transform-remove-debugger"]
                ]
            }
        }

        api.async();
        return {
            presets: [
                "@babel/preset-typescript"
            ],
            plugins: [
                "@babel/plugin-transform-modules-commonjs"
            ]
        }
    }
};