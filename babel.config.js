"use strict";

module.exports = function(api) {
    if (api === undefined) {
        return {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            node: "current",
                            esmodules: false,
                        },
                        useBuiltIns: "entry",
                        corejs: 3,
                        modules: "commonjs",
                    },
                ],
                "@babel/preset-react",
                "@babel/preset-typescript",
            ],
            plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-transform-runtime",
                "react-hot-loader/babel",
                "@babel/plugin-syntax-dynamic-import",
            ],
        };
    }
    const { NODE_ENV = "development", SERVER = "true" } = process.env;
    api.cache(() => NODE_ENV && SERVER);

    if (SERVER === "true") {
        if (NODE_ENV === "production") {
            return {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            targets: {
                                node: "current",
                                esmodules: false,
                            },
                            useBuiltIns: "entry",
                            corejs: 3,
                            modules: "commonjs",
                        },
                    ],
                    "@babel/preset-typescript",
                ],
                plugins: [
                    ["transform-remove-console"],
                    "@babel/plugin-syntax-dynamic-import",
                    "@babel/plugin-transform-runtime",
                    ["@babel/plugin-transform-async-to-generator"],
                    ["minify-mangle-names"],
                    ["@babel/plugin-transform-object-super"],
                    ["transform-remove-debugger"],
                ],
            };
        }

        api.async();
        return {
            presets: ["@babel/preset-typescript"],
            plugins: ["@babel/plugin-transform-modules-commonjs"],
        };
    }

    if (SERVER === "false") {
        if (NODE_ENV === "production") {
            return {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            targets: {
                                node: "current",
                            },
                            useBuiltIns: "entry",
                            corejs: 3,
                            modules: false,
                        },
                    ],
                    "@babel/preset-react",
                    "@babel/preset-typescript",
                ],
                plugins: [
                    "@babel/plugin-transform-runtime",
                    ["@babel/plugin-syntax-dynamic-import"],
                    ["@babel/plugin-transform-async-to-generator"],
                    ["@babel/plugin-proposal-object-rest-spread"],
                    ["@babel/plugin-transform-object-super"],
                    ["@babel/plugin-transform-function-name"],
                    ["@babel/plugin-transform-block-scoping"],
                    "@babel/plugin-syntax-dynamic-import",
                ],
            };
        }

        if (NODE_ENV === "development") {
            return {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            targets: {
                                node: "current",
                                esmodules: true,
                            },
                            useBuiltIns: "entry",
                            corejs: 3,
                            modules: false,
                        },
                    ],
                    "@babel/preset-react",
                    "@babel/preset-typescript",
                ],
                plugins: [
                    "@babel/plugin-transform-runtime",
                    "@babel/plugin-transform-modules-commonjs",
                    "react-hot-loader/babel",
                    ["@babel/plugin-syntax-dynamic-import"],
                ],
            };
        }

        if (NODE_ENV === "test") {
            return {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            targets: {
                                node: "current",
                                esmodules: false,
                            },
                            useBuiltIns: "entry",
                            corejs: 3,
                            modules: "commonjs",
                        },
                    ],
                    "@babel/preset-react",
                    "@babel/preset-typescript",
                ],
                plugins: [
                    ["@babel/plugin-syntax-dynamic-import"],
                    [
                        "@babel/plugin-transform-runtime",
                        { corejs: { version: 3, proposals: true }, useESModules: false },
                    ],
                    "react-hot-loader/babel",
                ],
            };
        }
    }
};
