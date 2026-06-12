"use client";

import { User, Settings, Bell, Shield, HelpCircle, LogOut } from "lucide-react";

const menuItems = [
  { icon: User, label: "Minha Conta", description: "Gerencie seus dados" },
  { icon: Bell, label: "Notificacoes", description: "Preferencias de alerta" },
  { icon: Shield, label: "Privacidade", description: "Seguranca e dados" },
  { icon: Settings, label: "Configuracoes", description: "Idioma, tema e mais" },
  { icon: HelpCircle, label: "Ajuda", description: "FAQ e suporte" },
  { icon: LogOut, label: "Sair", description: "Encerrar sessao" },
];

export default function ProfilePage() {
  return (
    <div className="w-full px-4 pt-4">
      {/* Profile header */}
      <div className="flex flex-col items-center py-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3B82F6]/30 to-[#10B981]/20 flex items-center justify-center">
          <User className="w-10 h-10 text-[#3B82F6]" />
        </div>
        <h1 className="text-lg font-bold text-[#F1F5F9] mt-3">Usuario</h1>
        <p className="text-sm text-[#94A3B8]">usuario@nexodigital.store</p>
      </div>

      {/* Menu items */}
      <div className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[#141419] transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#141419] flex items-center justify-center">
              <item.icon className="w-5 h-5 text-[#94A3B8]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#F1F5F9]">{item.label}</p>
              <p className="text-xs text-[#94A3B8]">{item.description}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-[#475569] mt-8 pb-4">
        NEXO Digital Store v1.0.0
      </p>
    </div>
  );
}
