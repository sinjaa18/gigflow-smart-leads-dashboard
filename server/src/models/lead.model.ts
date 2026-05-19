import mongoose, { Document} from "mongoose"
export interface ILead extends Document{
    name:string,
    email:string,
    status:"New"| "Contacted"| "Qualified"| "Lost",
    source:"Website"| "Instagram"| "Referral"
}

const leadSchema=new mongoose.Schema<ILead>({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    status:{
        type:String,
        enum:["New","Contacted","Qualified","Lost"],
        default:"New"
    },
    source:{
        type:String,
        enum:["Website","Instagram","Referral"],
        required:true
    }
},{
    timestamps:true
})

const Lead = mongoose.model("Lead",leadSchema)
export default Lead