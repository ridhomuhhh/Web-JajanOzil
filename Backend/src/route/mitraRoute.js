import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ CREATE mitra harian
router.post("/", async (req, res) => {
  const { idLaporanHarian, namaMitra } = req.body;

  try {
    const mitra = await prisma.mitraHarian.create({
      data: {
        idLaporanHarian,
        namaMitra,
      },
    });
    res.status(201).json(mitra);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Gagal menambahkan mitra", detail: err.message });
  }
});

// ✅ READ all mitra harian
router.get("/", async (req, res) => {
  try {
    const mitras = await prisma.mitraHarian.findMany({
      include: {
        laporanHarian: true,
        produkDititipkan: true,
      },
    });
    res.json(mitras);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data mitra" });
  }
});

// ✅ READ one mitra by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const mitra = await prisma.mitraHarian.findUnique({
      where: { id },
      include: {
        laporanHarian: true,
        produkDititipkan: true,
      },
    });
    if (!mitra) return res.status(404).json({ error: "Mitra tidak ditemukan" });
    res.json(mitra);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data mitra" });
  }
});

// ✅ UPDATE mitra harian
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { namaMitra } = req.body;

  try {
    const updated = await prisma.mitraHarian.update({
      where: { id },
      data: { namaMitra },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengupdate mitra" });
  }
});

// ✅ DELETE mitra harian
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.mitraHarian.delete({
      where: { id },
    });
    res.json({ message: "Mitra berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: "Gagal menghapus mitra" });
  }
});
export default router;
