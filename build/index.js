var fs = require('fs')

const FILE_SRC_COMMONJS = 'src/nanogptjs.js'
const FILE_DIST_ESM = 'dist/nanogptjs.mjs'
const FILE_DIST_COMMONJS = 'dist/nanogptjs.cjs'

fs.readFile(FILE_SRC_COMMONJS, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/module\.exports = function \(\{/g, 'export default function ({');

  fs.writeFile(FILE_DIST_ESM, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });  

  fs.writeFile(FILE_DIST_COMMONJS, data, 'utf8', function (err) {
    if (err) return console.log(err);
 });  
});