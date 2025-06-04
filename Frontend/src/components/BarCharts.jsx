import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

const BarCharts = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Menyimpan instance chart

  useEffect(() => {
    // Hancurkan instance chart sebelumnya jika ada untuk menghindari duplikasi
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Jumlah', // Label untuk legend (jika ditampilkan)
          data: [300, 400, 390, 500, 600, 650], // Data contoh
          backgroundColor: [ // Menggunakan warna aksen yang lebih menarik
            'rgba(75, 192, 192, 0.8)', // Teal
            'rgba(54, 162, 235, 0.8)', // Biru
            'rgba(255, 206, 86, 0.8)', // Kuning
            'rgba(153, 102, 255, 0.8)', // Ungu
            'rgba(255, 159, 64, 0.8)', // Oranye
            'rgba(255, 99, 132, 0.8)'  // Merah muda
          ],
          borderColor: [ // Border yang lebih tipis
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
          borderRadius: 4, // Sudut membulat pada batang grafik
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Penting untuk kontrol ukuran
        plugins: {
          legend: {
            display: false, // Sembunyikan legend jika hanya ada 1 dataset
          },
          tooltip: { // Styling tooltip
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            displayColors: false,
            padding: 10,
          }
        },
        scales: {
          x: {
            grid: {
              display: false // Sembunyikan grid vertikal
            },
            ticks: {
              color: '#6c757d' // Warna label bulan
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)' // Warna grid horizontal lebih terang
            },
            ticks: {
              color: '#6c757d' // Warna label nilai Y
            }
          }
        }
      }
    });

    // Cleanup function untuk menghancurkan chart saat komponen di-unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Dependency array kosong agar useEffect hanya berjalan sekali saat mount

  return (
    <div style={{ position: 'relative', height: '300px' }}> {/* Kontainer untuk grafik */}
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarCharts;