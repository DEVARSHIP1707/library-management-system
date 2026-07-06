const {UserModel, BookModel} = require('../models');

exports.getAllUsers = async (req, res) => {

    const users = await UserModel.find();

    if(!users || users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No users found"
        });
    }

    res.status(200).json({
        success: true,
        data: users
    });
}

exports.getSingleUserById = async(req, res)=> {
    const id = req.params.id;

    const user = await UserModel.findById(id);
    // const user = await UserModel.findById({_id:id});
    // const user = await UserModel.findOne({_id:id});

    if(!user) {
        return res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        });
    }

    res.status(200).json({
        success: true,
        data: user
    });
}
exports.createUser = async (req, res) => {
    const data = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to create a new user"
        })
    }

    await UserModel.create(data);
    const getAllUsers = await UserModel.find();

    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        data: getAllUsers
    })
}


exports.updateUserById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to update the user"
        })
    }

    // Check if the user exists
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        });
    }

    // Update the user
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {new: true});

    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User Updated Successfully"
    });
}

exports.deleteUserById = async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        });
    }

    // Delete the user
    await UserModel.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    });
}

exports.getSubscriptionDetailsById = async (req, res) => {
    const id = req.params.id;

    // Find the user by ID
    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        });
    }

    // Extract the subscription details
    const getDateInDays = (data = '') => {
        let date;
        if (data) {
            date = new Date(data);
        } else {
            date = new Date();
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    }

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90
        } else if (user.subscriptionType === "Standard") {
            date = date + 180
        } else if (user.subscriptionType === "Premium") {
            date = date + 365
        }
        return date;
    }

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user._doc,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    }

    res.status(200).json({
        success: true,
        data
    });
}