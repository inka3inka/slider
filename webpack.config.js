var path = require("path");


module.exports={
  entry:"./app.js",
  output: { filename: "out.js", path: path.resolve(__dirname, "build") },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, "./"),
    publicPath: "/build/",
    compress: true,
    port: 3001
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}