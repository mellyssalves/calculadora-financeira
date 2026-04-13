type Props = {
  nome: string;
  email: string;
  setNome: (v: string) => void;
  setEmail: (v: string) => void;
  onEnviar: () => void;
};

export function LeadForm({ nome, email, setNome, setEmail, onEnviar }: Props) {
  return (
    <div className="bg-white border rounded-2xl p-4 space-y-3 shadow-sm mt-4">
      
      <p className="text-sm font-medium text-gray-700 text-center">
        Quer receber dicas personalizadas?
      </p>

      <input
        type="text"
        placeholder="Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500"
      />

      <input
        type="email"
        placeholder="Seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500"
      />

      <button
        onClick={onEnviar}
        className="w-full bg-green-600 text-white py-2 rounded-xl hover:opacity-90 transition"
      >
        Receber dicas
      </button>

    </div>
  );
}