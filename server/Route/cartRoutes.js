const express=require('express')
const { isAuthenticatedUser, authorizeRoles ,isAuthenticatedUserForAddtocard} = require('../middleware/auth')
const { addToCart, getCartItems, updateCartItem , deleteCartItem,deleteAllCartItems,placeOrder,updateItem} = require("../Controller/cart")
const router=express.Router()

// Route to create a new order

router.post('/AddtoCart', isAuthenticatedUserForAddtocard ,addToCart)
router.get('/getCartItem', isAuthenticatedUserForAddtocard, getCartItems)
router.put('/updateCartItem/:cardid/:menuid',isAuthenticatedUserForAddtocard ,updateCartItem);
router.delete('/deleteCartItem/:id', isAuthenticatedUserForAddtocard, deleteCartItem)
router.delete('/deleteAllCartItem', isAuthenticatedUserForAddtocard, deleteAllCartItems)
router.post('/placeOrder', isAuthenticatedUserForAddtocard,authorizeRoles('user'), placeOrder)
router.put('/updateItem/:menuid', isAuthenticatedUserForAddtocard, updateItem)



module.exports = router