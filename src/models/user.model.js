import mongoose,{Schema} from 'mongoose'
import { Jwt } from 'jsonwebtoken'; // npm i bcrypt jsonwebtoke
import bcrypt from 'bcrypt'


const userSchema= new Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index:true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type:String,
        required: true,
        lowercase: true,
        trim: true,
        index:true
    },
    avatar: {
        type: String,// cloudinary url
        required: true,
    },
    coverImage: {
        type: String,//cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type:String,
        required: [true,'Password is required']
    },
    refreshToke:{
        type: String,
    }
},{
    timestamps: true,
});


userSchema.pre("save", async function(next){ // pre is a middleware method run just before saving the data in database
    if(!this.isModified("password")) return next();
    this.password= bcrypt.hash(this.password,10)
    next()
}) // here we do our password encryption.



userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    ) //sign method generate the token
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    ) //sign method generate the token
}


export const User= mongoose.model("User",userSchema);