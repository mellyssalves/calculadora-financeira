"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

type Props = {
  data: { name: string; value: number }[];
};

const COLORS = [
  "#FF0000",
  "#00AA00",
  "#0000FF",
  "#FFAA00",
  "#FF00FF",
  "#CD5C5C",
  "#FF5500",
  "#AA00FF",
  "#DAA520",
  "#5500FF",
  "#20B2AA",
  "#FF0055",
  "#9932CC",
];

export function PieChartFinance({ data }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const outerRadius = isMobile ? 60 : 95;
  const height = isMobile ? 600 : 550;
  const pieCy = isMobile ? "30%" : "35%";

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <ResponsiveContainer width="100%" height={height} minWidth={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy={pieCy}
            outerRadius={outerRadius}
            label={false}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip 
            formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`}
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px" }}
          />
          
          <Legend 
            layout="horizontal"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}