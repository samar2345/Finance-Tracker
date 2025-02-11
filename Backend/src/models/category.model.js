import mongoose,{Schema} from 'mongoose'

const categorySchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    categoryName: {
        type: String,
        required: true,
        unique: true, // Prevents duplicates
    },
       
},{timestamps: true})

export const Category=mongoose.model("Category",categorySchema)