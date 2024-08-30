import { Request, Response } from "express";
import { paymentServices } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {

const query = req.query.transactionId;
    const result = await paymentServices.confirmationService(query);
    res.send(result)
};

export const paymentControler = {
    confirmationController
}