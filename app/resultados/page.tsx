'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResultadosFinales from '@/components/ResultadosFinales';
import preguntasData from '@/data/preguntas.json';
import { RespuestaUsuario } from '@/types/quiz';

export default function ResultadosPage() {
  const router = useRouter();
  const [puntuacion, setPuntuacion] = useState(0);
  const [respuestas, setRespuestas] = useState<RespuestaUsuario[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Obtener datos del localStorage
    const puntuacionGuardada = localStorage.getItem('puntuacion');
    const respuestasGuardadas = localStorage.getItem('respuestas');

    if (puntuacionGuardada && respuestasGuardadas) {
      setPuntuacion(Number(puntuacionGuardada));
      setRespuestas(JSON.parse(respuestasGuardadas));
      setCargando(false);
    } else {
      // Si no hay datos, redirigir al inicio
      router.push('/');
    }
  }, [router]);

  const reiniciarQuiz = () => {
    localStorage.removeItem('puntuacion');
    localStorage.removeItem('respuestas');
    router.push('/');
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Cargando resultados...</div>
      </div>
    );
  }

  return (
    <ResultadosFinales
      puntuacion={puntuacion}
      totalPreguntas={preguntasData.preguntas.length}
      respuestas={respuestas}
      preguntas={preguntasData.preguntas}
      onReiniciar={reiniciarQuiz}
    />
  );
}