const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const app = express()
const authTokens = {};

//auth
const users = [
  // This user is added to the array to avoid creating new user on each restart
  {
      firstName: 'John',
      lastName: 'Doe',
      email: 'thonysampro@gmail.com',
      // This is the SHA256 hash for value of `password`
      password: 'JAvlGPq9JyTdtvBO6x2llnRI1+gxwIyPqCKAn3THIKk='
  }
]

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}

router.get('/login',(req,res,next)=>{
  res.render('login')
})


router.post('/login',(req,res,next)=>{
  const {email,password} = req.body
  const hashedPassword = getHashedPassword(password)
  const user = users.find(u=>{
    return u.email === email && u.password === hashedPassword
  })
  if(user) {
    const authToken = generateAuthToken()
    authTokens[authToken] = user;
    res.cookie('AuthToken', authToken);
    res.redirect('/');
  }else{
    console.log('Invalid username or password');
  }

  res.redirect('/auth/login');
})


exports.authRoutes = router
exports.authTokens = authTokens
/* module.exports = {
  authRoutes: ()=> router,
  authTokens: authTokens
};
 */