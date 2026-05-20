import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { ZodError } from "zod";

import { registerSchema, loginSchema } from "../validators/auth.validator";

import User from "../models/user.models";
import generateToken from "../utils/generateToken";

//register user

export const registerUser = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const { name, email, password } = validatedData;

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPass,

      role: "sales",
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      message: "User registered",

      token,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: err.issues[0].message,
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};

//login user

export const loginUser = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const { email, password } = validatedData;

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(400).json({
        message: "Invalid details",
      });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid details",
      });
    }

    const token = generateToken(existUser._id.toString());

    res.status(200).json({
      message: "User logged",

      token,

      user: {
        _id: existUser._id,
        name: existUser.name,
        email: existUser.email,
        role: existUser.role,
      },
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: err.issues[0].message,
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};
