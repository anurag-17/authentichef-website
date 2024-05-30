const express = require('express');
const router = express.Router();
const {isAuthenticatedUser,AuthorizeRoles} = require('../middleware/auth');
const { createChef, getChefs, getChefbyId ,updateChef,deleteChef } = require('../Controller/chefjoinController');

// Create a new chef
router.post('/', isAuthenticatedUser , createChef);

// Get all chefs

router.get('/', isAuthenticatedUser, getChefs);

// Get a single chef

router.get('/:id', isAuthenticatedUser ,getChefbyId);

// Update a chef

router.put('/:id', isAuthenticatedUser , updateChef);

// Delte a chef

router.delete('/:id', isAuthenticatedUser ,deleteChef);

module.exports = router;
// Compare this snippet from Food-work/server/Route/chefjoinRouter.js: