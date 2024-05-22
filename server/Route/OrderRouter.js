const express=require('express')
const { isAuthenticatedUser,isAuthenticatedUserForAddtocard,authorizeRoles} = require('../middleware/auth')
const {PlaceOrder,OrderList,getOrderById,UpdateOrder,DeleteOrder,  getChefAndOrderCounts} = require("../Controller/order")
const router=express.Router()

// Creata  a  order //

router.post("/createOrder", isAuthenticatedUser , PlaceOrder)
router.get("/orderList" ,isAuthenticatedUser , OrderList)
router.get("/orderListById/:id", isAuthenticatedUser , getOrderById)
router.put("/updateOrder/:id" , isAuthenticatedUser , UpdateOrder)
router.delete("/deleteOrder/:id",isAuthenticatedUser , DeleteOrder)
router.get("/getChefAndOrderCounts", isAuthenticatedUser, authorizeRoles("admin"),  getChefAndOrderCounts)
module.exports=router