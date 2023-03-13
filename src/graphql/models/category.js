import mongoose from 'mongoose'
import nid from 'nid'

const CategorySchema = new mongoose.Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parentId: {
        type: String,
        default: null
    },
    level: {
        type: Number,
        default: 0,
        max: 4
    },
    description: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'deactivate'],
        default: 'active'
    }
}, {
    timestamps: true
});

CategorySchema.pre('save', function (next) {
    this._id = nid(17)
    next()
})

const CategoryCollection = mongoose.model('categories', CategorySchema)

export default CategoryCollection