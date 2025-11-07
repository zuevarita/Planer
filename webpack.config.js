const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',            // точка входа
  output: {
    filename: 'bundle.js',            // итоговый JS
    path: path.resolve(__dirname, 'dist'),
    clean: true                       // очищает dist перед сборкой
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']  // подключение CSS
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'icons/[name][ext]'      // изображения в dist/icons
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body'                          // вставка bundle.js перед </body>
    })
  ],
  mode: 'production'
};
