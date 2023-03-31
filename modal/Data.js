const {Schema, model } = require("mongoose")

const UserSchema = new Schema(
    {
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

module.exports = model("Data",  UserSchema)

//from everyone who passes through our livews... some lesson are painful, some are painless, but all are priceless. good morning
