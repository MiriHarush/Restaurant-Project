const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET_KEY
// });

cloudinary.config({
    cloud_name: "dgubgi5wk",
    api_key: "567376147739285",
    api_secret:"FnOLVFaOp7ihQJauzJeI7i0lGek"
});
module.exports = cloudinary;
