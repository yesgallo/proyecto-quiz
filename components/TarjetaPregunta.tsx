'use client';

import { useState } from 'react';
import { Pregunta } from '@/types/quiz';
import OpcionRespuesta from './OpcionRespuesta';

interface TarjetaPreguntaProps {
  pregunta: Pregunta;
  numeroPregunta: number;
  totalPreguntas: number;
  onRespuesta: (esCorrecta: boolean, indiceRespuesta: number) => void;
}

export default function TarjetaPregunta({
  pregunta,
  numeroPregunta,
  totalPreguntas,
  onRespuesta
}: TarjetaPreguntaProps) {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
  const [respuestaRevelada, setRespuestaRevelada] = useState(false);

  const manejarSeleccion = (index: number) => {
    if (respuestaRevelada) return;
    setRespuestaSeleccionada(index);
  };

  const confirmarRespuesta = () => {
    if (respuestaSeleccionada === null) return;
    
    setRespuestaRevelada(true);
    const esCorrecta = respuestaSeleccionada === pregunta.respuestaCorrecta;
    
    setTimeout(() => {
      onRespuesta(esCorrecta, respuestaSeleccionada);
      setRespuestaSeleccionada(null);
      setRespuestaRevelada(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full mx-auto">
      {/* Contador de preguntas */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-semibold text-gray-500">
          Pregunta {numeroPregunta} de {totalPreguntas}
        </span>
        <div className="bg-purple-100 px-4 py-1 rounded-full">
          <span className="text-purple-800 font-bold text-sm">
            {Math.round((numeroPregunta / totalPreguntas) * 100)}%
          </span>
        </div>
      </div>

      {/* Pregunta */}
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        {pregunta.pregunta}
      </h2>

      {/* Opciones */}
      <div className="space-y-4 mb-6">
        {pregunta.opciones.map((opcion, index) => (
          <OpcionRespuesta
            key={index}
            opcion={opcion}
            index={index}
            seleccionada={respuestaSeleccionada === index}
            esCorrecta={index === pregunta.respuestaCorrecta}
            respuestaRevelada={respuestaRevelada}
            onClick={() => manejarSeleccion(index)}
          />
        ))}
      </div>

      {/* Mensaje de retroalimentación */}
      {respuestaRevelada && (
        <div className={`p-4 rounded-lg mb-4 ${
          respuestaSeleccionada === pregunta.respuestaCorrecta 
            ? 'bg-green-100 border-2 border-green-500' 
            : 'bg-red-100 border-2 border-red-500'
        }`}>
          <p className={`font-bold text-lg ${
            respuestaSeleccionada === pregunta.respuestaCorrecta 
              ? 'text-green-800' 
              : 'text-red-800'
          }`}>
            {respuestaSeleccionada === pregunta.respuestaCorrecta 
              ? '¡Correcto! 🎉' 
              : 'Incorrecto 😞'}
          </p>
          {pregunta.explicacion && (
            <p className="text-gray-700 mt-2">{pregunta.explicacion}</p>
          )}
        </div>
      )}

      {/* Botón confirmar */}
      {!respuestaRevelada && (
        <button
          onClick={confirmarRespuesta}
          disabled={respuestaSeleccionada === null}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
            respuestaSeleccionada !== null
              ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Confirmar Respuesta
        </button>
      )}
    </div>
  );
}