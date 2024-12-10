const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: "bundle.js",
    assetModuleFilename: 'assets/[name][ext]',
    publicPath: '/dist/',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.png'
    })
  ],
  devServer: {
    port: 5000,
    static: [
      path.join(__dirname, '/dist')
    ],
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {targets: {node: 'current'}}],
              ["@babel/preset-react", {runtime: "automatic"}]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        type: 'asset/resource',
      }
    ]
  }
}