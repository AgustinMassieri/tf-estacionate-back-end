const handleHttpError = (res, message, code) => {
    res.status(code);
    res.send({error: message});
}

module.exports = {handleHttpError};