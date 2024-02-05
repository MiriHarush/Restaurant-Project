const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/jwt");
const { validCreateRestaurant, validLogIn } = require("../validation/restaurant.validation");
const { Restaurant } = require("../model/restaurant.model");
const { Table } = require("../model/tables.model");

const cloudinary = require("../utils/cloudinary");


exports.getAllRest = async (req, res, next) => {
    try {
        const rest = await Restaurant.find({});
        res.send(rest);
    } catch (error) {
        next(error);
    }
}
exports.getRest = async (req, res, next) => {
    try {
        // const { id } = req.params;
        const restId = res.locals.user_id;
        
        const rest = await Restaurant.findOne({ _id: restId });
        res.send(rest);
    } catch (error) {
        next(error)
    }
}
exports.getRestById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rest = await Restaurant.findOne({ _id: id });
        res.send(rest);
    } catch (error) {
        next(error)
    }
}
exports.createRestaurant = async (req, res, next) => {
    // console.log(req.body);
    const body = req.body;
    console.log(body);
    try {
        console.log("JOI");
        const validate = validCreateRestaurant(body);
        if (validate.error)
            throw Error(validate.error);
        if (await checkIfRestExsist(body.email)) {
            throw new Error("This email already in this system");
        }

        //   console.log(req);  
        // const file = req.file.path
        // const result = await cloudinary.uploader.upload(file, { resource_type: "image" })
        // body.profileImage = result.url ;

        const hash = await bcrypt.hash(body.password, 10);
        body.password = hash;
        const newRestaurant = await Restaurant.create(body);
        if (!newRestaurant) return next(new Error('problem creating user'));
        console.log(newRestaurant);
        // try {
        //     await createUserMail(newRestaurant.email);
        //     // await sendSMS(newUser.phone);
        //     // console.log('SMS sent successfully.');
        // } catch (err) {
        //     // console.error('Error sending SMS:', err);
        //     return next(err);
        // }
        const Rest = { password: '********' };
        return res.status(201).json({
            status: 'success',
            // Rest
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const checkIfRestExsist = async (email) => {
    const rest = await Restaurant.findOne({ email });
    if (rest) return true;
    return false;
}

exports.login = async (req, res, next) => {
    try {
        const body = req.body;
        const validate = validLogIn(body);
        if (validate.error)
            throw Error(validate.error);
        if (!await checkIfRestExsist(body.email))
            throw new Error("This email isn't in the system");
        const existingRestaurant = await Restaurant.findOne({ email: body.email }).select("+password");
        if (!await bcrypt.compare(body.password, existingRestaurant.password))
            throw new Error("Password is incorrect");
            // const id = existingRestaurant._id;
            // const email= existingRestaurant.email;

        const token = generateToken({ email: existingRestaurant.email, name: existingRestaurant.name, id: existingRestaurant._id });
        // return res.send({ Restaurant: existingRestaurant, token });
        return res.status(201).json({
            status: 'login success', token, existingRestaurant
        })

    } catch (err) {
        next(err);
    }
}


exports.patchRestaurant = async (req, res, next) => {
    // const id = req.params.idEdit;
    const RestaurantId = res.locals.user_id;
    const data = req.body;

    try {
        // if (RestaurantId !== id) {
        //     throw new Error("you are not the auther")
        // }
        const patchRestaurant = await Restaurant.findByIdAndUpdate(RestaurantId, data, { new: true });
        return res.status(201).json({
            status: patchRestaurant.name + '  update successfully'
        })
    } catch (error) {
        next(error)
    }
}





exports.deleteRest = async (req, res, next) => {
    const { idDelete } = req.params;
    const RestaurantId = res.locals.user_id;
    try {
        let deleteRest = await Restaurant.findOne({ _id: idDelete });
        if (!deleteRest) {
            throw new Error("the  Restaurant is not exist")
        }
        if (RestaurantId !== idDelete) {
            throw new Error("you are not the auther")
        }
        deleteRest = await Restaurant.findOneAndDelete({ _id: idDelete });
        for(const tableId of deleteRest.tableArr){
            const table= await Table.findOneAndDelete({_id:tableId})
            if (!table) {
                console.log(`Table not found for ID: ${tableId}`);
            } else {
                console.log(`Table ${table.tableNum} deleted successfully.`);
            }
        }
        return res.status(201).json({
            status: deleteRest.name + ' deltetd successfully',

        });
    } catch (error) {
        next(error)
    }

}


 