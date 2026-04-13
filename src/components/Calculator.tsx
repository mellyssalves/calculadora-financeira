type GastosType = {
  energia: string;
  agua: string;
  internet: string;
  celular: string;
  supermercado: string;
  restaurante: string;
  combustivel: string;
  compras: string;
  aluguel: string;
  saude: string;
  emprestimo: string;
  reserva: string;
  investimentos: string;
};

type Props = {
  salario: string;
  gastos: GastosType;
  setSalario: (v: string) => void;
  setGastos: React.Dispatch<React.SetStateAction<GastosType>>;
  onCalcular: () => void;
};

export function Calculator({
  salario,
  gastos,
  setSalario,
  setGastos,
  onCalcular,
}: Props) {

  function atualizarGasto(campo: keyof GastosType, valor: string) {
    setGastos((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  const grupo = (
    titulo: string,
    campos: { label: string; key: keyof GastosType }[]
  ) => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">{titulo}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {campos.map((item) => (
          <input
            key={item.key}
            type="number"
            placeholder={item.label}
            value={gastos[item.key]}
            onChange={(e) => atualizarGasto(item.key, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">

      <input
        type="number"
        placeholder="Seu salário mensal"
        value={salario}
        onChange={(e) => setSalario(e.target.value)}
        className="w-full text-black border border-gray-300 rounded-lg px-4 py-2"
      />

      {grupo("Despesas Fixas", [
        { label: "Energia", key: "energia" },
        { label: "Água", key: "agua" },
        { label: "Internet", key: "internet" },
        { label: "Celular", key: "celular" },
      ])}

      {grupo("Despesas Variáveis", [
        { label: "Supermercado", key: "supermercado" },
        { label: "Restaurante", key: "restaurante" },
        { label: "Combustível", key: "combustivel" },
        { label: "Compras", key: "compras" },
        { label: "Aluguel", key: "aluguel" },
        { label: "Saúde", key: "saude" },
      ])}

      {grupo("Dívidas", [
        { label: "Empréstimo", key: "emprestimo" },
      ])}

      {grupo("Economias", [
        { label: "Reserva", key: "reserva" },
        { label: "Investimentos", key: "investimentos" },
      ])}

      <button
        onClick={onCalcular}
        className="w-full bg-black text-white py-3 rounded-xl"
      >
        Calcular economia
      </button>

    </div>
  );
}