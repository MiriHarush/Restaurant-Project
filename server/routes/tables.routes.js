const express = require("express");
const { auth } = require("../middleWare/auth");
const { getAllTabels, addTable, getOneTable, deleteTable, updateTable, getTabelsByNumChair } = require("../controllers/tables.controllers");
// const upload = require("../middleWare/multer");


const router = express.Router();

router.get("/getAllTables", auth(), getAllTabels)
// router.get("/getTableByNumChair/:chairNum", auth(), getTabelsByNumChair)
router.get("/getTable/:id", auth(), getOneTable)
// router.post("/createUser",upload.single('file'), createUser);
router.post("/createTable",auth(), addTable);
router.patch("/editTable/:editId", auth(), updateTable);
router.delete("/deleteTable/:idDelete", auth(), deleteTable);



module.exports=router;