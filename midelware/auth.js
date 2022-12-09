const jwt = require('jsonwebtoken');

module.exports=(req,resp,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];//espace entre bearer et la valeur du Token
        const  decodedToken = jwt.verify(token,'RANDOM_TOKEN_SECRET');
        // console.log('***********00');
        // console.log(decodedToken);
        // console.log('***********00');
        const userId = decodedToken.userId;
        req.auth = {
            userId:userId
        };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            next();
        }
    }catch (error){
        resp.status(500).json({error});
    }
};