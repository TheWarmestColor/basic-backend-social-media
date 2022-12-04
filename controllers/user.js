const express = require("express");
const User = require("../model/user");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

//@desc     Get all users
//@route    GET /api/v1/user
//@access   Private/Admin

exports.getAllUsers = async (req, res, next) => {
    const user = await User.find({});
    res.status(200).json({user})
};

//=====================
//@desc     Get one user
//@route    GET /api/v1/user/:id
//@access   Private/Admin
exports.getOneUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id)
        if (user){
            res.status(200).json(user)
        }
        else{
            res.status(400).json({message:"No user found"})
        }
    }
    catch(err){
        res.status(400).json({message:"Nope", errorcode: err.code})
    }
};

//=====================
//@desc     Create one user
//@route    POST /api/v1/user/
//@access   Private/Admin
exports.createOneUser = async (req, res, next) => {
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

//=====================
//@desc     Delete one user
//@route    DELETE /api/v1/user/:id
//@access   Private/Admin
exports.deleteOneUser = async (req, res, next) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if (user){
            res.status(200).json({data: user});
        }
        else{
            res.status(400).json({message:"No user found and we can't delete nothing right?"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"Nope",errcode: err.code})
    }
};

//=====================
//@desc     Delete all users expect admin
//@route    DELETE /api/v1/user/
//@access   Private/Admin
exports.deleteAllUsers = async (req, res, next) => {
    try{
        
        const user = await User.deleteMany({ _id : {$ne:process.env.ADMIN_ID}})
        res.status(200).json({message: "Userbase reseted!", deletedData: user})
    }
    catch{
        res.status(400).json({message:err.message})
    }
};

//=====================
//@desc     Update one user
//@route    UPDATE /api/v1/user/:id
//@access   Private/Admin
exports.updateOneUser = async (req, res, next) => {
    try{
        const processingUser = await User.findById(req.params.id)
        if (req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({data: user})
    }
        catch(err){
            console.log(err)
        }
};
