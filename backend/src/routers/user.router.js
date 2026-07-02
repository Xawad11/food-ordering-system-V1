import { Router } from "express";
import jwt from "jsonwebtoken";
import { BAD_REQUEST } from "../constants/httpStatus.js";
import handler from "express-async-handler";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import auth from "../middleware/auth.mid.js";
import admin from "../middleware/admin.mid.js";

const router = Router();
const PASSWORD_HASH_SALT_ROUNDS = 10;

router.post(
  "/login",
  handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
      return;
    }

    res.status(BAD_REQUEST).send("Username or password is invalid");
  })
);

router.post(
  "/register",
  handler(async (req, res) => {
    const { name, email, password, address } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(BAD_REQUEST).send("User already exists, please login!");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS);
    const newUser = await UserModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      address,
    });

    res.send(generateTokenResponse(newUser));
  })
);

router.put(
  "/updateProfile",
  auth,
  handler(async (req, res) => {
    const { name, address } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      { name, address },
      { new: true }
    );

    if (!user) {
      res.status(BAD_REQUEST).send("User not found");
      return;
    }

    res.send(generateTokenResponse(user));
  })
);

router.put(
  "/changePassword",
  auth,
  handler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      res.status(BAD_REQUEST).send("Change Password Failed!");
      return;
    }

    const equal = await bcrypt.compare(currentPassword, user.password);
    if (!equal) {
      res.status(BAD_REQUEST).send("Current Password Is Not Correct!");
      return;
    }

    user.password = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS);
    await user.save();

    res.send({ message: "Password changed successfully" });
  })
);

router.get(
  "/getAll/:searchTerm?",
  admin,
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const filter = searchTerm ? { name: { $regex: new RegExp(searchTerm, "i") } } : {};
    const users = await UserModel.find(filter, { password: 0 });
    res.send(users);
  })
);

router.put(
  "/toggleBlock/:userId",
  admin,
  handler(async (req, res) => {
    const { userId } = req.params;

    if (userId === req.user.id) {
      res.status(BAD_REQUEST).send("Can't block yourself!");
      return;
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(BAD_REQUEST).send("User not found");
      return;
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.send({ isBlocked: user.isBlocked });
  })
);

router.get(
  "/getById/:userId",
  admin,
  handler(async (req, res) => {
    const { userId } = req.params;
    const user = await UserModel.findById(userId, { password: 0 });

    if (!user) {
      res.status(BAD_REQUEST).send("User not found");
      return;
    }

    res.send(user);
  })
);

router.put(
  "/update",
  admin,
  handler(async (req, res) => {
    const { id, name, email, address, isAdmin } = req.body;
    const user = await UserModel.findByIdAndUpdate(id, { name, email, address, isAdmin });

    if (!user) {
      res.status(BAD_REQUEST).send("User update failed");
      return;
    }

    res.send({ message: "User updated successfully" });
  })
);

const generateTokenResponse = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "60d" }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

export default router;
