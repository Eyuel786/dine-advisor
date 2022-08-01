const multer = require('multer');
const { v4: uuid } = require('uuid');


const MIMETYPE = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/png': 'png'
}

module.exports = multer({
    limits: 2000000,
    fileFilter: (req, file, cb) => {
        const imageIsValid = !!MIMETYPE[file.mimetype];
        const err = imageIsValid ? null : new Error('Image is invalid');
        cb(err, imageIsValid);
    },
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            const ext = MIMETYPE[file.mimetype];
            cb(null, `${uuid()}.${ext}`);
        },
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        }
    })
});

