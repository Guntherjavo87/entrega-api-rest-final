// auth.controller.js
import jwt from "jsonwebtoken";

const default_user = {
  id: 1,
  email: "user@email.com",
  password: "strongPass123",
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (email === default_user.email && password === default_user.password) {
    const payload = { user: { id: default_user.id, email } };
    const expiration = { expiresIn: "1h" };

    const token = jwt.sign(payload, process.env.JWT_SECRET, expiration);
    return res.json({ token });
  }

  return res.sendStatus(401);
};
