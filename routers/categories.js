const express=require('express')
const { findAllCategories } = require('../controllers/categoriesCtrl')
const { asyncWrapper } = require('../middlewares/asyncWrapper')
const router=express.Router()

router.get('/',asyncWrapper(async(req,res)=>{
    const categories=await findAllCategories()
    res.json(categories)
}))

module.exports=router 