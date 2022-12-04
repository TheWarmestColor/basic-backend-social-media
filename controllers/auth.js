const express = require("express");
const User = require("../model/user");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

//@desc     Login the app
//@route    GET /api/v1/auth/
//@access   Public/Group member

exports.logIn = async (req, res, next) => {
    try{
        const user = await User.findOne({"username":req.body.username})
        if (!user){
            res.status(400).json({message:"No user found"})
           
        }
        else if(!bcrypt.compareSync(req.body.password, user.password)){
            res.status(400).json({message:"Password is incorrect!"})
        }
        else{
            res.cookie("secureCookie", JSON.stringify(user.getJwtToken(user.username)),{httpOnly: true})
            res.status(200).json(user) 
        }
    }
    catch(err){
        res.status(400).json({message: err.message, errorcode: err.code})
    }
};

//@desc     Register new user for the app
//@route    POST /api/v1/auth/
//@access   Public/Group member

exports.register = async (req, res, next) => {
    try{
        const user = await User.create(req.body);
        res.status(200)
            .json(
                {message: "success",
                data: user
                }
            );
    }
    catch (err) {
        res.status(400).json({message: "nope", errcode: err.code})
        console.log(err)
    }
};

//@desc     Change existing user's password
//@route    PATCH /api/v1/auth/
//@access   Private/User

exports.changePassword = async (req, res ,next) => {
    try{
        const user = await User.findOne({"username":req.body.username})
        let newPassword = user.password
        if(bcrypt.compareSync(req.body.password, user.password)){
            newPassword = bcrypt.hashSync(req.body.newPassword, 10)
            res.status(400).json({newPassword: newPassword})
        }
        let updatedUser = await User.findOneAndUpdate({"username":req.body.username},{"password":newPassword})
    }
    catch(err){
        res.status(400).json({message:err.message, errorcode: err.code})
    }
}

//@desc     Testing route
//@route    PATCH /api/v1/auth/test
//@access   Private Admin
