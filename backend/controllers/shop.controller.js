const Shop = require('../models/shopModel');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');

const create = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(400).json({
                message: "Image could not be uploaded"
            })
        }
        let shop = new Shop(fields)
        // shop.owner = req.profile
        shop.owner = "placeholder"
        if (files.image) {
            shop.image.data = fs.readFileSync(files.image.type) 
            shop.image.contentType = files.image.type
        }
        shop.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)

                })
            }
            res.status(200).json(result)
        })
    })
}
const shopById = (req, res, next, id) => {
    Shop.findById(id).populate('owner', '_id name').exec((err,shop) => {
        if (err || !shop)
            return res.status('400').json({
                error: "ShopNotFound"
        })
        req.shop = shop
        next()
    })
}
const list = (req, res) => {
    Shop.find((err, shops) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(shops)
    })
  }
const read = (req, res) => {
    return res.json(req.shop)
}

const remove =(req, res, next) => {
    let shop = req.shop
    shop.remove((err, deletedShop) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(deletedShop)
    })
}
module.exports = {
    create,
    remove,
    list,
    read,
    shopById
}