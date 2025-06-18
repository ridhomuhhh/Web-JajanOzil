import express from "express";
import mitraRoute from "./src/route/mitraRoute.js"; // Pastikan path ini sesuai dengan struktur folder Anda
import laporanRoute from "./src/route/laporanRoute.js"; // Pastikan path ini sesuai dengan struktur folder Anda
import produkRoute from "./src/route/produkRoute.js"; // Pastikan path ini sesuai dengan struktur folder Anda
import authRoute from "./src/route/authRoute.js";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(express.json()); // WAJIB ada
app.use(cors());

app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Test User" }]);
});

app.use("/mitra", mitraRoute);
app.use("/auth", authRoute); // Pastikan path ini sesuai dengan struktur folder Anda
app.use("/laporan", laporanRoute);
app.use("/produk", produkRoute); // Pastikan path ini sesuai dengan struktur folder Anda

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
