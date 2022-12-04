const jwt = require('jsonwebtoken')

exports.protection = async (req, res, next) => {
    try {
        if(req.cookies.secureCookie){
          const decoded = jwt.verify(req.cookies.secureCookie.slice(1,-1), process.env.JWT_SECRET)
          req.cookie = decoded
          next()
        }
        else{
          res.status(400).json({message: "Unauthorized!"})
        }
    }
    catch(err) {
        res.status(400).json({message:err.message})
    }
}

exports.roleAuth = (...roles) => {
    return (req, res, next) => {
      try{
        if(roles.includes(req.cookie.role)){
            next();
        }else{
            res.status(400).json({message:"Unauthorized!"})
        }
      }
      catch(err){
        res.status(400).json({message:err.message})
      }
    };
  };

exports.idAuth = (...id) => {
    return (req, res, next) => {
      try{
        if(id.includes(req.cookie.id)){
            next();
        }else{
            res.status(400).json({message:"Unauthorized!"})
        }
      }
      catch(err){
        res.status(400).json({message:err.message})
      }
    };
  };