const express = require('express');
const router = express.Router();
const  MenuItem = require("../models/menuItem");


router.get("/",async (req,res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({message: "Error fetching menu items",error: error.message});
        
    }
});


router.post("/",async (req,res) => {
    try {
        const { name, description, price } = req.body;

        if (!name || !price){
            return res.status(400).json({message: "Name and price are required."});
        }
        const newItem = new MenuItem({ name, description, price});
        await newItem.save();
        
        res.status(201).json({message: "Menu item added successfully!!",data: newItem});
    } catch (error) {
        res.status(500).json({message: "Error adding menu item", error: error.message});
        
    }
});

module.exports = router;