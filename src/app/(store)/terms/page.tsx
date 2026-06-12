export const metadata = {
  title: "Termos — NEXO Digital Store",
  description: "Termos de uso da NEXO Digital Store.",
};

export default function TermsPage() {
  return (
    <div className="w-full px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-[#F1F5F9] mb-4">Termos de Uso</h1>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Ao usar a NEXO Digital Store e adquirir nossos produtos, você concorda com os termos descritos abaixo.
      </p>
      <ul className="space-y-3 text-sm text-[#94A3B8]">
        <li>• Os apps são licenciados conforme o plano contratado (assinatura, fixo ou sob consulta).</li>
        <li>• Não é permitido revender, redistribuir ou descompilar os produtos sem autorização.</li>
        <li>• O suporte técnico está disponível conforme o nível do plano adquirido.</li>
        <li>• Podemos atualizar estes termos a qualquer momento, com comunicação prévia.</li>
      </ul>
    </div>
  );
}
