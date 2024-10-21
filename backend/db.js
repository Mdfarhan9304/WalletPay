require('dotenv').config();
const mongoose= require("mongoose")

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});


const UserSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true,
        minLength: 4,
        maxLength: 30
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    firstName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }

})

const AccountSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User= mongoose.model('User', UserSchema);
const Account= mongoose.model('Account', AccountSchema)


module.exports= {User, Account}
