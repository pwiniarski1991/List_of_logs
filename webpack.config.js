const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules | browser_components)/,
                loader: 'babel-loader',
                options: { presets: ['env'] }
            },
            {
                test: /\.css$/,
                include: [/node_modules/],
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: [ 
                    'style-loader',
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                          importLoaders: 1,
                          modules: true,
                          localIdentName: "[name]__[local]___[hash:base64:5]"  
                        }
                    },
                ]
            }
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        path: path.resolve(__dirname,'dist/'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname,'public/'),
        port: 3000,
        publicPath: 'http://localhost:3000/dist/',
        hotOnly: true
    },
    plugins: [ 
        new webpack.HotModuleReplacementPlugin()
    ]
};