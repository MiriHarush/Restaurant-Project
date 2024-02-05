const { Restaurant } = require("../model/restaurant.model");
const { Table } = require("../model/tables.model");



exports.getAllTabels = async (req, res, next) => {
    try {
        const restId = res.locals.user_id;
        const tables = await Table.find({ ownerTable: restId });
        // console.log(tables);
        res.send(tables);
    } catch (error) {
        next(error);
    }
}

// exports.getTabelsByNumChair = async (req, res, next) => {
//     try {
//         const restId = res.locals.user_id;
//         const {chairNum}= req.params;
//         const tables = await Table.find({ ownerTable: restId ,chairNum});
//         res.send(tables);
//     } catch (error) {
//         next(error);
//     }
// }


exports.getOneTable = async (req, res, next) => {
    try {
        const { id } = req.params;
        const oneTable = await Table.findOne({ _id: id });
        res.send(oneTable);
    } catch (error) {
        next(error)
    }
}

exports.addTable = async (req, res, next) => {
    try {
        req.body.ownerTable = res.locals.user_id;
        maxchair = req.body.chairNum;
        console.log(maxchair);
        const restaurant = await Restaurant.findById(res.locals.user_id);
        req.body.tableNum = restaurant.tableArr.length + 1;
        if (maxchair > restaurant.maxChair)
            throw new Error(`The maximum number of chairs for your table is ${restaurant.maxChair}`)
        const newTable = await Table.create(req.body);
        await Restaurant.findByIdAndUpdate(
            res.locals.user_id,
            { $push: { tableArr: newTable._id } },
            { new: true }
        );

        res.status(201).json('the table added successfully');
    } catch (error) {
        next(error);
    }
};


exports.deleteTable = async (req, res, next) => {
    const { idDelete } = req.params;
    const restId = res.locals.user_id;
    try {
        let deleteTable = await Table.findOne({ _id: idDelete });
        if (!deleteTable) {
            throw new Error("the table is not exist")
        }

        if (String(deleteTable.ownerTable) !== String(restId)) {
            throw new Error("you are not the auther")
        }

        deleteTable = await Table.findOneAndDelete({ _id: idDelete });
        return res.status(201).json({
            status: 'deltetd successfully',

        });
    } catch (error) {
        next(error)
    }

}


exports.updateTable = async (req, res, next) => {
    const { editId } = req.params;
    const update = req.body;
    const restId = res.locals.user_id;
    try {
        let table = await Table.findOne({ _id: editId });
        if (!table) {
            return res.status(404).send({ msg: "table not exsist" });
        }

        if (String(table.ownerTable) !== String(restId))
            return res.status(404).send({ msg: "You cannot update this table beacouse you are not auther" });
        table = await Table.findByIdAndUpdate(editId, update, { new: true });
        // res.send(toy);
        res.send({ message: 'The table update successfully' });


    }
    catch (error) {
        next(error);
    }
};

