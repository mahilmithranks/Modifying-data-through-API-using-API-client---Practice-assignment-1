const express = require('express');
const router = express.Router();
const  MenuItem = require("../models/menuItem");

//ASSESMENT-1
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


//ASSESMENT-2

router.put("/:id",async (req,res) => {
    try {
        const {id} = req.params;
        const {name, description, price} = req.body;

        const updatedItem = await MenuItem.findByIdAndUpdate(
            id,
            {name, description, price},
            {new: true, runValidators: true}
        );

        if(!updatedItem){
            return res.status(404).json({messgae: "menu item not found"});
        }
        res.status(200).json({message: "Menu item updated Successfully",data: updatedItem});
    } catch (error) {
        res.status(500).json({message: "Error updating menu item",error: error.message});
        
    }
});

router.delete("/:id",async (req,res) => {
    try {
        const {id} = req.params;
        const deletedItem = await MenuItem.findByIdAndDelete(id);

        if(!deletedItem){
            return res.status(404).json({message: "Menu item not found"});
        }
        res.status(200).json({message: "Menu item deleted Successfully"});
    } catch (error) {
        res.status(500).json({message: "Error deleting menu item",error: error.message});
        
    }
});

module.exports = router;