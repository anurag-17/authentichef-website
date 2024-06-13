const express = require("express");
const router = express.Router();
const {
  createChef,
  getAllChefs,
  getChefById,
  deleteChefById,
  updateChefById,
  getChefByParams,
  popular,
  upload
} = require("../Controller/chef");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/chefs/popular").get(popular);

// Create a new chef
router.post("/chefs", upload, createChef);

// Get all chefs
router.route("/chefs").get(getAllChefs);

// Get a single chef by ID
router.route("/chefs/:id").get(getChefById);

// Update a chef by ID
// router.route("/chefs/:id").put(updateChefById);

router.put("/chefs/:id", upload, updateChefById);

// Delete a chef by ID
router.route("/chefs/:id").delete(deleteChefById);


router.route("/chefs/sort/:id").get(getChefByParams);




module.exports = router;
