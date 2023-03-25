const { Router } = require("express");
const { listAll, updateUser, deleteUser} = require("../controllers/user.controller");
const { validateJWT } = require("../middlewares/validate-jwt")

const router = Router();

router.get("/",validateJWT, listAll);

router.put("/:userId",validateJWT, updateUser);

router.delete("/:userId",validateJWT, deleteUser);

module.exports = router;