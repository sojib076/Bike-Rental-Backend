import { z } from "zod";

export const userLoginValidation = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
});



export const userRegisterValidation = z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string(),
      phone: z.string(),
      address: z.string(),
    }),
  });


export const  authValidation = {
    userLoginValidation,
    userRegisterValidation

}