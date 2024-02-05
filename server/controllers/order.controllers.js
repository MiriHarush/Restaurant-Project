const { Order } = require("../model/order.model");
const { Restaurant } = require("../model/restaurant.model");
const { Table } = require("../model/tables.model");
const { createOrder } = require("../validation/order.validation");


exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({});
        res.status(200).send(orders);
    }
    catch (err) {
        return next(err);
    }
};

exports.createOrder = async (req, res, next) => {
    const body = req.body;
    try {
        const valid = createOrder(body)
        if (valid.error)
            throw Error(valid.error);
        // const table =  await Table.findById({ _id: tableNum })
        const order = await Order.create(body);
        res.status(201).send(" order added successfully")
    } catch (err) {
        next(err);
    }
};


const checkIfTableAvailable = async (tableNum, timeOrder, dateOrder) => {
    try {
        console.log(tableNum, timeOrder, dateOrder);
        const isAvailable = await Order.findOne({ tableNum, timeOrder, dateOrder }).exec();
        if (isAvailable) {
            return false;
        }
        return true;
    } catch (err) {
        throw Error(err);
    }
};


const getByNumChair = async (restId, chairNum) => {
    try {
        const numOfChairs = Number(chairNum);
        const tables = await Table.find({  ownerTable: restId, chairNum: { $gte: numOfChairs } });
        console.log("getByNumChair",tables);
        return tables;
    } catch (err) {
        throw Error(err);
    }
};


exports.getTablesAvailable = async (req, res, next) => {
    const { restId } = req.params;
    const {timeOrder, dateOrder, numberPeople } = req.query;
    let isInActivityTime = false;
    try {
        const rest = await Restaurant.findById({ _id: restId });
        const activityByDay = rest.activityTime;
        const myDate = new Date(dateOrder);
        const dayOfWeek = myDate.getDay();
        const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayOfWeek];
        const hoursForToday = activityByDay.find(obj => obj.day == dayName);
        console.log("hoursForToday",hoursForToday);
        if (hoursForToday != undefined) {
            hoursForToday.hours.map((h) => {
                if (timeOrder >= h.openHour && timeOrder <= h.closeHour)
                    isInActivityTime = true;
            })


            if (isInActivityTime) {
                const tables = await getByNumChair(restId, numberPeople);
                const availableTables = [];

                for (const t of tables) {
                    if (await checkIfTableAvailable(t._id, timeOrder ,dateOrder)) {
                        availableTables.push(t);
                    }
                }
                availableTables.sort((t1, t2) => t1.chairNum - t2.chairNum);
                if (availableTables.length!=0)
                    res.status(200).send(availableTables[0]);
                else
                    res.status(200).send("There is no free table");
            }
            else {
                res.status(200).send("The desired time is not within the restaurant's opening hours");
            }
        }
        else {
            res.status(200).send("The restaurant is not open on the day you chose");
        }
    }
    catch (err) {
        return next(err);
    }
};



// const getByNumChair = async (restId, chairNum) => {
//     // const restId = res.locals.user_id;
//     try {
//         const tables = await Table.find({ ownerTable: restId, chairNum: { $gte: chairNum } });
//         return tables
//     }
//     catch (error) {
//         throw Error(error)
//     }

// }


// const checkIfTableAvailable = async (tableNum, timeOrder, dateOrder) => {
//     const existingOrder = await Order.findOne({ tableNum, timeOrder, dateOrder }).exec();
//     if (existingOrder) {
//         return false;
//     }
//     return true;

// }

// exports.getTablesAvailable = async (req, res, next) => {
//     const { timeOrder, dateOrder, numberPeople } = req.query;
//     const { restId } = req.params;

//     try {
//         const tables = await getByNumChair(restId, numberPeople);
//         let closestTable = null;
// console.log(tables);
//         for (const table of tables) {
//             if (table.chairNum >= numberPeople && (!closestTable || table.chairNum < closestTable.chairNum)) {
//                 const isAvailable = await checkIfTableAvailable(table._id, timeOrder, dateOrder);
//                 if (isAvailable) {
//                     closestTable = table;
//                     break;
//                 }
//             }
//         }

//         if (closestTable) {
//             res.json({ success: true, table: closestTable });
//         } else {
//             res.json({ success: false, message: 'No available tables found' });
//         }
//     } catch (error) {
//         next(error);
//     }
// };


//Shani

// const isTableAvailable = async (table, dateOrder, timeOrder) => {
//     try {
//         console.log(table, dateOrder, timeOrder);
//         const isAvailable = await Order.findOne({ table, dateOrder, timeOrder }).exec();
//         if (isAvailable) {
//             return false;
//         }
//         return true;
//     } catch (err) {
//         throw Error(err);
//     }
// };


// const getTablesByNumChairs = async (restId, numChairs) => {
//     try {
//         const numOfChairs = Number(numChairs);
//         const tables = await Table.find({ owner: restId, numChairs: { $gte: numOfChairs } });
//         return tables;
//     } catch (err) {
//         throw Error(err);
//     }
// };


// exports.getTableAvailable = async (req, res, next) => {
//     const { restId } = req.params;
//     const { day, hour, numChairs } = req.query;
//     let isInActivityTime = false;
//     try {
//         const rest = await Restaurant.findById({ _id: restId });
//         const hours = rest.activityTime;
//         const myDate = new Date(day);
//         const dayOfWeek = myDate.getDay();
//         const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayOfWeek];
//         const hoursForToday = hours.find(obj => obj.day == dayName);

//         if (hoursForToday != undefined) {
//             hoursForToday.hours.map((h) => {
//                 if (hour >= h.openHour && hour <= h.closeHour)
//                     isInActivityTime = true;
//             })

//             if (isInActivityTime) {
//                 const tables = await getTablesByNumChairs(restId, numChairs);
//                 const availableTables = [];

//                 for (const t of tables) {
//                     if (await isTableAvailable(t._id, day, hour)) {
//                         availableTables.push(t);
//                     }
//                 }

//                 availableTables.sort((t1, t2) => t1.numChairs - t2.numChairs);
//                 if (availableTables)
//                     res.status(200).send(availableTables[0]);
//                 else
//                     res.status(200).send("There is no free table");
//             }
//             else {
//                 res.status(200).send("The desired time is not within the restaurant's opening hours");
//             }
//         }
//         else {
//             res.status(200).send("The restaurant is not open on the day you chose");
//         }
//     }
//     catch (err) {
//         return next(err);
//     }
// };


