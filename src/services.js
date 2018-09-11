const oauth2_service = require("./services/oauth2_service.js");
const config = require('../config.js');
const add_service = (mod) => module.exports[mod.name] = mod;

//BrAPI.org
add_service( oauth2_service({
  name: "brapi",
  prompt:"Log In With BrAPI.org",
  client: {
    id: config.services.brapi.id,
    secret: config.services.brapi.secret
  },
  auth: {
    tokenHost: 'https://brapi.org/',
    tokenPath: '/oauth2/token',
    authorizePath: '/oauth2/auth'
  },
  login:{
    scope:'openid'
  }
}));

//GitHub
add_service( oauth2_service({
  name: "github",
  prompt:"Log In With GitHub",
  client: {
    id: config.services.github.id,
    secret: config.services.github.secret
  },
  auth: {
    tokenHost: 'https://github.com/',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize'
  },
  login:{
    scope:'user'
  }
}));

//ORCID
add_service( oauth2_service({
  name: "orcid",
  prompt:"Log In With ORCID",
  client: {
    id: config.services.orcid.id,
    secret: config.services.orcid.secret
  },
  auth: {
    tokenHost: 'https://orcid.org/',
    tokenPath: '/oauth/token',
    authorizePath: '/oauth/authorize'
  },
  login:{
    scope:'/authenticate'
  }
}));
