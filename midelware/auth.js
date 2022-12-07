const jwt = require('jsonwebtoken');

module.exports=(req,resp,next)=>{
    try {
        const token = req.header.authorization.split(' ')[1];//espace entre bearer et la valeur du Token
        const  decodedToken = jwt.verify(token,'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId:userId
        }
    }catch (error){
        resp.status(401).json({error});
    }
};