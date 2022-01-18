const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isDevMode = process.env.NODE_ENV !== 'production';
const public = dest => path.resolve(__dirname, `public/${dest}`);
const styleLoaders = (...loaders) =>
  [
    isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
    isDevMode
      ? {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: '[local]-[hash:base64:5]',
            },
          },
        }
      : 'css-loader',
    ...loaders,
  ].filter(_ => _);

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
        use: styleLoaders(),
      },
      {
        test: /\.s[ca]ss$/i,
        use: styleLoaders('sass-loader'),
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
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, './src/assets'),
      Scss: path.resolve(__dirname, './src/scss'),
      Utils: path.resolve(__dirname, './src/utils'),
    },
  },
  target: 'browserslist',
  devtool: isDevMode ? 'eval-nosources-cheap-module-source-map' : false,
  devServer: {
    port: 'auto',
    hot: true,
    open: true,
  },
};
