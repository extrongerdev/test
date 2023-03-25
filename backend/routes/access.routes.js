const { Router } = require("express");
const { findAllByUserId } = require("../controllers/access.controller");
const { validateJWT } = require("../middlewares/validate-jwt")

const router = Router();

router.get("/:userId",validateJWT, findAllByUserId);

module.exports = router;