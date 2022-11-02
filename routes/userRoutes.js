const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")
const { verifyToken} = require("../middleware/auth")
router.post("/register", userController.userRegister);

router.post("/login", userController.userLogin);

router.get("/getUser",verifyToken, userController.getUser);

router.delete("/deleteUser/:id", verifyToken, userController.deleteUserId);

router.put("/updateUser/:id", verifyToken, userController.updateUserById);

module.exports  = router;