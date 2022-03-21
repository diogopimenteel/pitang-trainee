import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { titleCase } from "title-case";

import UserModel from "../model/UserModel.js";

const JWT_SECRET = process.env.JWT_SECRET;

const hashPassword = password => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);

  return hash;
};

export default class UserController {
  async login(request, response) {
    console.log(JWT_SECRET);
    const { email, password } = request.body;

    const user = await UserModel.findOne({ email }).lean();

    if (!user) {
      return response.status(404).json({ message: "User not found!" });
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      return response.status(404).json({ message: "Invalid password!" });
    }

    delete user.password;

    const token = jsonwebtoken.sign(
      { id: user._id, name: user.name, email: user.email },
      JWT_SECRET
    );

    response.json({ token: token });
  }

  async index(request, response) {
    const users = await UserModel.find();

    response.json(users.length === 0 ? { message: "Empty list" } : { data: users });
  }

  async getOne(request, response) {
    const { id } = request.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const user = await UserModel.findById(id);

      if (!user) {
        return response.status(404).json({ message: "User not found!" });
      }

      return response.json({ message: "User found", data: user });
    }

    response.status(400).json({ message: "Invalid id!" });
  }

  async store(request, response) {
    const { name, email, password } = request.body;

    const user = await UserModel.create({
      name: titleCase(name.toLowerCase()),
      email: email.toLowerCase(),
      password: hashPassword(password),
    });

    response.status(201).json({ message: "User created successfully", data: user });
  }

  async remove(request, response) {
    const { id } = request.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const user = await UserModel.findById(id);

      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      await user.remove();

      return response.json({ message: "User removed" });
    }

    response.status(400).json({ message: "Invalid id!" });
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, password } = request.body;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const user = await UserModel.findByIdAndUpdate(
        id,
        {
          name: titleCase(name.toLowerCase()),
          email: email.toLowerCase(),
          password: hashPassword(password),
        },
        {
          new: true,
        }
      );

      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
      return response.json({
        message: "User updated successfully",
        data: user,
      });
    }

    response.status(400).json({ message: "Invalid id!" });
  }
}
