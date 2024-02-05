const express = require("express");
const { auth } = require("../middleWare/auth");
const { createRestaurant, getAllRest, login, patchRestaurant, deleteRest, getRest, getRestById } = require("../controllers/restaurant.controllers");
const upload = require("../middleWare/multer");


const router = express.Router();

router.get("/getAllRest", upload.single('file'), getAllRest)
router.get("/getRest",auth(), getRest)
router.get("/getRestById/:id", getRestById)
// router.post("/createUser",upload.single('file'), createUser);
router.post("/createRest", createRestaurant);
router.post("/login", login);
router.patch("/editRest", auth(), patchRestaurant);
router.delete("/deleteRest/:idDelete", auth(), deleteRest);



module.exports=router;