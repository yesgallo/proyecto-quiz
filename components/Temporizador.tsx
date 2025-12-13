'use client';

import { useEffect, useState } from 'react';

interface TemporizadorProps {
  tiempoInicial: number; // en segundos
  onTiempoAgotado: () => void;
  activo: boolean;
}

export default function Temporizador({ 
  tiempoInicial, 
  onTiempoAgotado, 
  activo 
}: TemporizadorProps) {
  const [tiempoRestante, setTiempoRestante] = useState(tiempoInicial);

  useEffect(() => {
    if (!activo) return;

    if (tiempoRestante === 0) {
      onTiempoAgotado();
      return;
    }

    const intervalo = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante, activo, onTiempoAgotado]);

  // Resetear cuando cambie tiempoInicial
  useEffect(() => {
    setTiempoRestante(tiempoInicial);
  }, [tiempoInicial]);

  const porcentaje = (tiempoRestante / tiempoInicial) * 100;
  const esUrgente = tiempoRestante <= 10;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-600">
          Tiempo restante
        </span>
        <span className={`text-2xl font-bold ${
          esUrgente ? 'text-red-600 animate-pulse' : 'text-purple-600'
        }`}>
          {tiempoRestante}s
        </span>
      </div>
      
      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${
            esUrgente ? 'bg-red-500' : 'bg-purple-500'
          }`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>

      {esUrgente && (
        <p className="text-red-600 text-sm font-semibold mt-2 animate-pulse">
          ⚠️ ¡El tiempo se está agotando!
        </p>
      )}
    </div>
  );
}