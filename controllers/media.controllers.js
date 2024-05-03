const imagekit = require('../libs/imagekit')
const path = require('path')
const qr = require('qr-image')
const { updateProfile } = require('./auth.controllers')
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

module.exports = {
    imageKitUpload: async (req, res, next) => {
        try {
            let strFile = req.file.buffer.toString('base64')

            let { url } = await imagekit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: strFile
            })

            res.json({
                status: true,
                message: 'OK',
                data: url
            })
        }
        catch (err) {
            next(err)
        }
    },
    generateQR: async (req, res, next) => {
        try {
            let { qr_data } = req.body

            if (!qr_data) {
                return res.status(400).json({
                    status: false,
                    message: 'qr_data is required',
                    data: null
                })
            }

            let qrCode = qr.imageSync(qr_data, { type: 'png' })

            let { url } = await imagekit.upload({
                fileName: Date.now() + '.png',
                file: qrCode.toString('base64')
            })

            res.status(200).json({
                status: true,
                message: 'OK',
                data: url
            })
        }
        catch (err) {
            next(err)
        }
    },

    updateProfilePic: async (req, res, next) => {
        try {
            let strFile = req.file.buffer.toString('base64')
            let id = Number(req.params.id)

            let exist = await prisma.user.findUnique({ where: { id } })
            if (!exist) {
                return res.status(400).json({
                    status: false,
                    message: `user not found`,
                    data: null
                })
            }


            let { url } = await imagekit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: strFile
            })


            let updatedUser = await prisma.user.update({
                where: { id },
                data: {
                    avatar_url: url
                }

            })

            return res.status(200).json({
                status: true,
                message: `avatar updated`,
                data: {
                    id: updatedUser.id,
                    avatar_url: updatedUser.avatar_url
                }
            });
        }
        catch (err) {
            next(err)
        }
    },

    uploadPic: async (req, res, next) => {
        try {
            let strFile = req.file.buffer.toString('base64')
            let { title, description } = req.body

            if (!title || !description || !strFile) {
                return res.status(400).json({
                    status: false,
                    message: `fields can not empty!!`,
                    data: null
                });
            }

            let { url } = await imagekit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: strFile
            })


            let image = await prisma.picture.create({
                data: {
                    title: title,
                    description: description,
                    image_url: url
                }
            })

            return res.status(200).json({
                status: true,
                message: `Image Uploaded`,
                data: {
                    image
                }
            });
        }
        catch (err) {
            next(err)
        }
    },

    showPic: async (req, res, next) => {
        try {
            const pictures = await prisma.picture.findMany();
            res.render('uploadedImage', { pictures });
        } catch (err) {
            next(err)
        }
    },

    showPicById: async (req, res, next) => {
        try {
            let id = Number(req.params.id)

            let exist = await prisma.picture.findUnique({ where: { id } })
            if (!exist) {
                return res.status(400).json({
                    status: false,
                    message: `Image not found`,
                    data: null
                })
            }

            const picture = await prisma.picture.findUnique({ where: { id } });
            console.log(picture)
            res.render('image', { picture });
        } catch (err) {
            next(err)
        }
    },

    deletePic: async (req, res, next) => {
        try {
            let id = Number(req.params.id)

            let exist = await prisma.picture.findUnique({ where: { id } })
            if (!exist) {
                return res.status(400).json({
                    status: false,
                    message: `Image not found`,
                    data: null
                })
            }

            let image = await prisma.picture.delete({
                where: { id }
            })

            return res.status(200).json({
                status: true,
                message: `Image Deleted`,
                data: {
                    image
                }
            });
        }
        catch (err) {
            next(err)
        }
    },

    updateTitleDesc: async (req, res, next) => {
        try {
            let id = Number(req.params.id)
            let { title, description } = req.body

            if (!title || !description) {
                return res.status(400).json({
                    status: false,
                    message: `fields can not empty!!`,
                    data: null
                });
            }

            let exist = await prisma.picture.findUnique({ where: { id } })
            if (!exist) {
                return res.status(400).json({
                    status: false,
                    message: `Image not found`,
                    data: null
                })
            }

            let updatedTitleDesc = await prisma.picture.update({
                where: { id },
                data: {
                    title: title,
                    description: description
                }

            })

            return res.status(200).json({
                status: true,
                message: `Title and Description updated`,
                data: {
                    updatedTitleDesc
                }
            });
        }
        catch (err) {
            next(err)
        }
    }
}