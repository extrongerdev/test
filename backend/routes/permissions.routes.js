const {Router} = require("express");
const { associateToUserById } = require("../controllers/permissions.controller");
const {validateJWT} = require("../middlewares/validate-jwt")
const {check} = require("express-validator");
const {validateFields} = require("../middlewares/validate-fields");

const router = Router();

router.post("/add/:userId", [
        check("permission", "El permiso es obligatorio").not().isEmpty(),
        validateFields,
    ],
    validateJWT,
    associateToUserById
);


module.exports = router;