var express = require('express');
var router = express.Router();
const { imageStorage, videoStorage, documentStorage, image, document } = require('../libs/multer');
const { register, updateProfile } = require('../controllers/auth.controllers')
const { imageKitUpload, generateQR, updateProfilePic, uploadPic, deletePic, updateTitleDesc } = require('../controllers/media.controllers')

// images
// router.post('/upload/image', imageStorage.single('image'), (req, res) => {
//     let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
//     res.json({ image_url: imageUrl });
// });
// router.post('/upload/images', imageStorage.array('image'), (req, res) => {
//     let imageUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`);
//     res.json({ image_urls: imageUrls });
// });

// // videos
// router.post('/upload/video', videoStorage.single('video'), (req, res) => {
//     let videoUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;
//     res.json({ video_url: videoUrl });
// });
// router.post('/upload/videos', videoStorage.array('video'), (req, res) => {
//     let videoUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/videos/${file.filename}`);
//     res.json({ video_urls: videoUrls });
// });

// // documents
// router.post('/upload/document', documentStorage.single('document'), (req, res) => {
//     let documentUrl = `${req.protocol}://${req.get('host')}/documents/${req.file.filename}`;
//     res.json({ document_url: documentUrl });
// });
// router.post('/upload/documents', documentStorage.array('document'), (req, res) => {
//     let documentUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/documents/${file.filename}`);
//     res.json({ document_urls: documentUrls });
// });


// router.post('/imagekit/upload/image', image.single('file'), imageKitUpload)

// router.post('/imagekit/upload/qr', generateQR)

// router.post('/register', register)
// router.put('/users/:id/profile', updateProfile)

router.post('/upload', image.single('file'), uploadPic)
router.delete('/delete/:id', deletePic)
router.put('/edit/:id', updateTitleDesc)

module.exports = router;
