const express=require('express')
const { isAuthenticatedUser,isAuthenticatedUserForAddtocard,authorizeRoles} = require('../middleware/auth')
const {PlaceOrder,OrderList,getOrderById,UpdateOrder,DeleteOrder,  getChefAndOrderCounts , AllOrderList ,checkDiscount,BookOrder,CancelOrder,GetSessionId ,CreateCouponStripe } = require("../Controller/order")
const {getAllShipment,ShipmentPdf}=require("../Controller/ShiptheoryController")
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
router.get("/", isAuthenticatedUser, getAllShipment)
router.post("/shipmentPdf", ShipmentPdf)

router.get("/getSessionId", isAuthenticatedUser, GetSessionId)

// Coupen code

router.post("/coupenStripe", CreateCouponStripe)
// router.get("/checkNewDiscount", isAuthenticatedUser , CheckNewDiscount)
module.exports=router