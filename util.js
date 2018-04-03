const fs = require('fs');
const hljs = require('highlight.js');
const cliHljs = require('cli-highlight').default;
const style = fs
  .readFileSync('node_modules/highlight.js/styles/github.css')
  .toString();

exports.hlCLI = function(code) {
  return cliHljs(code);
};

exports.hl = function(code) {
  return (
    `<style>${style}</style><pre>` + hljs.highlightAuto(code).value + '</pre>'
  );
};

exports.isCURL = function(req) {
  return /^curl/.test(req.headers['user-agent']);
};
