'use client'
import { useState, useEffect } from 'react';
import { Pregunta } from '@/types/quiz';
import OpcionRespuesta from './OpcionRespuesta';
import Temporizador from './Temporizador';

interface TarjetaPreguntaProps {
  pregunta: Pregunta;
  numeroPregunta: number;
  totalPreguntas: number;
  onRespuesta: (esCorrecta: boolean, indiceRespuesta: number, tiempoAgotado?: boolean) => void;
  usarTemporizador?: boolean;
}

export default function TarjetaPregunta({
  pregunta,
  numeroPregunta,
  totalPreguntas,
  onRespuesta,
  usarTemporizador = false
}: TarjetaPreguntaProps) {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
  const [respuestaRevelada, setRespuestaRevelada] = useState(false);
  const [temporizadorActivo, setTemporizadorActivo] = useState(true);
  const [tiempoAgotado, setTiempoAgotado] = useState(false);

  const manejarSeleccion = (index: number) => {
    if (respuestaRevelada) return;
    setRespuestaSeleccionada(index);
  };

  const manejarTiempoAgotado = () => {
    if (respuestaRevelada) return;
    
    setTemporizadorActivo(false);
    setRespuestaRevelada(true);
    setTiempoAgotado(true);

    // Pasar automáticamente después de 2 segundos
    setTimeout(() => {
      onRespuesta(false, -1, true); 
    }, 2000);
  };

  const confirmarRespuesta = () => {
    if (respuestaSeleccionada === null) return;
    
    setTemporizadorActivo(false);
    setRespuestaRevelada(true);
  };

  const siguientePregunta = () => {
    if (respuestaSeleccionada === null) return;
    const esCorrecta = respuestaSeleccionada === pregunta.respuestaCorrecta;
    onRespuesta(esCorrecta, respuestaSeleccionada, false);
  };

  // Resetear estados cuando cambie la pregunta
  useEffect(() => {
    setRespuestaSeleccionada(null);
    setRespuestaRevelada(false);
    setTemporizadorActivo(true);
    setTiempoAgotado(false);
  }, [pregunta.id]);

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full mx-auto">
      {usarTemporizador && (
        <div className="mb-6">
          <Temporizador
            tiempoInicial={60}
            onTiempoAgotado={manejarTiempoAgotado}
            activo={temporizadorActivo && !respuestaRevelada}
          />
        </div>
      )}

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
      <div className="space-y-4 text-gray-800 mb-6">
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
          tiempoAgotado
            ? 'bg-orange-100 border-2 border-orange-500'
            : respuestaSeleccionada === pregunta.respuestaCorrecta 
              ? 'bg-green-100 border-2 border-green-500' 
              : 'bg-red-100 border-2 border-red-500'
        }`}>
          <p className={`font-bold text-lg ${
            tiempoAgotado
              ? 'text-orange-800'
              : respuestaSeleccionada === pregunta.respuestaCorrecta 
                ? 'text-green-800' 
                : 'text-red-800'
          }`}>
            {tiempoAgotado
              ? '⏰ ¡Tiempo agotado! -1 punto'
              : respuestaSeleccionada === pregunta.respuestaCorrecta 
                ? '¡Correcto! 🎉 +1 punto' 
                : 'Incorrecto 😞'}
          </p>
          {pregunta.explicacion && (
            <p className="text-gray-700 mt-2">{pregunta.explicacion}</p>
          )}
        </div>
      )}

      {/* Botones de acción */}
      {!respuestaRevelada ? (
        // Botón Confirmar - Solo cuando NO se ha revelado la respuesta
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
      ) : (
        // Botón Siguiente - Aparece después de confirmar (pero NO cuando el tiempo se agotó)
        !tiempoAgotado && (
          <button
            onClick={siguientePregunta}
            className="w-full py-4 rounded-lg font-bold text-lg bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
          >
            {numeroPregunta === totalPreguntas ? 'Ver Resultados 🏆' : 'Siguiente Pregunta →'}
          </button>
        )
      )}
    </div>
  );
}