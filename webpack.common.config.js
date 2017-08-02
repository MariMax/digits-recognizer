const path = require('path');
const outDir = require('./tsconfig.json').compilerOptions.outDir;
const entry = require('./package.json').main;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, outDir)
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".css", ".js", ".json"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.ts$/, loader: "awesome-typescript-loader" },
      {
        test: /\.css$/, use: ExtractTextWebpackPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader'
        })
      },
      // { test: /\.wasm$/, loader: 'file-loader' },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new ExtractTextWebpackPlugin('style.css')
  ]
}