const url = require('url');
const crypto = require("crypto");
const oauth2 = require('simple-oauth2');

module.exports = function(opts){
  const oauthHandler = oauth2.create({
    client: opts.client,
    auth: opts.auth
  });

  function login_url(callback_url){
    return authUrl = oauthHandler.authorizationCode.authorizeURL({
      redirect_uri: callback_url,
      scope: opts.login.scope,
      state: crypto.randomBytes(20).toString('hex')
    });
  }

  function get_token(req){
    return Promise.resolve({
      code: req.query.code,
      redirect_uri: url.resolve(`${req.protocol}://${req.get('host')}/`,req.path),
      scope: opts.login.scope,
    })
    .then(oauthHandler.authorizationCode.getToken)
    .then(oauthHandler.accessToken.create)
    .catch((error)=>console.log('Access Token Error', error.message));
  }

  return {
    name: opts.name,
    prompt:opts.prompt,
    login_url: login_url,
    get_token: get_token
  }
}
