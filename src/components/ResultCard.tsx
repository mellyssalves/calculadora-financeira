type Props = {
  resultado: number;
};

export function ResultCard({ resultado }: Props) {
  return (
    <div id="resultado" className="bg-green-50 border border-green-200 rounded-xl p-3 text-center space-y-1">
      
      <p className="text-xs text-gray-600">
        Seu saldo mensal:
      </p>

      <p className="text-lg font-bold text-green-600">
        {resultado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>

      {resultado > 0 ? (
        <p className="text-sm text-green-700">
          Ótimo! Você está economizando
        </p>
      ) : (
        <p className="text-sm text-red-600">
          Atenção! Seus gastos estão maiores que sua renda
        </p>
      )}
    </div>
  );
}