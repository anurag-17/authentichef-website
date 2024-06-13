const express = require('express');
const FaqController = require('../Controller/FaqController');
const{isAuthenticatedUser,authorizeRoles}=require('../middleware/auth')
const router = express.Router();


// Write the routes for Faq here

router.post('/create', FaqController.createFaq);
router.get('/all', FaqController.getAllFaq);
router.get('/:id', isAuthenticatedUser, authorizeRoles("admin") , FaqController.getSingleFaq);
router.put('/:id', isAuthenticatedUser, authorizeRoles("admin") , FaqController.updateFaq);
router.delete('/:questionId' , FaqController.deleteFaq);

module.exports = router;
