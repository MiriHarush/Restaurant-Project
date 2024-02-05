const express = require("express");
const { auth } = require("../middleWare/auth");
const {  createOrder, getTablesAvailable, getAllOrders } = require("../controllers/order.controllers");
// const upload = require("../middleWare/multer");


const router = express.Router();


router.post("/createOrder",createOrder);
router.get("/getTablesAvailable/:restId",getTablesAvailable)

router.get("/getAllOrders",getAllOrders)
// router.post("/createUser",upload.single('file'), createUser);
// router.post("/checkIfTableAvailable",checkIfTableAvailable);
// router.patch("/editTable/:editId", auth(), updateTable);
// router.delete("/deleteTable/:idDelete", auth(), deleteTable);



module.exports=router;