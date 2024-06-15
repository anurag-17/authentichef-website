const express = require('express');
const router = express.Router();
const {isAuthenticatedUser,AuthorizeRoles} = require('../middleware/auth');
const { createChef, getChefs, getChefbyId ,updateChef,deleteChef } = require('../Controller/chefjoinController');

// Create a new chef
router.post('/' , createChef);

// Get all chefs

router.get('/',  getChefs);

// Get a single chef

router.get('/:id' ,getChefbyId);

// Update a chef

router.put('/:id' , updateChef);

// Delte a chef

router.delete('/:id' ,deleteChef);

module.exports = router;
// Compare this snippet from Food-work/server/Route/chefjoinRouter.js: