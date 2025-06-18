import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const router = express.Router();

// Login tanpa JWT
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Email tidak ditemukan" });
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    // Login berhasil, kirim data user
    res.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Gagal login", detail: err.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        password: true, // Jangan kirim password
        createdAt: true,
      },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data pengguna" });
  }
});

export default router;
