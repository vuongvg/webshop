const express=require('express')
const { findAllReviews, findReviewBySlugProduct, insertReview } = require('../controllers/reviewCtrl')
const { asyncWrapper } = require('../middlewares/asyncWrapper')
const router=express.Router()

router.post('/',asyncWrapper(async(req,res)=>{
    const result= await insertReview(req.body)
    res.json(result)
}))

router.get('/:slug',asyncWrapper(async(req,res)=>{
    const reviews= await findReviewBySlugProduct(req.params.slug)
    res.json(reviews)
}))

router.get('/',asyncWrapper(async(req,res)=>{
    const reviews= await findAllReviews()
    res.json(reviews)
}))

module.exports=router
