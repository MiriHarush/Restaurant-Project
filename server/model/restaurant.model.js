const mongoose = require("mongoose");
// const hours = new mongoose.Schema({
//     openHour: {
//         type: String,
//         // required: true
//     },
//     closeHour: {
//         type: String,
//         // required: true
//     }
// })

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        uniqe: true
    },
    fullAdress: {
        type: String,
        required: true

    },
    maxChair:{
        type:Number,
        required: true
    },
    activityTime: [
        {
            day: {
                enum:['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
                type: String,
                required: true
            },
            hours: [{
                openHour: {
                    type: String,
                },
                closeHour: {
                    type: String,
                },
                description: {
                    type: String, 
                    
                }
        }]
                // default:'close'
           
        }
    ],

    profileImage: {
        type: String,
        url: String
    },
    tableArr: [{
        type: mongoose.Types.ObjectId,
        ref: 'Table'
    }]

})

const Restaurant = mongoose.model("Restaurant", restaurantSchema)
module.exports.Restaurant = Restaurant;