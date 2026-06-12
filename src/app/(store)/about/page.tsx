export const metadata = {
  title: "Sobre — NEXO Digital Store",
  description: "Conheça a NEXO Digital S.L. e o ecossistema de apps para negócios.",
};

export default function AboutPage() {
  return (
    <div className="w-full px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-[#F1F5F9] mb-4">Sobre a NEXO</h1>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        A NEXO Digital S.L. é uma software house focada em criar soluções digitais prontas para uso: TPVs, SaaS, sites, jogos e software sob medida.
      </p>
      <p className="text-sm text-[#94A3B8] leading-relaxed">
        Nossa missão é potencializar negócios com tecnologia moderna, acessível e escalável.
      </p>
    </div>
  );
}
