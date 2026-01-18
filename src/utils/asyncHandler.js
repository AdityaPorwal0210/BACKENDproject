// const asyncHandler = (func)=>async(res,req,next)=>{
//     try {
//         await func(res,req,next)
//     } catch (error) {
//         res.status(error.code||400)
//         .json({
//             success:false,
//             message:error.message
//         })
//     }

// }
const asyncHandler = (requestHandler)=>{
   return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((error)=>next(error))
    }
}
export {asyncHandler}