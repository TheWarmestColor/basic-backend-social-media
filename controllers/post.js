const express = require("express");
const Post = require("../model/post");
const mongoose = require("mongoose")

//@desc     Get all Posts
//@route    GET /api/v1/Post/
//@access   Private/Admin
 
exports.getAllPosts = async (req, res, next) => {
    try{
        const post = await Post.find({});
        if (post.length > 0){
            res.status(200).json(post)
        }
        else{
            res.status(400).json({message:"No Post found"})
        }
    }
    catch(err){
        res.status(400).json({message: err.message, errorcode: err.code})
    }
};

//=====================
//@desc     Get one Post
//@route    GET /api/v1/Post/:id
//@access   Public
exports.getOnePost = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id)
        if (post){
            res.status(200).json(post)
        }
        else{
            res.status(400).json({message:"No Post found"})
        }
    }
    catch(err){
        res.status(400).json({message: err.message, errorcode: err.code})
    }
};

//=====================
//@desc     Create one Post
//@route    POST /api/v1/Post/
//@access   Private/ User
exports.createOnePost = async (req, res, next) => {
    try{
        const post = await Post.create(req.body);
        res.status(200)
            .json(
                {message: "success",
                data: post
                }
            );
    }
    catch (err) {
        res.status(400).json({message: err.message, errorcode: err.code})
    }
    next()

};

//=====================
//@desc     Delete one Post
//@route    DELETE /api/v1/Post/:id
//@access   Private/Admin/Post owner
exports.deleteOnePost = async (req, res, next) => {
    try{
        const post = await Post.findByIdAndDelete(req.params.id);
        if (post){
            res.status(200).json({data: post});
            req.commentId = post.commentId
        }
        else{
            res.status(400).json({message:"No Post with that id found and we can't delete nothing right?"})
        }
    }
    catch(err){
        res.status(400).json({message: err.message, errorcode: err.code})
    }
    next()
};

//=====================
//@desc     Delete all Posts
//@route    DELETE /api/v1/Post/
//@access   Private/Admin
exports.deleteAllPosts = async (req, res, next) => {
    try{
        if (req.body.message && req.body.message  == "I'm totally sure that I'm gonna delete the whole Post database"){
            const post = await Post.deleteMany({})
            res.status(200).json({message: "Post database reseted!", deletedData: post})
        }
        else{
            res.status(400).json({message: "If you're not sure then we won't delete the Post database"})
        }
    }
    catch (err) {
        res.status(400).json({message: err.message, errorcode: err.code})
    }
    next()
};

//=====================
//@desc     Update one Post
//@route    UPDATE /api/v1/Post/:id
//@access   Private/Post
exports.updateOnePost = async (req, res, next) => {
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({data: post})
    }
    catch(err){
        res.status(400).json({message: err.message, errorcode: err.code})
    }
};
