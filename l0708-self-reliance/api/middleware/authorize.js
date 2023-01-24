const checkAuthority = (req, res, next) => {
   if (!req.oidc.isAuthenticated()) {
      res.status(401).send({
         success: false,
         message: 'User Not Authorised to perform this operation',
         data: 'err'
      });
   } else {
      next();
   }
};

module.exports = { checkAuthority };
