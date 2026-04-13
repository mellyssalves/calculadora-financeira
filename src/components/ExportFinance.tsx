"use client";

import * as XLSX from "xlsx";

type Props = {
  salario: string;
  gastos: Record<string, string>;
  resultado: number;
};

export function ExportFinance({ salario, gastos, resultado }: Props) {
  const totalGastos = Object.values(gastos).reduce(
    (acc, val) => acc + Number(val || 0),
    0
  );

  const exportarExcel = () => {
    const salarioNum = Number(salario || 0);

    const resumo = [
      ["Orçamento Mensal"],
      [],
      ["Descrição", "Valor"],
      ["Salário", salarioNum],
      ["Total de Gastos", totalGastos],
      ["Saldo", resultado],
      [],
      ["Percentual de Gastos", `${((totalGastos / salarioNum) * 100).toFixed(2)}%`],
    ];

    const detalhes = [
      ["Detalhamento de Gastos"],
      [],
      ["Categoria", "Valor", "Percentual"],
      ...Object.entries(gastos).map(([categoria, valor]) => {
        const valorNum = Number(valor || 0);
        const percentual = `${((valorNum / salarioNum) * 100).toFixed(2)}%`;
        return [
          categoria.charAt(0).toUpperCase() + categoria.slice(1),
          valorNum,
          percentual,
        ];
      }),
      [],
      ["TOTAL", totalGastos, `${((totalGastos / salarioNum) * 100).toFixed(2)}%`],
    ];

    const wb = XLSX.utils.book_new();

    const wsResumo = XLSX.utils.aoa_to_sheet(resumo);
    const wsDetalhes = XLSX.utils.aoa_to_sheet(detalhes);

    wsResumo["!cols"] = [{ wch: 20 }, { wch: 15 }];
    wsDetalhes["!cols"] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }];

    XLSX.utils.book_append_sheet(wb, wsResumo, "Resumo");
    XLSX.utils.book_append_sheet(wb, wsDetalhes, "Detalhes");

    XLSX.writeFile(
      wb,
      `orcamento_mensal_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md border border-blue-200">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Exportar Dados
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Baixe seus dados financeiros em formato Excel para análise detalhada
        </p>
        <button
          onClick={exportarExcel}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          Baixar em Excel
        </button>
      </div>
    </div>
  );
}
