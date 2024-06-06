const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  // email: {
  //   type: String,
  //   unique: true,
  // },
  mobile: {
    type: String,
  },
  // password: {
  //   type: String,
  //   minlength: 8,
  //   select: false,
  // },
  specialty: {
    type: String,
  },
  bio: {
    type: String,
  },
  experience: {
    type: String
  },
  nationality :{
   type:String
  },

  images: {
    type: Array,
  },
  bannerImage: {
    type: Array,
  },
  Instagram_Link: {
    type: String
  },
  Facebook_Link: {
   type: String
  },
  activeToken: {
    type: String
  },
  Dietary_id:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Dietary'
  }],

  Cuisines_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cuisines"
  }],

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// chefSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next(); // Skip hashing if password is not modified
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error); // Pass any errors to the next middleware
//   }
// });


// chefSchema.methods.matchPasswords = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// chefSchema.methods.getSignedToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// chefSchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   this.passwordResetToken = resetToken;
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
//   return resetToken;
// };

const Chef = mongoose.model('Chef', chefSchema);

module.exports = Chef;
