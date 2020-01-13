module.exports = function(config) {
    config.set({
        mochaOptions: {
            files: ["./test/mocha/**/*.test.ts"],
            opts: "./test/mocha.opts",
            ui: "bdd",
            require: ["ts-node/register", "source-map-support/register"],
            asyncOnly: false,
        },
        mutator: "typescript",
        packageManager: "npm",
        reporters: ["html", "clear-text", "progress", "dashboard"],
        testRunner: "mocha",
        transpilers: ["babel"],
        testFramework: "mocha",
        coverageAnalysis: "off",
        tsconfigFile: "tsconfig.server.json",
        mutate: ["!src/client/*", "!src/types/*", "src/**/*.ts"],
        babel: {
            optionsFile: './babel.config.js',
            options: {
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
                    "@babel/preset-react",
                    "@babel/preset-typescript"
                ],
                plugins: [
                    ["@babel/plugin-syntax-dynamic-import"],
                    ["@babel/plugin-transform-runtime"],
                    "react-hot-loader/babel"
                ]
            },
            // Add extensions here
            extensions: '.ts'
        },
        transpilers: [
            'babel'
        ],

    });
};
