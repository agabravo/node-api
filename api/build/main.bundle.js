'use strict';

var polka = require('polka');

function one(req, res, next) {
  req.hello = 'world';
  next();
}

function two(req, res, next) {
  req.foo = '...needs better demo';
  next();
}

polka().use(one, two).get('/users/:id', function (req, res) {
  console.log('~> Hello, ' + req.hello);
  res.end('User: ' + req.params.id);
}).get('/', function (req, res) {
  res.end('Hello world!!');
}).listen(3000, function (err) {
  if (err) throw err;
  console.log('> Running on localhost:3000');
});
