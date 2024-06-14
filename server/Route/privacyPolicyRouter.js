const express = require('express');
const { create , findAll , findOne , update , deletePolicy } = require('../Controller/privacyPolicyController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();


// Make a Router for the privacy policy in the same way as the terms and conditions router.

router.post('/create', isAuthenticatedUser , authorizeRoles("admin") , create);
router.delete('/delete/:id', isAuthenticatedUser , authorizeRoles("admin"), deletePolicy);
router.get('/findAll', findAll);
router.get('/findOne/:id', isAuthenticatedUser , authorizeRoles("admin"), findOne);
router.patch('/update/:id', isAuthenticatedUser , authorizeRoles("admin") , update);



module.exports = router;

