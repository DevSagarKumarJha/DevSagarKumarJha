import mongoose, { Document, Schema } from "mongoose";

export interface SocialLinks extends Document {
    name: string;
    url: string;
}

const SocialLinksSchema: Schema<SocialLinks> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }
)

export interface Project extends Document {
    title: string;
    description: string;
    images: string[];
    url: string;
    createdAt: Date;
}

const ProjectSchema: Schema<Project> = new Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        images: {
            type: [String],
            required: [true, "Atleast one image is required"],
        },
        url: {
            type: String,
            required: [true, "Must have an hosted url"],
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        }
    }
)
export interface Certificate extends Document {
    name: string;
    issuingOrganization: string;
    credentialId: string;
    img: string;
    credentialUrl: string;
    issueDate: Date;
    expiryDate?:Date; 
    createdAt: Date;
}

const CertificateSchema: Schema<Certificate> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        issuingOrganization: {
            type: String,
            required: [true, "Issuing organization is required"],
        },
        credentialId:{
            type: String,
            default:""
        },
        img: {
            type: String,
            required: [true, "Media is required"],
        },
        credentialUrl: {
            type: String,
            default:""
        },
        issueDate:{
            type: Date,
            required: [true, "Issue date is required"],
            default: Date.now
        },
        expiryDate:{
            type: Date,
            default: null,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        }
    }
)
export interface Blog extends Document {
    title: string;
    content: string;
    images: string[];
    createdAt: Date;
}

const BlogSchema: Schema<Blog> = new Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
        },
        content: {
            type: String,
            required: [true, "Description is required"],
        },
        images: {
            type: [String],
            required: [true, "Atleast one image is required"],
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        }
    }
)
export interface Admin extends Document {
    name: string;
    adminId: string;
    imgurl: string;
    email: string;
    phone: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    bio: string;
    country: string;
    city: string;
    skills: string[];
    certificates: Certificate[];
    socials: SocialLinks[];
    blogs: Blog[];
    projects: Project[];
}

const AdminSchema: Schema<Admin> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        adminId: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true
        },
        imgurl: {
            type: String,
            default: "",
        },
        phone: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\+(?:[0-9] ?){6,14}[0-9]$/
                , "Please enter a valid phone number"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        verifyCode: {
            type: String,
            required: [true, "Verification code is required"],
        },
        verifyCodeExpiry: {
            type: Date,
            required: [true, "Verification code expiry is required"],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        bio: {
            type: String,
            default: "",
        },
        country:{
            type: String,
            default:""
        }
        ,
        city:{
            type: String,
            default: "",
        },
        skills:{
            type: [String],
            default: []
        },
        certificates: [CertificateSchema],
        socials: [SocialLinksSchema],
        projects: [ProjectSchema],
        blogs: [BlogSchema],
    }
)

const AdminModel = (mongoose.models.Admin as mongoose.Model<Admin>) || (mongoose.model<Admin>("Admin", AdminSchema))
export default AdminModel;