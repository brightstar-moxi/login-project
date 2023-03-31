 const mongoose=require("mongoose")
const {Schema, model } = require("mongoose")
const URI ='mongodb+srv://brightstar:tiplingold@cluster0.jls0e.mongodb.net/test?retryWrites=true&w=majority'

mongoose 
 .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
         })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err)); 

 const NewSchema=new Schema({

    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
    }
},
{
    timestamps: true
}
)

// const Collection = mongoose.model("Collection",newSchema)
// module.exports = Collection

module.exports = model("Collection",  NewSchema)
