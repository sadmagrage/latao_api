const userService = require("../services/userService");
const CustomError = require("../errors/CustomError");

const login = async (req, res) => {
    try {
        const token = await userService.login(req.body);

        res.status(200).json(token);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return
        }
        res.status(500).json(error.message);
    }
}

const register = async (req, res) => {
    /* try { */
        const token = await userService.register(req.body);
        
        res.status(201).json(token);/* 
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return
        }
        res.status(500).json(error.message);
    } */
}

const data = async (req, res) => {
    try {
        const data = await userService.data(req.header("Authorization"));
        
        res.status(200).json(data);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return
        }
        res.status(500).json(error.message);
    }
};

const update = async (req, res) => {
    try {
        const user = await userService.update(req.body, req.header("Authorization"));

        res.status(200).json(user);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return
        }
        res.status(500).json(error.message);
    }
};

const del = async (req, res) => {
    try {
        const message = await userService.del(req.header("Authorization"));

        res.status(200).json(message);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return
        }
        res.status(500).json(error.message);
    }
};

module.exports = { login, register, data, update, del };