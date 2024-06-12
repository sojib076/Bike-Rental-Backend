import httpStatus from "http-status";
import AppError from "../error/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import jwt from 'jsonwebtoken';
import { TUserRole } from "../modules/user/user.interface";

export const auth = (...requiredRoles: TUserRole[]) => {
    return asyncHandler(async (req, res, next) => {
      
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      const decoded = jwt.verify(
        token,
        config.jwt_secret as string,
      ) as JwtPayload;
        req.user = decoded;
        console.log(decoded);

        if (requiredRoles && !requiredRoles.includes(decoded.role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You have no access to this route!',
          );
        }
     
      next();
    });
  };
  