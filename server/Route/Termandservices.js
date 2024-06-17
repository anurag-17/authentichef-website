const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const{create,findAll,findOne,update,deleteTerms}=require("../Controller/TermsandServices")
const router = express.Router();


router.post('/create', isAuthenticatedUser, authorizeRoles('admin'), create);

router.get('/findAll', findAll);

router.get('/findOne/:id', isAuthenticatedUser, authorizeRoles('admin'), findOne);

router.put('/update/:id', isAuthenticatedUser, authorizeRoles('admin'), update);

router.delete('/delete/:id',isAuthenticatedUser, authorizeRoles('admin'), deleteTerms);

module.exports = router;