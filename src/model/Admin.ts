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
    img: string[];
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
        img: {
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
export interface Blog extends Document {
    title: string;
    content: string;
    img: string[];
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
        img: {
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
        socials: [SocialLinksSchema],
        projects: [ProjectSchema],
        blogs: [BlogSchema],
    }
)

const AdminModel = (mongoose.models.Admin as mongoose.Model<Admin>) || (mongoose.model<Admin>("Admin", AdminSchema))
export default AdminModel;