const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorCreateParking = [
    check("name")
    .exists()
    .notEmpty(),
    check('location')
    .exists()
    .notEmpty(),
    check('numberOfParkingSpacesAvailable')
    .exists()
    .notEmpty(),
    check('owner')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetParking = [
    check('id')
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorUpdateParking = [
    check('numberOfParkingSpacesAvailable')
    .isNumeric({min: 0}),
    (req, res, next) => {   
        return validateResults(req, res, next);
    }
];
    
module.exports = {validatorCreateParking, validatorGetParking, validatorUpdateParking};