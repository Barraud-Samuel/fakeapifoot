const requireAuth = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.render('login', {
          message: 'Please login to continue',
          messageClass: 'alert-danger'
      });
  }
};

module.exports = requireAuth;