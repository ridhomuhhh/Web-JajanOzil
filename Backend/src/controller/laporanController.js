import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create laporan
const createLaporan = async (req, res) => {
  const { tanggal } = req.body;

  try {
    const laporan = await prisma.laporanHarian.create({
      data: {
        tanggal: new Date(tanggal),
      },
    });
    res.status(201).json(laporan);
  } catch (err) {
    res.status(500).json({ error: "Gagal membuat laporan harian" });
  }
};

// Read all laporan
const getAllLaporan = async (req, res) => {
  try {
    const laporan = await prisma.laporanHarian.findMany({
      include: { mitraHarian: true }, // optional kalau mau tampilkan mitra juga
    });
    res.json(laporan);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data laporan harian" });
  }
};

// Read single laporan by id
const getLaporanById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const laporan = await prisma.laporanHarian.findUnique({
      where: { id },
      include: { mitraHarian: true },
    });

    if (!laporan) {
      return res.status(404).json({ error: "Laporan tidak ditemukan" });
    }

    res.json(laporan);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// Update laporan by id
const updateLaporan = async (req, res) => {
  const id = parseInt(req.params.id);
  const { tanggal } = req.body;

  try {
    const laporan = await prisma.laporanHarian.update({
      where: { id },
      data: {
        tanggal: new Date(tanggal),
      },
    });

    res.json(laporan);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengupdate laporan harian" });
  }
};

// Delete laporan by id
const deleteLaporan = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.laporanHarian.delete({
      where: { id },
    });

    res.json({ message: "Laporan harian berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: "Gagal menghapus laporan harian" });
  }
};

export default {
  createLaporan,
  getAllLaporan,
  getLaporanById,
  updateLaporan,
  deleteLaporan,
};
