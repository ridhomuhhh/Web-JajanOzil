// Laporan.jsx

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";

const Laporan = () => {
  const [username] = useState("Admin");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState("semua");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Load transactions from localStorage
  useEffect(() => {
    const loadTransactions = () => {
      try {
        const savedTransactions = localStorage.getItem("transactions");
        if (savedTransactions) {
          const parsedTransactions = JSON.parse(savedTransactions);
          setTransactions(parsedTransactions);
        }
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();

    // Listen for localStorage updates
    const handleStorageUpdate = () => {
      loadTransactions();
    };

    window.addEventListener("localStorageUpdated", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  // Generate reports from transactions
  useEffect(() => {
    if (transactions.length === 0) {
      setFilteredReports([]);
      return;
    }

    // Group transactions by date
    const reportsByDate = {};

    transactions.forEach((transaction) => {
      const date = transaction.date;

      if (!reportsByDate[date]) {
        reportsByDate[date] = {
          date: date,
          partners: new Set(),
          totalProductsSold: 0,
          totalRevenue: 0,
          totalUmkmProfit: 0,
          transactions: [],
        };
      }

      // Add partner name to set (to count unique partners)
      reportsByDate[date].partners.add(transaction.partnerName);

      // Add transaction data
      reportsByDate[date].transactions.push(transaction);

      // Calculate totals
      if (transaction.products && Array.isArray(transaction.products)) {
        transaction.products.forEach((product) => {
          reportsByDate[date].totalProductsSold += parseInt(product.sold || 0);
          reportsByDate[date].totalRevenue += parseInt(
            product.totalRevenue || 0
          );
          reportsByDate[date].totalUmkmProfit += parseInt(
            product.umkmProfit || 0
          );
        });
      }
    });

    // Convert to array and sort by date (newest first)
    const reportsArray = Object.values(reportsByDate)
      .map((report) => ({
        ...report,
        totalPartners: report.partners.size,
        partners: undefined, // Remove Set object for clean data
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Apply date filter
    let filtered = reportsArray;

    if (filterPeriod !== "semua") {
      const today = new Date();
      let filterDate;

      switch (filterPeriod) {
        case "hari-ini":
          filterDate = today.toISOString().split("T")[0];
          filtered = reportsArray.filter(
            (report) => report.date === filterDate
          );
          break;
        case "kemarin":
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          filterDate = yesterday.toISOString().split("T")[0];
          filtered = reportsArray.filter(
            (report) => report.date === filterDate
          );
          break;
        case "7-hari":
          const sevenDaysAgo = new Date(today);
          sevenDaysAgo.setDate(today.getDate() - 7);
          sevenDaysAgo.setHours(0, 0, 0, 0);
          filtered = reportsArray.filter(
            (report) => new Date(report.date) >= sevenDaysAgo
          );
          break;
        case "30-hari":
          const thirtyDaysAgo = new Date(today);
          thirtyDaysAgo.setDate(today.getDate() - 30);
          thirtyDaysAgo.setHours(0, 0, 0, 0);
          filtered = reportsArray.filter(
            (report) => new Date(report.date) >= thirtyDaysAgo
          );
          break;
        case "custom":
          if (startDate && endDate) {
            filtered = reportsArray.filter((report) => {
              const reportDate = new Date(report.date);
              return (
                reportDate >= new Date(startDate) &&
                reportDate <= new Date(endDate)
              );
            });
          }
          break;
        default:
          break;
      }
    }

    setFilteredReports(filtered);
  }, [transactions, filterPeriod, startDate, endDate]);

  // Konfirmasi logout
  const confirmLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      handleLogout();
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Logic logout
  };

  // Format tanggal untuk tampilan
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Handle filter
  const handleFilter = () => {
    // Filter logic is handled automatically by useEffect
    // This function can be used for additional filter actions if needed
  };

  // Handle period change
  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setFilterPeriod(period);

    // Reset custom dates when not using custom filter
    if (period !== "custom") {
      setStartDate("");
      setEndDate("");
    }
  };

  // Calculate grand totals
  const grandTotals = filteredReports.reduce(
    (totals, report) => ({
      totalPartners: totals.totalPartners + report.totalPartners,
      totalProductsSold: totals.totalProductsSold + report.totalProductsSold,
      totalRevenue: totals.totalRevenue + report.totalRevenue,
      totalUmkmProfit: totals.totalUmkmProfit + report.totalUmkmProfit,
    }),
    {
      totalPartners: 0,
      totalProductsSold: 0,
      totalRevenue: 0,
      totalUmkmProfit: 0,
    }
  );

  if (loading) {
    return (
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <Header
            username={username}
            isLoggingOut={isLoggingOut}
            confirmLogout={confirmLogout}
          />
          <div
            style={{
              backgroundColor: "#F5E7B9",
              minHeight: "100vh",
              padding: "80px 30px 20px 30px",
            }}
          >
            <div className="text-center py-5">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Memuat data laporan...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-grow-1">
        {/* Header */}
        <Header
          username={username}
          isLoggingOut={isLoggingOut}
          confirmLogout={confirmLogout}
        />

        {/* Main Content */}
        <div
          style={{
            backgroundColor: "#F5E7B9",
            minHeight: "100vh",
            padding: "80px 30px 20px 30px",
            overflowX: "hidden",
          }}
        >
          <h3 className="fw-bold mb-4">Laporan</h3>

          {/* Filter Section */}
          <div className="bg-white p-4 rounded shadow-sm mb-4">
            <div className="row align-items-end">
              <div className="col-md-3">
                <label htmlFor="periodeCepat" className="form-label">
                  Periode Cepat
                </label>
                <select
                  className="form-select"
                  id="periodeCepat"
                  value={filterPeriod}
                  onChange={handlePeriodChange}
                >
                  <option value="semua">Pilih Periode</option>
                  <option value="hari-ini">Hari Ini</option>
                  <option value="kemarin">Kemarin</option>
                  <option value="7-hari">7 Hari Terakhir</option>
                  <option value="30-hari">30 Hari Terakhir</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {filterPeriod === "custom" && (
                <>
                  <div className="col-md-3">
                    <label htmlFor="dariTanggal" className="form-label">
                      Dari Tanggal
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dariTanggal"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="sampaiTanggal" className="form-label">
                      Sampai Tanggal
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="sampaiTanggal"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="col-md-3">
                <button
                  className="btn w-100"
                  style={{ backgroundColor: "#973131", color: "#fff" }}
                  onClick={handleFilter}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          {filteredReports.length > 0 && (
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card bg-primary text-white">
                  <div className="card-body text-center">
                    <h6>Total Mitra</h6>
                    <h4>{grandTotals.totalPartners}</h4>
                    <small>Mitra Aktif</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-danger text-white">
                  <div className="card-body text-center">
                    <h6>Total Produk Terjual</h6>
                    <h4>{grandTotals.totalProductsSold}</h4>
                    <small>Produk</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-secondary text-white">
                  <div className="card-body text-center">
                    <h6>Total Pendapatan</h6>
                    <h4>
                      Rp {grandTotals.totalRevenue.toLocaleString("id-ID")}
                    </h4>
                    <small>Pendapatan Kotor</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-success text-white">
                  <div className="card-body text-center">
                    <h6>Total Keuntungan UMKM</h6>
                    <h4>
                      Rp {grandTotals.totalUmkmProfit.toLocaleString("id-ID")}
                    </h4>
                    <small>Keuntungan Bersih</small>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Table */}
          <div className="bg-white rounded shadow-sm">
            <div className="p-3 border-bottom">
              <h5 className="fw-bold mb-0">Laporan Harian</h5>
              {filteredReports.length > 0 && (
                <small className="text-muted">
                  Menampilkan {filteredReports.length} hari transaksi
                </small>
              )}
            </div>

            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr className="text-center">
                    <th style={{ width: "20%" }}>Tanggal</th>
                    <th style={{ width: "15%" }}>Total Mitra</th>
                    <th style={{ width: "20%" }}>Total Produk Terjual</th>
                    <th style={{ width: "22.5%" }}>Total Pendapatan</th>
                    <th style={{ width: "22.5%" }}>Total Keuntungan UMKM</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report, index) => (
                      <tr key={index}>
                        <td className="fw-medium text-center">
                          {formatDate(report.date)}
                        </td>
                        <td className="text-center">
                          <span className="badge bg-primary rounded-pill">
                            {report.totalPartners}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-primary rounded-pill">
                            {report.totalProductsSold} pcs
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fw-medium text-secondary">
                            Rp {report.totalRevenue.toLocaleString("id-ID")}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fw-medium text-success">
                            Rp {report.totalUmkmProfit.toLocaleString("id-ID")}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-5">
                        <div className="text-muted">
                          <i className="bi bi-inbox display-1 d-block mb-3"></i>
                          <h6>Tidak ada data laporan</h6>
                          <p className="mb-0">
                            {transactions.length === 0
                              ? "Belum ada transaksi yang tercatat."
                              : "Tidak ada data untuk periode yang dipilih."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer with totals */}
            {filteredReports.length > 0 && (
              <div className="p-3 border-top bg-light">
                <div className="row text-center">
                  <div className="col-md-3">
                    <small className="text-muted d-block">Total Hari</small>
                    <strong>{filteredReports.length} hari</strong>
                  </div>
                  <div className="col-md-3">
                    <small className="text-muted d-block">
                      Rata-rata Mitra/Hari
                    </small>
                    <strong>
                      {(
                        grandTotals.totalPartners / filteredReports.length
                      ).toFixed(1)}
                    </strong>
                  </div>
                  <div className="col-md-3">
                    <small className="text-muted d-block">
                      Rata-rata Produk/Hari
                    </small>
                    <strong>
                      {Math.round(
                        grandTotals.totalProductsSold / filteredReports.length
                      )}{" "}
                      pcs
                    </strong>
                  </div>
                  <div className="col-md-3">
                    <small className="text-muted d-block">
                      Rata-rata Keuntungan/Hari
                    </small>
                    <strong>
                      Rp{" "}
                      {Math.round(
                        grandTotals.totalUmkmProfit / filteredReports.length
                      ).toLocaleString("id-ID")}
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laporan;
