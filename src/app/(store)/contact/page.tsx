export const metadata = {
  title: "Contato — NEXO Digital Store",
  description: "Entre em contato com a NEXO Digital S.L.",
};

export default function ContactPage() {
  return (
    <div className="w-full px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-[#F1F5F9] mb-4">Contato</h1>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Tem dúvidas ou quer saber mais sobre nossas soluções? Fale conosco pelo chat ou envie um e-mail.
      </p>
      <a
        href="mailto:hello@nexo-digital.app"
        className="inline-flex items-center justify-center h-12 px-6 rounded-2xl bg-[#3B82F6] text-white text-sm font-medium hover:bg-[#2563EB] transition-colors"
      >
        Enviar e-mail
      </a>
    </div>
  );
}
