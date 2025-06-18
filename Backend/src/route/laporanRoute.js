import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ CREATE laporan harian
router.post("/", async (req, res) => {
  const { tanggal } = req.body;

  try {
    const laporan = await prisma.laporanHarian.create({
      data: {
        tanggal: new Date(tanggal), // pastikan input format ISO atau yyyy-mm-dd
      },
    });
    res.status(201).json(laporan);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Gagal membuat laporan harian", detail: err.message });
  }
});

// ✅ READ all laporan harian
router.get("/", async (req, res) => {
  try {
    const laporan = await prisma.laporanHarian.findMany({
      include: {
        mitraHarian: {
          include: {
            produkDititipkan: true,
          },
        },
      },
    });
    res.json(laporan);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data laporan" });
  }
});

// ✅ READ laporan by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const laporan = await prisma.laporanHarian.findUnique({
      where: { id },
      include: {
        mitraHarian: {
          include: {
            produkDititipkan: true,
          },
        },
      },
    });

    if (!laporan)
      return res.status(404).json({ error: "Laporan tidak ditemukan" });

    res.json(laporan);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil laporan" });
  }
});

// ✅ UPDATE tanggal laporan
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { tanggal } = req.body;

  try {
    const updated = await prisma.laporanHarian.update({
      where: { id },
      data: { tanggal: new Date(tanggal) },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengupdate laporan" });
  }
});

// ✅ DELETE laporan harian
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.laporanHarian.delete({ where: { id } });
    res.json({ message: "Laporan berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: "Gagal menghapus laporan" });
  }
});

export default router;
