"use strict";

const isWsl = require("is-wsl");
const path = require("path");
const webpack = require("webpack");
const resolve = require("resolve");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");
const ManifestPlugin = require("webpack-manifest-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin");
const ForkTsCheckerWebpackPlugin = require("react-dev-utils/ForkTsCheckerWebpackPlugin");
const typescriptFormatter = require("react-dev-utils/typescriptFormatter");
const postcssNormalize = require("postcss-normalize");
process.env.SERVER = "false";
process.env.NODE_ENV = "production";

const vars = require("./vars");
const env = vars("/", new RegExp(/^CLIENT_/i));

const appPackageJson = require(path.join(__dirname, "../package.json"));

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || "10000");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const isEnvProduction = process.env.NODE_ENV === "production";

const isEnvProductionProfile = isEnvProduction && process.argv.includes("--profile");

const publicPath = "/";

const shouldUseRelativeAssetPaths = publicPath === "./";

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: shouldUseRelativeAssetPaths ? { publicPath: "../../" } : {},
        },
        {
            loader: require.resolve("css-loader"),
            options: cssOptions,
        },
        {
            loader: require.resolve("postcss-loader"),
            options: {
                ident: "postcss",
                plugins: () => [
                    require("postcss-flexbugs-fixes"),
                    require("postcss-preset-env")({
                        autoprefixer: {
                            flexbox: "no-2009",
                        },
                        stage: 3,
                    }),

                    postcssNormalize(),
                ],
                sourceMap: isEnvProduction && shouldUseSourceMap,
            },
        },
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push(
            {
                loader: require.resolve("resolve-url-loader"),
                options: {
                    sourceMap: isEnvProduction && shouldUseSourceMap,
                },
            },
            {
                loader: require.resolve(preProcessor),
                options: {
                    sourceMap: true,
                },
            }
        );
    }
    return loaders;
};

module.exports = {
    mode: "production",

    bail: true,
    devtool: shouldUseSourceMap ? "source-map" : false,

    entry: path.join(__dirname, "../src/client/prod.ts"),
    output: {
        path: path.join(__dirname, "../build"),

        pathinfo: false,

        filename: "static/js/[name].[contenthash:8].js",

        futureEmitAssets: true,

        chunkFilename: "static/js/[name].[contenthash:8].chunk.js",

        publicPath,

        devtoolModuleFilenameTemplate: (info) =>
            path.relative(path.join(__dirname, "../src/"), info.absoluteResourcePath).replace(/\\/g, "/"),

        jsonpFunction: `webpackJsonp${appPackageJson.name}`,

        globalObject: "this",
    },
    optimization: {
        minimize: isEnvProduction,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,

                        comparisons: false,

                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },

                    keep_classnames: isEnvProductionProfile,
                    keep_fnames: isEnvProductionProfile,
                    output: {
                        ecma: 5,
                        comments: false,

                        ascii_only: true,
                    },
                },

                parallel: !isWsl,

                cache: true,
                sourceMap: shouldUseSourceMap,
            }),

            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: shouldUseSourceMap
                        ? {
                              inline: false,

                              annotation: true,
                          }
                        : false,
                },
            }),
        ],

        splitChunks: {
            chunks: "all",
            name: false,
        },

        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
    },
    resolve: {
        modules: ["node_modules", path.join(__dirname, "../node_modules/")].concat([]),

        extensions: ["ts", "tsx", "js", "jsx"].map((ext) => `.${ext}`).filter((ext) => true || !ext.includes("ts")),
        alias: {
            "react-native": "react-native-web",
            "react-dom$": "react-dom/profiling",
            "scheduler/tracing": "scheduler/tracing-profiling",
        },
        plugins: [new ModuleScopePlugin(path.join(__dirname, "../src/"), [path.join(__dirname, "../package.json")])],
    },

    module: {
        strictExportPresence: true,
        rules: [
            { parser: { requireEnsure: false } },

            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve("url-loader"),
                        options: {
                            limit: imageInlineSizeLimit,
                            name: "static/media/[name].[hash:8].[ext]",
                        },
                    },

                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: path.join(__dirname, "../src/"),
                        loader: require.resolve("babel-loader"),
                        options: {
                            customize: require.resolve("babel-preset-react-app/webpack-overrides"),

                            plugins: [
                                [
                                    require.resolve("babel-plugin-named-asset-import"),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent: "@svgr/webpack?-svgo,+titleProp,+ref![path]",
                                            },
                                        },
                                    },
                                ],
                            ],

                            cacheDirectory: true,

                            cacheCompression: false,
                            compact: true,
                        },
                    },

                    {
                        test: /\.(js|mjs)$/,
                        exclude: /@babel(?:\/|\\{1,2})runtime/,
                        loader: require.resolve("babel-loader"),
                        options: {
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            presets: [[require.resolve("babel-preset-react-app/dependencies"), { helpers: true }]],
                            cacheDirectory: true,

                            cacheCompression: false,

                            sourceMaps: false,
                        },
                    },

                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        use: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: isEnvProduction && shouldUseSourceMap,
                        }),

                        sideEffects: true,
                    },

                    {
                        test: cssModuleRegex,
                        use: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: isEnvProduction && shouldUseSourceMap,
                            modules: true,
                            getLocalIdent: getCSSModuleLocalIdent,
                        }),
                    },

                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: getStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: isEnvProduction && shouldUseSourceMap,
                            },
                            "sass-loader"
                        ),

                        sideEffects: true,
                    },

                    {
                        test: sassModuleRegex,
                        use: getStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: isEnvProduction && shouldUseSourceMap,
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent,
                            },
                            "sass-loader"
                        ),
                    },

                    {
                        loader: require.resolve("file-loader"),

                        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.css$/, /\.ejs$/],
                        options: {
                            name: "static/media/[name].[hash:8].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(
            Object.assign(
                {},

                {
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                    },
                    template: path.join(__dirname, "../public/index.html"),
                }
            )
        ),

        new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

        new ModuleNotFoundPlugin(path.join(__dirname, "../src/")),

        new webpack.DefinePlugin(env.stringified),

        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css",
            chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),

        new ManifestPlugin({
            fileName: "asset-manifest.json",
            publicPath: publicPath,
            generate: (seed, files, entrypoints) => {
                const manifestFiles = files.reduce((manifest, file) => {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);
                const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith(".map"));

                return {
                    files: manifestFiles,
                    entrypoints: entrypointFiles,
                };
            },
        }),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            exclude: [/\.map$/, /asset-manifest\.json$/],
            importWorkboxFrom: "cdn",
            navigateFallback: "/index.html",
            navigateFallbackBlacklist: [new RegExp("^/_"), new RegExp("/[^/?]+\\.[^/]+$")],
        }),

        new ForkTsCheckerWebpackPlugin({
            typescript: resolve.sync("typescript", {
                basedir: path.join(__dirname, "../node_modules/"),
            }),
            async: false,
            useTypescriptIncrementalApi: true,
            checkSyntacticErrors: true,
            resolveModuleNameModule: undefined,
            resolveTypeReferenceDirectiveModule: undefined,
            tsconfig: path.join(__dirname, "../tsconfig.client.json"),
            reportFiles: [
                "**",
                "!**/__tests__/**",
                "!**/?(*.)(spec|test).*",
                "!**/src/setupProxy.*",
                "!**/src/setupTests.*",
            ],
            silent: false,

            formatter: typescriptFormatter,
        }),
    ].filter(Boolean),

    node: {
        module: "empty",
        dgram: "empty",
        dns: "mock",
        fs: "empty",
        http2: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty",
    },

    performance: false,
};
