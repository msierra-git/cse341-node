const checkAuthority = (req, res, next) => {
   if (!req.oidc.isAuthenticated()) {
      res.status(401).send({
         success: false,
         message: 'User Not Authorised to perform this operation',
         login: 'https://sierra341-07.onrender.com/login'
      });
   } else {
      next();
   }
};

module.exports = { checkAuthority };
