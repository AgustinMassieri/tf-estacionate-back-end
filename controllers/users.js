const {usersModel} = require('../models');

const getUsers = async (req, res) => {
    const data = await usersModel.find({});
    res.send({data});
}

const getUser = async (req, res) => {

}

const createUser = async (req, res) => {
    const {body} = req;
    const data = await usersModel.create(body);
    res.send({data});
}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };