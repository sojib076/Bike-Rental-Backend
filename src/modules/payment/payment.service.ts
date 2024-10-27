/* eslint-disable @typescript-eslint/no-explicit-any */
import { BikeModel } from "../bike/bike.model";
import { RentalModel } from "../booking/booking.model";


const confirmationService = async (id: any) => {

    const rental = await RentalModel.findOne({ paymentId: id });
    
    if (!rental) {
        const removetheLastDfromId = id.slice(0, -1);
        const rental = await RentalModel.findOne({ paymentId: removetheLastDfromId });

    // Check if advancePayment is true
    if (rental?.advancedPayment) {
        const removetheLastDfromId = id.slice(0, -1);
        // find by paymentId and set totalPaid to true
            await RentalModel.findOneAndUpdate({ paymentId: removetheLastDfromId }, { totalPaid: true });
        

        return `
        <html>
        <head>
            <title>Payment Successful</title>
             <style>
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
        </head>
        <body>
            <h1>Payment Successful</h1>
            <p>Thank you for your payment</p>
              <a href="https://bike-rental-tau.vercel.app/" class="button" >Go to Home</a>
        </body>
        </html>`;
    } 

       
}

 const setBikeAvailable = await BikeModel.findByIdAndUpdate(rental?.bikeId, { isAvailable: false });
 if (!setBikeAvailable) throw new Error('Error updating bike availability');

 const result = await RentalModel.findByIdAndUpdate(rental?._id, { advancedPayment: true });
 if (!result) throw new Error('Error updating rental');

 return `
<html>
<head>
    <title>Payment Successful</title>
    <style>
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>Payment Successful</h1>
    <p>Thank you for your payment</p>
    <a href="https://bike-rental-tau.vercel.app/" class="button">Go to Home</a>
</body>
</html>
 
 `;
};


export const paymentServices = {
    confirmationService
}