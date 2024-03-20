const asyncHandler= (requestHandler) => {
 (req,res,next)=> {
    Promise.resolve(requestHandler(req,res,next)).
    catch((err) => next(err));
 }

 }



export {asyncHandler};
//we can write this asynHandler as belwo 


// const asyncHandler = (fn)=> async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

