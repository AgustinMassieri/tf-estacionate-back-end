const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorRegisterUser = [
    check("firstName")
    .exists()
    .notEmpty(),
    check('lastName')
    .exists()
    .notEmpty(),
    check('email')
    .exists()
    .notEmpty()
    .isEmail(),
    check('password')
    .exists()
    .notEmpty()
    .isLength({min: 5}),
    check('age')
    .exists()
    .notEmpty(),
    check('sex')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }  
];

const validatorLoginUser = [
    check('email')
    .exists()
    .notEmpty()
    .isEmail(),
    check('password')
    .exists()
    .notEmpty()
    .isLength({min: 5}),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = {validatorRegisterUser, validatorLoginUser};