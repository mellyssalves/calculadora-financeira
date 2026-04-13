"use client";

import { useState } from "react";
import { Hero } from "@/src/components/Hero";
import { Calculator } from "@/src/components/Calculator";
import { ResultCard } from "@/src/components/ResultCard";
import { ExportFinance } from "@/src/components/ExportFinance";
import { PieChartFinance } from "@/src/components/PieChartFinance";

export default function Home() {
  const [salario, setSalario] = useState("");

  const [gastos, setGastos] = useState({
    energia: "",
    agua: "",
    internet: "",
    celular: "",
    supermercado: "",
    restaurante: "",
    combustivel: "",
    compras: "",
    aluguel: "",
    saude: "",
    emprestimo: "",
    reserva: "",
    investimentos: "",
  });

  const [resultado, setResultado] = useState<number | null>(null);

  const dataChart = Object.entries(gastos).map(([name, value]) => ({
    name,
    value: Number(value || 0),
  }));

  function calcularEconomia() {
    const totalGastos = Object.values(gastos).reduce(
      (acc, val) => acc + Number(val || 0),
      0
    );

    const saldo = Number(salario) - totalGastos;
    setResultado(saldo);
  }



  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-4 md:px-6 py-10 space-y-10">

      <Hero />

      <section className="w-full max-w-6xl bg-white p-4 md:p-6 rounded-2xl shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <Calculator
              salario={salario}
              gastos={gastos}
              setSalario={setSalario}
              setGastos={setGastos}
              onCalcular={calcularEconomia}
            />
          </div>

          <div className="space-y-6">
            {resultado !== null && (
              <>
                <ResultCard resultado={resultado} />

                <div className="flex justify-center w-full overflow-x-auto">
                  <PieChartFinance data={dataChart} />
                </div>

                <ExportFinance
                  salario={salario}
                  gastos={gastos}
                  resultado={resultado}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}