const express=require('express')
const { isAuthenticatedUser,isAuthenticatedUserForAddtocard,authorizeRoles} = require('../middleware/auth')
const {PlaceOrder,OrderList,getOrderById,UpdateOrder,DeleteOrder,  getChefAndOrderCounts , AllOrderList ,checkDiscount,BookOrder,CancelOrder,GetSessionId } = require("../Controller/order")
const {handleWebhook}=require("../Controller/handlehookcontroller")
const router=express.Router()

router.post("/createOrder", isAuthenticatedUser , PlaceOrder)

router.post("/bookOrder", isAuthenticatedUser , BookOrder)

// Make a get api to get a success url//

// Webhook endpoint for Stripe
// Route for handling webhook events from Stripe
router.post("/webhook",  handleWebhook);

router.get("/orderList" ,isAuthenticatedUser , OrderList)
router.get("/orderListById/:id", isAuthenticatedUser , getOrderById)
router.put("/updateOrder/:id" , isAuthenticatedUser , UpdateOrder)
router.delete("/deleteOrder/:id",isAuthenticatedUser , DeleteOrder)
router.get("/getChefAndOrderCounts", isAuthenticatedUser, authorizeRoles("admin"),  getChefAndOrderCounts)
router.get("/allOrderList", isAuthenticatedUser, authorizeRoles("admin"), AllOrderList)
router.get("/checkDiscount", isAuthenticatedUser, checkDiscount)
router.post("/cancelOrder", isAuthenticatedUser, CancelOrder)

router.get("/getSessionId", isAuthenticatedUser, GetSessionId)
module.exports=router