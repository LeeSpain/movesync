
import React from "react";
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface ChartProps {
  data: any;
  width?: number | string;
  height?: number | string;
}

export const BarChart: React.FC<ChartProps> = ({
  data,
  width = "100%",
  height = 300,
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.datasets && data.datasets.map((dataset: any, index: number) => (
          <Bar
            key={`dataset-${index}`}
            dataKey="data"
            data={dataset.data.map((value: number, i: number) => ({
              name: data.labels[i],
              data: value,
            }))}
            fill={dataset.backgroundColor}
            name={dataset.label}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export const LineChart: React.FC<ChartProps> = ({
  data,
  width = "100%",
  height = 300,
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsLineChart data={data.labels.map((label: string, index: number) => {
        const point: any = { name: label };
        data.datasets.forEach((dataset: any) => {
          point[dataset.label] = dataset.data[index];
        });
        return point;
      })}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.datasets && data.datasets.map((dataset: any, index: number) => (
          <Line
            key={`line-${index}`}
            type="monotone"
            dataKey={dataset.label}
            stroke={dataset.borderColor}
            fill={dataset.backgroundColor}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export const PieChart: React.FC<ChartProps> = ({
  data,
  width = "100%",
  height = 300,
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsPieChart>
        <Tooltip />
        <Legend />
        <Pie
          data={data.labels.map((label: string, index: number) => ({
            name: label,
            value: data.datasets[0].data[index],
          }))}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label
        >
          {data.labels.map((_: any, index: number) => (
            <Cell 
              key={`cell-${index}`} 
              fill={data.datasets[0].backgroundColor[index % data.datasets[0].backgroundColor.length]} 
            />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
