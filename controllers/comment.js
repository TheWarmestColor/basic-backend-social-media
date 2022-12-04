const express = require("express");
const Comment = require("../model/comment");
const mongoose = require("mongoose");


//@desc     Get all Posts
//@route    GET /api/v1/Comment/
//@access   Private/Admin
 
exports.getAllComments = async (req, res, next) => {
    try{
        const comment = await Comment.find({});
        if (comment.length > 0){
            res.status(200).json(comment)
        }
        else{
            res.status(400).json({message:"No Comment found"})
        }
    }
    catch(err){
        res.status(400).json({message: err.message, errorcode: err.code})
    }
};

//@desc     Get Comment from an id
//@route    GET /api/v1/Comment/:id
//@access   Public/Post member

exports.getPostComment = async (req, res, next) => {
    try{
        const comment = await Comment.find({_id: req.params.id});
        if (comment.length == 1){
            res.status(200).json({comment})
        }
        else{
            res.status(400).json({message: "no comment with that id found"})
        }

    }
    catch(err){
        res.status(400).json({message: err.message, errcode: err.code})
    }
    next()
};

//=====================
//@desc     Create a Comment
//@route    POST /api/v1/Comment
//@access   Public/User
exports.createComment = async (req, res, next) => {
    try{
        const comment = await Comment.create(req.body);
        res.status(200).json({comment})
        req.body._id = comment._id.toString()
    }
    catch (err) {
        res.status(400).json({message: err.message, errcode: err.code})
    }
    next()
};

//=====================
//@desc     Delete one Comment message
//@route    DELETE /api/v1/Comment/:id
//@access   Public/User
exports.deleteComment = async (req, res, next) => {
    try{
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (comment){
            res.status(200).json({comment})
            req.postId = comment.postId
        }
        else{
            res.status(400).json({message:"No Comment with that id found and we can't delete nothing right?"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: err.message ,errcode: err.code})
    }
    next()
};

//=====================
//@desc     Delete all Comment message
//@route    DELETE /api/v1/Comment/
//@access   Private/Admin
exports.deleteAllComments = async (req, res, next) => {
    try{
        if (req.body.message && req.body.message  == "I'm totally sure that I'm gonna delete the whole Comment database"){
            const comment = await Comment.deleteMany({})
            res.status(200).json({message: "All the Comment is deleted!", deletedData: comment})
        }
        else{
            res.status(400).json({message: "If you're not sure then we won't delete the Comment database"})
        }
    }
    catch (err) {
        res.status(400).json({message:err.message})
    }
    next()
};

//=====================
//@desc     Update one Comment message
//@route    UPDATE /api/v1/Comment/:id
//@access   Public/User
exports.updateComment = async (req, res, next) => {
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({comment})
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
};
