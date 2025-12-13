'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TarjetaPregunta from '@/components/TarjetaPregunta';
import preguntasData from '@/data/preguntas.json';
import { RespuestaUsuario } from '@/types/quiz';

export default function QuizPage() {
  const router = useRouter();
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [respuestas, setRespuestas] = useState<RespuestaUsuario[]>([]);

  const preguntas = preguntasData.preguntas;

  const manejarRespuesta = (esCorrecta: boolean, indiceRespuesta: number) => {
    // Guardar la respuesta
    const nuevaRespuesta: RespuestaUsuario = {
      preguntaId: preguntas[preguntaActual].id,
      respuestaSeleccionada: indiceRespuesta,
      esCorrecta
    };

    setRespuestas([...respuestas, nuevaRespuesta]);

    // Actualizar puntuación
    if (esCorrecta) {
      setPuntuacion(puntuacion + 1);
    }

    // Avanzar a la siguiente pregunta o ir a resultados
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      // Guardar datos en localStorage y redirigir
      localStorage.setItem('puntuacion', String(puntuacion + (esCorrecta ? 1 : 0)));
      localStorage.setItem('respuestas', JSON.stringify([...respuestas, nuevaRespuesta]));
      router.push('/resultados');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4">
      {/* Barra de puntuación */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center">
          <div>
            <span className="text-gray-600 font-semibold">Puntuación:</span>
            <span className="text-2xl font-bold text-purple-600 ml-2">{puntuacion}</span>
          </div>
          <div className="text-gray-600 font-semibold">
            Pregunta {preguntaActual + 1} de {preguntas.length}
          </div>
        </div>
      </div>

      {/* Tarjeta de pregunta */}
      <TarjetaPregunta
        pregunta={preguntas[preguntaActual]}
        numeroPregunta={preguntaActual + 1}
        totalPreguntas={preguntas.length}
        onRespuesta={manejarRespuesta}
        usarTemporizador={true} 
      />
    </div>
  );
}