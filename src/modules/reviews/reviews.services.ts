import { Request } from "express";
import { Review } from "./reviews.model";
import { RentalModel } from "../booking/booking.model";

const addReview = async (req:Request) => {
    const reviewbody = req.body;
    const userId = req.user.userId;
   const  paymentId = req.body.paymentId;
  
   try{
    const result = await Review.create({
        ...reviewbody,
        userId
    })
    if(result){
       const check =  await  RentalModel.findOneAndUpdate({paymentId:paymentId},{reviewAdded:true},{new:true}
        )
        console.log(check);
        return result

    }else{
        return "Review not added"
    }
    
   }
    catch(err){
         console.log(err);
         return err
    }

 

   
};

const getpostreviews = async (bikeId:string) => {
    try{
        const result = await Review.find({bikeId:bikeId}).populate('userId' , 'name email')
        return result
    }catch(err){
        console.log(err);
        return err
    }
    
};


export const reviewService = {
    addReview,
    getpostreviews
};