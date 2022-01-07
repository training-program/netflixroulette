const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isDevMode = process.env.NODE_ENV !== 'production';
const public = dest => path.resolve(__dirname, `public/${dest}`);
const styleLoader = isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
  mode: isDevMode ? 'development' : 'production',
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/main.[contenthash:8].js',
    chunkFilename: 'static/js/[id].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[name].[hash:8][ext]',
    publicPath: 'auto',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: public`/index.html`,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: public``,
          to: '',
          globOptions: {
            ignore: ['**/*.html'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/main.[contenthash:8].css',
      chunkFilename: 'static/css/[id].[contenthash:8].chunk.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [styleLoader, 'css-loader'],
      },
      {
        test: /\.s[ca]ss$/i,
        use: [styleLoader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  target: 'browserslist',
  devtool: isDevMode ? 'eval-nosources-cheap-module-source-map' : false,
  devServer: {
    port: 'auto',
    hot: true,
    open: true,
    client: {
      progress: true,
    },
  },
};
