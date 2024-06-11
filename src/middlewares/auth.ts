import httpStatus from "http-status";
import AppError from "../error/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import jwt from 'jsonwebtoken';

export const auth = () => {
    return asyncHandler(async (req, res, next) => {
      const token = req.headers.authorization;
  
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret as string,
      ) as JwtPayload;
  
        req.user = decoded;
     
      next();
    });
  };
  