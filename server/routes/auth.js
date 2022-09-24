import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // first check: is there a user with the same email already
  // findOne will return null if a user with that email is not found
  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(409).json({ msg: 'user already exists' });
  }

  // 2nd: hash the password & store the new user
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds); //saltRounds
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  const savedUser = await user.save();
  console.log(savedUser);

  res.status(201).json({ msg: 'successfully created' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: 'user with that email doesnt exists' });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(403).json({ msg: 'incorrect password' });
  }

  // Create JWT
  const payload = {
    username: email,
    _id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  res.json({ msg: 'logged in successfully', token, user });
});

export default router;
