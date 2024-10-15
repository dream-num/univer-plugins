const path = require('node:path')
const { UniverPlugin } = require('@univerjs/webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// You'll need to find a webpack plugin equivalent for univerPlugin or adapt it if it's already compatible.
// const UniverWebpackPlugin = require('@univerjs/webpack-plugin');

module.exports = {
  // Set the mode to development to enable webpack's built-in optimizations for this environment.
  mode: 'development',

  // Entry point of your application
  entry: './src/main.ts',

  // Output configuration for webpack
  output: {
    path: path.resolve(__dirname, 'local'),
    filename: 'bundle.js',
  },

  // Development server configuration
  devServer: {
    // static: {
    //   directory: path.join(__dirname, 'local'),
    // },
    port: 6928,
    // open: true, // Open the browser after the server has been started
    hot: true, // Enable webpack's Hot Module Replacement feature
  },

  // Resolve file extensions
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  // Loaders and rules to handle different file types
  module: {
    rules: [
      // Add TypeScript loader
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Add style loaders
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // You can add more rules for other file types if needed
    ],
  },

  // Plugins configuration
  plugins: [
    // HtmlWebpackPlugin automatically injects the bundle into this HTML file.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new UniverPlugin(),
    // Uncomment and configure the UniverWebpackPlugin if available
    // new UniverWebpackPlugin({
    //   // Plugin options go here
    // }),
  ],
}
