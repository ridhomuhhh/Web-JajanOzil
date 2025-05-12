import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 300 },
  { name: 'Feb', value: 400 },
  { name: 'Mar', value: 400 },
  { name: 'Apr', value: 500 },
  { name: 'May', value: 600 },
  { name: 'Jun', value: 650 },
];

const CustomBarChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#a65f2f" radius={[8, 8, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export default CustomBarChart;
