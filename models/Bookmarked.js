const mongoose= require('mongoose');
const {Schema}=mongoose

const mongoURI ='mongodb://127.0.0.1:27017/news?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1'

mongoose.connect(mongoURI)
.then(()=>{
    console.log("connected");
})
.catch(()=>{
    console.log("failed");
})


//schema for user's bookmarked data
const UserSchema= new Schema({
    email:{
        type: String,
        required: true,
    },

    url:{
        type: String,
        required: true,
    },
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    author:{
        type: String,

    },
    time:{
        type:String
    },
    imageurl:{
        type:String
    },

    savedon:{
        type: Date,
        default: Date.now
    }

})
const collection=mongoose.model('bookmarked',UserSchema);

module.exports = collection;
