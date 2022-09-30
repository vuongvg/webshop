const { default: mongoose } = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         trim: true,
         required: [true, "Invalid Email"],
         minlength: [8, "Name can not be less than 8 characters"],
         maxlength: [50, "Name can not be more than 50 characters"],
         validate: {
            validator: (email) => {
               return validator.isEmail(email, { allow_utf8_local_part: false });
            },
            message: "Invalid Email",
         },
      },
      salt: { type: String, required: true },
      hashedPassword: { type: String, required: true },
      wishList: { type: Array, default: [] },
      cartList: { type: Array, default: [] },
      // addressList: { type: Array, default: [] },
      addressList: [
         {
            userId: { type: String, required: true },
            address_title: { type: String, required: true },
            first_name: { type: String, required: true },
            last_name: { type: String, required: true },
            address_1: { type: String, required: true },
            address_2: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postcode: { type: String, required: true },
            country: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
         },
      ],
   },
   // { collection: "users", timestamps: true, versionKey: false }
   { timestamps: true, versionKey: false }
);

// userSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
//    return this.collection.findAndModify(query, sort, doc, options, callback);
// };

const User = new mongoose.model("User", userSchema);

module.exports = User;
