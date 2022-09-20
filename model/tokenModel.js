const { default: mongoose } = require("mongoose");

const TokenSchema = new mongoose.Schema(
   {
      token: {  
         type: String,
         required: [true, "Token is required"],
      },
      createdAt: { type: Date, expireAfterSeconds: +process.env.EXPIRES_REFRESH_TOKEN, default: Date.now },
   }, 
   { versionKey: false }   
);  

const Token = new mongoose.model("Tokens", TokenSchema);
 
module.exports = Token;
