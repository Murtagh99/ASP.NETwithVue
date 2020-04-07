module.exports = {
   watch: true,
   entry: './main.js',
   output: {
      filename: 'dist.js'
   },
   module: {
     rules: [
       {
         test: /\.vue$/,
         loader: 'vue-loader'
       }
     ]
   }
}