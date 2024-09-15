import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        email: { type: String },
        password: { type: String },
        name: { type: String },
    },
    { timestamps: true }
)

export default mongoose.model('User', schema)