import express from 'express'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { uploadOnCloud } from '../utils/cloudinary.js'
import router from '../routes/user.routes.js'
import { User } from '../models/user.model.js'
 const registerUser = asyncHandler(async(req,res)=>{
    // get data from frontend 
    // check for not empty inputs
    // check for existing User
    // check for images and avatars
    // create user object-create entry in db
    // remove password and tokens from response 
    // check for user creation 
    // return res

    const {username,fullName,email,password}=req.body
    // console.log("email:",email)
    // console.log("password:",password)
    if([username,fullName,email,password].some((fields)=>fields?.trim()==="")){
        throw new ApiError(400,"All the fields are required")
    };
    const existedUser = User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }
    const avatarLocalFilePath = req.files?.avatar[0]?.path;
    //const coverImageLocalFilePath = req.files?.coverImage[0]?.path;
    if(!avatarLocalFilePath){
        throw new ApiError(400, "Avatar file is required");
    }
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    const avatar = uploadOnCloud(avatarLocalFilePath)   
    const coverImage = uploadOnCloud(coverImageLocalPath)
    const user = User({username:username.toLowerCase(),
        fullName,email,password,avatar:avatar.url,
        coverImage: coverImage?.url || "",})

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
     
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return new ApiResponse(201,createdUser,"User registered Successfully")
 }) 
 export {registerUser}