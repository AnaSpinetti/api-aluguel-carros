import { Router } from "express";
import { ResetPasswordController } from "src/modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordMailController } from "src/modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { AuthenticateUserController } from "../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle)
passwordRoutes.post("/resetPassword", resetPasswordController.handle)

export {passwordRoutes}