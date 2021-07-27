const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    main: path.join(__dirname, 'src', 'index.tsx'),
  },
  target: 'web',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.[contenthash].js', // Adds a hash code when there are changes on the code
    publicPath: '',
    assetModuleFilename: '[path][name].[contenthash].[ext]',
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: 'src/images/favicon.ico',
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|jpg|jpeg|png|gif|mp3)$/,
        exclude: [path.resolve(__dirname, 'src/icon'), /node_modules\/(?!(@paladin-cyber\/.*)|@paladin-cyber\/?$)/],
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/@paladin-cyber/paladin-design')],
        type: 'asset/inline'
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};