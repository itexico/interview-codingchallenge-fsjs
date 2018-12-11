module.exports = {
    entry:'./client/src/app/index.js',
    output: {
        path: __dirname + '/client/src/public',
        filename: 'bundle.js'
    },
    module: {
        rules:[
            {
                use: 'babel-loader',
                test:/\.js$/,
                exclude: /node_modules/
            }
        ]
    }
    
};