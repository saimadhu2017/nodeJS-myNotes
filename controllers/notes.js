const notesModel = require("../models/notes");
const { validateName } = require("../Utilities/validator");


exports.getNotes = async (req, res) => {
    try {
        const result = await notesModel.find({}, { _id: 0, __v: 0 });
        if (result.length > 0) {
            return (
                res.status(200).json({
                    status: "success",
                    "No of records": result.length,
                    data: { result }
                })
            );
        } else {
            return (
                res.status(400).json({
                    status: 'success',
                    data: {
                        message: 'No notes available in the DB',
                    },
                })
            );
        }
    } catch (err) {
        return (
            res.status(404).json({
                status: 'fail',
                message: err,
            })
        );
    }
}

exports.postNotes = async (req, res) => {
    try {
        if (validateName(req.body.name)) {
            const result = await notesModel.create(req.body);
            return (
                res.status(200).json({
                    status: 'success',
                    data: { result }
                })
            );
        } else {
            return (
                res.status(400).json({
                    status: 'error',
                    results: 'Enter valid name',
                })
            );
        }
    } catch (err) {
        return (
            res.status(404).json({
                status: 'fail',
                message: err
            })
        );
    }
}

exports.putNotes = async (req, res) => {
    try {
        const result = await notesModel.findOneAndUpdate(
            { "notesID": req.params.id },
            req.body,
            { runValidators: true, new: true }
        );
        if (result != null) {
            return (
                res.status(200).json({
                    "status": "Success",
                    data: { result }
                })
            );
        } else {
            return (
                res.status(400).json({
                    "status": "fail",
                    data: { "message": `No data found to update the id for ${req.param.id}` }
                })
            );
        }
    } catch (err) {
        return (
            res.status(404).json({
                status: 'fail',
                message: err
            })
        );
    }
}

exports.deleteNotes = async (req, res) => {
    try{
        const result=await notesModel.deleteOne({"notesID": req.params.id});
        if(result.deletedCount==0){
            return(
                res.status(400).json({
                    status: 'fail',
                    message: "No notes available to delete"
                }) 
            );
        }else{
            return(
                res.status(200).json({
                    status: "success",
                    message: `Notes with ${req.params.id} ID deleted`
                })
            );
        }
    }catch(err){
        return(
            res.status(404).json({
                status: 'fail',
                message: err
            })
        );
    }
}

exports.invalidNotes = async (req, res) => {
    return (
        res.status(404).json({
            status: 'fail',
            message: 'Invalid path',
        })
    );
}