const shopCtrl = require('../controllers/shop.controller')
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const validateLogin = require('../validation/validateLogin');
const validateSignup = require('../validation/validateSignup');
const router = new express.Router()

router.get('/hello', async (req, res) => {
    res.send("hello")
})


router.route('/api/routes')
    .get(shopCtrl.list)

router.route('/api/shop/:shopId')
    .get(shopCtrl.read)

//     router.route('/api/shops/by/:userId')
//     .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isSeller, shopCtrl.create)
//     .get(authCtrl.requireSignin, authCtrl.hasAuthorization, shopCtrl.listByOwner)
  
//   router.route('/api/shops/:shopId')
//     .put(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.update)
//     .delete(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.remove)
  
// router.route('/api/shops/logo/:shopId')
//   .get(shopCtrl.photo, shopCtrl.defaultPhoto)

// router.route('/api/shops/defaultphoto')
//   .get(shopCtrl.defaultPhoto)

router.param('shopId', shopCtrl.shopById)

module.exports = router;