import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all Mitra
const getAllMitra = async (req, res) => {
  try {
    const mitra = await prisma.mitraHarian.findMany({
      include: { produkDititipkan: true },
    });
    res.json(mitra);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data mitra harian" });
  }
};

// Get Mitra by ID
const getMitraById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const mitra = await prisma.mitraHarian.findUnique({
      where: { id },
      include: { produkDititipkan: true },
    });

    if (!mitra) {
      return res.status(404).json({ error: "Mitra tidak ditemukan" });
    }

    res.json(mitra);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data mitra" });
  }
};

// Create Mitra
const createMitra = async (req, res) => {
  const { namaMitra, laporanHarianId } = req.body;

  try {
    const mitra = await prisma.mitraHarian.create({
      data: {
        namaMitra,
        laporanHarianId,
      },
    });

    res.status(201).json(mitra);
  } catch (err) {
    res.status(500).json({ error: "Gagal menambahkan mitra harian" });
  }
};

// Update Mitra
const updateMitra = async (req, res) => {
  const id = parseInt(req.params.id);
  const { namaMitra } = req.body;

  try {
    const updatedMitra = await prisma.mitraHarian.update({
      where: { id },
      data: { namaMitra },
    });

    res.json(updatedMitra);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengupdate mitra" });
  }
};

// Delete Mitra
const deleteMitra = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.mitraHarian.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Mitra deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllMitra,
  getMitraById,
  createMitra,
  updateMitra,
  deleteMitra,
};
