const Property = require('../models/Property')
const User = require('../models/User')
const propertyController = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')


// get all
propertyController.get('/getAll', async(req, res) =>{
    try {
        const properties = await Property.find({})

        return res.status(200).json(properties)
    } catch (error) {
        return res.status(500).json(error.message)
        
    }
})

// get featured
propertyController.get('/find/featured', async(req, res) =>{
    try {
        const featuredProperties = await Property.find({featured: true}).populate('currentOwner', '-password')

        return res.status(200).json(featuredProperties)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get all from a specific type
propertyController.get('/find', async (req, res) =>{
    const type = req.query
    try {
        if(type){
            const properties = await Property.find(type).populate('currentOwner', '-password')
            return res.status(200).json(properties)
     }else{
        return res.status(500).json({msg: "No such type"})
     }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get count of types
propertyController.get('/find/types', async(req, res) => {
    try {
        const beachType = await Property.countDocuments({type: 'beach'})
        const mountainType = await Property.countDocuments({type: 'mountain'})
        const villageType = await Property.countDocuments({type: 'village'})

        return res.status(200).json({
            beach: beachType,
            mountain: mountainType,
            village: villageType
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})
//get individual property
propertyController.get("/find/:id", async(req, res) =>{
    try {
        const property = await Property.findById(req.params.id).populate("currentOwner", '-password')

        if(!property){
            throw new Error("No such property with this id")
        }else{
            return res.status(200).json(property)
        }
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// create a property
propertyController.post('/', verifyToken, async(req, res) => {
    try {
       const newProperty = await Property.create({...req.body, currentOwner: req.user.id})


       return res.status(201).json(newProperty)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// update a property
propertyController.put("/:id", verifyToken, async(req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        if(property.currentOwner.toString() !== req.user.id.toString()){
            throw new Error("You are not allowd to update other peoples properties")
        } else {
            const updateProperty = await Property.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            )


            return res.status(200).json(updateProperty)
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// delete a property
propertyController.delete("/:id", verifyToken, async(req, res) => {
    try {
        const property = await Property.findById(req.params.id)

        if(property.currentOwner.toString() !== req.user.id.toString()){
            throw new Error("You are not allowed to delete other peoples properties")
        } else {
            await property.delete()

            return res.status(200).json({msg: 'Successfully deleted property'})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


module.exports = propertyController




