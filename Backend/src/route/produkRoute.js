// === FILE: routes/produk.js ===
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Create ProdukDititipkan
router.post("/", async (req, res) => {
  const { idMitraHarian, namaProduk, jumlahTitip, harga, sisa } = req.body;

  try {
    const produkTerjual = jumlahTitip - sisa;
    const totalPendapatan = produkTerjual * harga;

    const produk = await prisma.produkDititipkan.create({
      data: {
        idMitraHarian,
        namaProduk,
        jumlahTitip,
        harga,
        sisa,
        produkTerjual,
        totalPendapatan,
      },
    });

    res.status(201).json(produk);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Gagal menambahkan produk", detail: err.message });
  }
});

// Read all ProdukDititipkan
router.get("/", async (req, res) => {
  try {
    const produk = await prisma.produkDititipkan.findMany({
      include: {
        mitraHarian: true,
      },
    });
    res.json(produk);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data produk" });
  }
});

// Read produk by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const produk = await prisma.produkDititipkan.findUnique({
      where: { id },
      include: { mitraHarian: true },
    });

    if (!produk)
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    res.json(produk);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil produk" });
  }
});

// Update ProdukDititipkan
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { namaProduk, jumlahTitip, harga, sisa } = req.body;

  try {
    const produkTerjual = jumlahTitip - sisa;
    const totalPendapatan = produkTerjual * harga;

    const updated = await prisma.produkDititipkan.update({
      where: { id },
      data: {
        namaProduk,
        jumlahTitip,
        harga,
        sisa,
        produkTerjual,
        totalPendapatan,
      },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengupdate produk" });
  }
});

// Delete ProdukDititipkan
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.produkDititipkan.delete({ where: { id } });
    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: "Gagal menghapus produk" });
  }
});

export default router;
