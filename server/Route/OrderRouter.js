const express=require('express')
const { isAuthenticatedUser,isAuthenticatedUserForAddtocard,authorizeRoles} = require('../middleware/auth')
const {PlaceOrder,OrderList,getOrderById,UpdateOrder,DeleteOrder,  getChefAndOrderCounts , AllOrderList ,checkDiscount} = require("../Controller/order")
const {handleWebhook}=require("../Controller/handlehookcontroller")
const router=express.Router()

// Creata  a  order //

router.post("/createOrder", isAuthenticatedUser , PlaceOrder)
// Webhook endpoint for Stripe
router.post("/webhook", express.raw({ type: 'application/json' }), handleWebhook);

router.get("/orderList" ,isAuthenticatedUser , OrderList)
router.get("/orderListById/:id", isAuthenticatedUser , getOrderById)
router.put("/updateOrder/:id" , isAuthenticatedUser , UpdateOrder)
router.delete("/deleteOrder/:id",isAuthenticatedUser , DeleteOrder)
router.get("/getChefAndOrderCounts", isAuthenticatedUser, authorizeRoles("admin"),  getChefAndOrderCounts)
router.get("/allOrderList", isAuthenticatedUser, authorizeRoles("admin"), AllOrderList)
router.get("/checkDiscount", isAuthenticatedUser, checkDiscount)
module.exports=router