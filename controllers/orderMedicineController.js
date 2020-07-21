const orderMedicine = require('../models/OrderMedicine');
const { response } = require('express');

exports.getOrder = async (req, res, next) => {
        try {
            const orders = await orderMedicine.find();
            // everything went fine status = OK
            return res.status(200).json({
                success: true,
                count: orders.length,
                data: orders
            });
        } catch (err) {
            // send server error
            return res.send(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }

exports.postOrder = async (req, res, next) => {
    try {
        const { pharmacyName, apartmentNo, streetAddress, 
            postalCode, mobileNumber, prescription, comments } = req.body; 
    
        const orders = await orderMedicine.create(req.body);
    
        return res.status(201).json({
            success: true,
            data: orders
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Cannot post, server error"
        });
    }
}

exports.putOrder = async (req, res, next) => {
    try {
        const orders = await orderMedicine.findById(req.params.id);
        if(!orders){
            return res.status(404).json({
                success: false,
                error: "No order found"
            });
        }
        else{
            const { pharmacyName, apartmentNo, streetAddress, 
                postalCode, mobileNumber, prescription } = req.body;
            await orders.update(req.body);
            return res.status(201).json({
                success: true,
                message: "Order Updated"
            });
        }    
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Cannot put, server error"
        });
    }
}

exports.deleteOrder = async (req, res, next) => {
    try {
        const orders = await orderMedicine.findById(req.params.id);

        if(!orders){
            return res.status(404).json({
                success: false,
                error: "No order found"
            });
        }

        await orders.remove();
        return res.status(200).json({
            success: true,
            message: "Order Deleted"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Cannot post, server error"
        });
    }
}
