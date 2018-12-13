module.exports = {
    entry: './src/client/app/index.js',
    output: {
        path: __dirname + '/src/client/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    } 
};