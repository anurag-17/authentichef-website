const express = require('express');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');
const { createRefundPolicy, getRefundPolicies, getRefundPolicy ,updateRefundPolicy,deleteRefundPolicy } = require('../Controller/RefundPolicy');

// Create a new refund policy

router.post('/createRefundPolicy' , isAuthenticatedUser , authorizeRoles("admin") ,createRefundPolicy);

// Get all refund policies

router.get('/getRefundPolicies',   getRefundPolicies);

// Get a single refund policy

router.get('/getRefundPolicy/:id',isAuthenticatedUser , authorizeRoles("admin") ,getRefundPolicy);


// Update a refund policy

router.put('/updateRefundPolicy/:id' , isAuthenticatedUser , authorizeRoles("admin") ,updateRefundPolicy);


// Delte a refund policy

router.delete('/deleteRefundPolicy/:id' ,isAuthenticatedUser , authorizeRoles("admin") ,deleteRefundPolicy);


module.exports = router;