export const metadata = {
  title: "Privacidade — NEXO Digital Store",
  description: "Política de privacidade da NEXO Digital Store.",
};

export default function PrivacyPage() {
  return (
    <div className="w-full px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-[#F1F5F9] mb-4">Privacidade</h1>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        A NEXO Digital S.L. valoriza a privacidade dos seus dados. Esta política explica como coletamos, usamos e protegemos suas informações.
      </p>
      <ul className="space-y-3 text-sm text-[#94A3B8]">
        <li>• Coletamos apenas os dados necessários para funcionamento dos serviços.</li>
        <li>• Não vendemos dados pessoais a terceiros.</li>
        <li>• Utilizamos medidas de segurança para proteger suas informações.</li>
        <li>• Você pode solicitar a exclusão dos seus dados a qualquer momento.</li>
      </ul>
    </div>
  );
}
