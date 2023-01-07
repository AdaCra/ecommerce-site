const mongoose = require('mongoose')

const prodcutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter product name.'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters.'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product selling price.'],
        maxLength: [7, 'Product price cannot exceed 9999.99'],
        default: 0.00
    },
    description: {
        type: String,
        required: [true,'Please enter product description.'],
        trim: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type : String,
                required: true,
            },
            url: {
                type : String,
                required: true,
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Product Category must be selected.'],
        enum: {
            values: [
                'Automotive',
                'Tools & DIY',
                'Parenting',
                'Health & Beauty',
                'Books',
                'Camping & Outdoor',
                'Mobile Tech',
                'Computers',
                'Electronics',
                'Fashion',
                'Travel',
                'Gaming',
                'Furniture & Appliances',
                'Stationery',
                'Pets',
                'Sport & Training',
                'Toys',
            ],
            message: 'Select a Product Category'
        }
    },
    seller: {
        type: String,
        required: [true,'Please enter Product Seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter number of stock units.'],
        maxLength: [5, 'Product cannot exceed 99999 units'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
        name:{
            type: String,
            required: true,
            },
            rating:{
            type: Number,
            required: true,
            },
            comment:{
            type: String,
            required: true,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Product', prodcutSchema);