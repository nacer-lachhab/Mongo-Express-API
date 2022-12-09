const multer= require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination:(req,file,callbak)=>{
        callbak(null,'images')//null signifie pas d'erreur
    },
    filename:(req,file,callbak)=>{
        const name = file.originalname.split(' ').join('_');
        ///////////
        const extension = MIME_TYPES[file.mimetype];
        callbak(null, name + Date.now() + '.' + extension);
    }
});

module.exports= multer({storage}).single('image');//ressource: fichier unique de type image