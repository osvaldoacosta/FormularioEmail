"use client";

import Form from "./components/form";
import React, { useState } from "react";
import EmailList from "./components/emailList";
export default function HomePage() {
  const [showEmailList, setShowEmailList] = useState(false);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#6d0f0c] to-[#F44336] text-white">
      <div className="absolute left-0 top-0 h-16 w-full bg-black"></div>

      <div className="absolute left-0 top-0 m-4">
        <img
          src="/LOGO-RETANGULAR-FUNDO-PRETO-1024x295.png"
          alt="Logo"
          className="h-15 w-32"
        />
      </div>

      {/* Toggle button */}
      <button
        className="absolute right-4 top-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => setShowEmailList(!showEmailList)}
      >
        {showEmailList ? "Esconder lista de emails" : "Mostrar Lista de emails"}
      </button>

      {/* EmailList component */}
      <div className="mt-5">{showEmailList ? <EmailList /> : <Form />}</div>
    </main>
  );
}
