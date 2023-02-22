const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isDevMode = process.env.NODE_ENV !== 'production';
const publicPath = (dest) => path.resolve(__dirname, `public/${dest}`);
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
  ].filter((_) => _);

module.exports = {
  mode: isDevMode ? 'development' : 'production',
  context: path.resolve(__dirname, 'src'),
  entry: ['./index.css', './index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/main.[contenthash:8].js',
    chunkFilename: 'static/js/[id].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[name].[hash:8][ext]',
    publicPath: '/',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: publicPath`/index.html`,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: publicPath``,
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
    new ESLintPlugin({
      threads: true,
      extensions: ['js', 'ts', 'tsx'],
    }),
    new ForkTsCheckerWebpackPlugin({ typescript: { configFile: '../tsconfig.json' } }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: styleLoaders('postcss-loader'),
      },
      {
        test: /\.s[ca]ss$/i,
        use: styleLoaders('postcss-loader', 'sass-loader'),
      },
      {
        test: /\.jsx?$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.tsx?$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: isDevMode
          ? {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            }
          : { loader: 'ts-loader' },
      },
    ],
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      symlinks: false,
      cacheWithContext: false,
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  target: 'browserslist',
  devtool: isDevMode ? 'eval-nosources-cheap-module-source-map' : false,
  devServer: {
    port: 'auto',
    hot: true,
    open: true,
    client: {
      overlay: false,
    },
    historyApiFallback: true,
  },
  cache: { type: 'filesystem' },
};
