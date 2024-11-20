const EmployeModel = require('../model/EmpModel')
const { ObjectId } = require('mongodb')
const InserModel = require('../model/model')
const Collections = require('../db/Collection')

//get all employee
exports.getAllEmp = async (req, res, next) => {
    try {
        //user id
        const { user_id } = req

        //flags for if user_id is not
        if (!user_id || user_id.length == 0 || user_id == "" || user_id == null) {
            return res.status(200).json({
                success: 'true',
                message: 'you are not user'
            })
        }
        //check user exist by user_id
        const checkUser = await InserModel.findOne({ _id: user_id })

        //if user exist who's fetching all data then got all data
        if (checkUser) {
            const allEmp = await EmployeModel.find({})
            allEmp ? res.status(200).json({
                success: 'true',
                data: allEmp
            }) : res.status(200).json({
                success: 'false',
                message: 'failed to fetch data'
            })
        }

    } catch (err) {
        res.json({
            success: 'false',
            message: "something went wrong"
        })
    }
}
exports.CreateEmployee = async (req, res, next) => {
    try {
        const EmmplyeDetails = {
            empName: req.body.name,
            empEmail: req.body.email,
            empAddress: req.body.address,
            empPhone: req.body.phone,
            userId: req.user_id
        }
        if (Object.values(EmmplyeDetails) == '' || Object.values(EmmplyeDetails).length == 0 || !Object.values(EmmplyeDetails) ||
            Object.values(EmmplyeDetails) == null) {
            return res.status(200).json({
                success: 'false',
                message: 'missing details of employee'
            })
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
            success: 'false',
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
            data: UpdateEmp
        }) : res.json(
            {
                success: 'false',
                message: "failed to Update"
            })
    } catch (err) {
        res.json({
            success: 'false',
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
        if (!id.length == 0 || id !== 'undefined' || id !== '' || id !== isNaN) {
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
                success: 'false',
                message: 'failed to delete employe'
            })
        }
    }
    catch (err) {
        console.log(err)
        res.json({
            success: 'false',
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
        if (!resData || resData.length ==  0 || resData === "" || resData == null) {
            console.log("hello")
            return res.status(200).json({
                success: 'false',
                message: 'employee not found',
            })
        } else {
            res.status(200).json({
                success: 'true',
                message: "employe fetch",
                data: resData
            })
        }
    }
    catch (err) {
        res.status(200).json({
            success: 'false',
            message: "sometning went wrong"
        })
    }
}

//get employee by user id
exports.GetEmployeByUser = async (req, res, next) => {
   try{
    const { user_id } = req;
    const FetchEmp = await EmployeModel.aggregate([ 
        { $match: { userId: new ObjectId(user_id) } },
        {
            $lookup: {
                from:'users',
                localField:"userId", 
                foreignField:"_id", 
                as:"data"
            }
            
        },
        {
            $unwind:'$data'
        },
        {
            $project:{
                'data.password':0
            }
        }
    ])
    
    if(FetchEmp){
        res.status(200).json({
            success:'true',
            data:FetchEmp
        })
    }else{
        res.status(200).json({
            success:'false',
            message:'failed to fetch data'
        })
    }
   }catch(err){
    res.json({
        success:'false',
        message:'something went wrong'
    })
   }
}