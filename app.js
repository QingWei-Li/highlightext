const fastify = require('fastify')();
const { isCURL, hl, hlCLI } = require('./util');
const axios = require('axios').default;

fastify.get('*', async (req, reply) => {
  const param = req.params['*'].slice(1);
  if (!param) {
    reply.redirect('https://github.com/qingwei-li/highlightext');
  }
  let url = /\./g.test(param) ? param : `//text.cinwell.com/${param}`;

  if (!/^http(s):/.test(url)) {
    if (!/^\/\//.test(url)) {
      url = 'http://' + url;
    } else {
      url = 'http:' + url;
    }
  }

  const code = (await axios(url)).data;
  let text;

  if (!isCURL(req)) {
    text = hl(code);
    reply.header('content-type', 'text/html');
  } else {
    text = hlCLI(code);
  }

  reply.send(text);
});

fastify.listen(4931, '0.0.0.0', err => {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`);
});
