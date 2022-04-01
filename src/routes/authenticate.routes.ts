import { Router } from "express";
import { RefreshTokenUseController } from "src/modules/accounts/useCases/refresh_token/refreshTokenUseController";
import { AuthenticateUserController } from "../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController;
const refreshTokenUseController = new RefreshTokenUseController;

authenticateRoutes.post("/sessions", authenticateUserController.handle)
authenticateRoutes.post("/refresh-token", refreshTokenUseController.handle)

export {authenticateRoutes}