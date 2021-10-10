const fs=require("fs");
const {promisify}=require("util");
const appendFile=promisify(fs.appendFile);

module.exports=async (req,res,next)=>{
    try{
        const logMessage=`${new Date()} - ${req.method} - ${req.url} \n`;
        await appendFile("RequestLogger.log",logMessage);
        next();
    }catch(err){
        next(err);
    }
}