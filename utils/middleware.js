const jwt = require('jsonwebtoken')
const User  = require('../models/user')


const tokenExtractor = async(request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7)
  }else{
  request.token= null;}
  next()
}


module.exports =  {tokenExtractor};
