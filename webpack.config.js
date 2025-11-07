import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true, // очищает dist при каждой сборке
  },
  mode: 'development',
  devServer: {
    static: './dist',
    open: true,
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      // HTML
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // CSS
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // Изображения и иконки
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
