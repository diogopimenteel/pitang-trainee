import express from "express";

import UserController from "../controller/UserController.js";
import validation from "../middleware/ValidationMiddleware.js";
import UserValidation from "../validation/UserValidation.js";

const router = express.Router();
const userController = new UserController();

// Login
router.post("/api/login", userController.login);

// Get all users
router.get("/api/user", userController.index);

// Get user by id
router.get("/api/user/:id", userController.getOne);

// Insert user
router.post("/api/user", validation(UserValidation), userController.store);

// Update user by id
router.put("/api/user/:id", validation(UserValidation), userController.update);

// Remove user by id
router.delete("/api/user/:id", userController.remove);

export default router;
