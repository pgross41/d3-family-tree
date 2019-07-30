const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const packageDotjson = require('./package.json');
const packageName = packageDotjson.name;
const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack'); // eslint-disable-line no-unused-vars

module.exports = (env, argv) => {
    console.log(env);
    const production = argv.mode === 'production';
    return {
        mode: argv.mode,
        devServer: {
            publicPath: '/dist/',
            open: true,
            openPage: 'dist/index.html'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: production ? MiniCssExtractPlugin.loader : 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: production ? '[hash:base64:5]' : '[path][name]_[local]',
                                context: path.resolve(__dirname, 'src')
                            },
                        }
                    ]
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `style.css`,
            }),
        ]
    };
};