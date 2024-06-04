const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { create, findAll, findOne, update,deletedTestimonial ,upload} = require('../Controller/TestimonalController');



// Create a router

const router = express.Router();

// Create a Testimonal

router.post('/createTestimonal', upload ,isAuthenticatedUser, authorizeRoles('admin'), create);

// Get all Testimonals

router.get('/testimonals', isAuthenticatedUser, authorizeRoles('admin'), findAll);

// Get a single Testimonal by ID

router.get('/testimonals/:id',isAuthenticatedUser, authorizeRoles('admin'), findOne);

// Update a Testimonal by ID

router.put('/testimonals/:id', upload , isAuthenticatedUser, authorizeRoles('admin'), update);


// Delete a Testimonal by ID

router.delete('/testimonals/:id', isAuthenticatedUser, authorizeRoles('admin'), deletedTestimonial);



module.exports = router;

