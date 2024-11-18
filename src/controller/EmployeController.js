const EmployeModel = require('../model/EmpModel')
const { ObjectId } = require('mongodb')
exports.CreateEmployee = async (req, res, next) => {
    try {
        const EmmplyeDetails = {
            empName: req.body.name,
            empEmail: req.body.email,
            empAddress: req.body.address,
            empPhone: req.body.phone
        }
        const InsertEmp = await EmployeModel.create(EmmplyeDetails)
        if (InsertEmp) {
            res.status(200).json({
                success: 'true',
                message: 'employee create success'
            })
        } else {
            res.json({
                success: 'false',
                message: "failed to create employe"
            })
        }
    } catch (err) {
        res.json({
            success: "false",
            message: "unable to create employee",
            error: err
        })
    }
}

//get single employee

exports.SingleEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;
        const FindUser = await EmployeModel.findOne({ _id: id })
        if (FindUser) {
            res.status(200).json({
                success: "true",
                message: `user find success`,
                data: FindUser
            })
        } else {
            res.status(204).json({
                success: 'false',
                message: `faild to find user`
            })
        }
    }
    catch (err) {
        res.json({
            success: 'failed',
            message: "something went to wrong ",
            error: err
        })
    }
}

//update employee
exports.UpdateEmployee = async (req, res, next) => {
    try {
        const { id } = req.params
        const EmmplyeDetails = {
            empName: req.body.name,
            empEmail: req.body.email,
            empAddress: req.body.address,
            empPhone: req.body.phone
        }
        if (!id || id == 'undefined' || id == '' || id == null) {
            return res.json({
                success: 'false',
                message: "Invalid id provided"
            })

        }
        const UpdateEmp = await EmployeModel.updateOne({ _id: id }, { $set: EmmplyeDetails })
        UpdateEmp ? res.status(200).json({
            success: 'true',
            message: "employe Update ",
            data:UpdateEmp
        }) : res.json(
            {
                success: 'false',
                message: "failed to Update"
            })
    } catch (err) {
        res.json({
            success: 'failed',
            message: 'something went wrong',
            error: err
        })
    }

}

//delete employee
exports.DeleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.params
        // if(!id || id=='undefine' || id=="" || id==null){

        // }
        if (id.length === 0 || id !== 'undefined' || id !== '' || id !== isNaN) {
            const UpdateEmp = await EmployeModel.deleteOne({ _id: new ObjectId(id) })

            UpdateEmp ? res.status(200).json({
                success: 'true',
                message: "employe delete successfull"
            }) : res.json({
                success: 'false',
                message: "failed to delete employee"
            })
        }
        else {
            res.json({
                success: 'failed',
                message: 'failed to delete employe'
            })
        }
    }
    catch (err) {
        console.log(err)
        res.json({
            success: 'failed',
            message: 'something went wrong',
            error: err
        })
    }
}

//search 
exports.SearchEmployee = async (req, res, next) => {
    try {
        const { search } = req.query
        const SearchData = {
            $or: [
                { empName: { $regex: `^${search}`, $options: 'i' } },
                { empEmail: { $regex: `^${search}`, $options: "i" } },
                { empPhone: { $regex: `^${search}`, $options: "i" } },
                { empAddress: { $regex: `^${search}`, $options: "i" } }
            ]
        }
        const resData = await EmployeModel.find(SearchData)
        resData ? res.status(200).json({
            success: 'true',
            message: 'data fetched',
            data: resData
        }) : res.json({
            success: 'false',
            message: 'failed to fecth'
        })
    }
    catch (err) {

    }
}