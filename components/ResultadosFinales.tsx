'use client';

import { Pregunta, RespuestaUsuario } from '@/types/quiz';

interface ResultadosFinalesProps {
  puntuacion: number;
  totalPreguntas: number;
  respuestas: RespuestaUsuario[];
  preguntas: Pregunta[];
  onReiniciar: () => void;
}

export default function ResultadosFinales({
  puntuacion,
  totalPreguntas,
  respuestas,
  preguntas,
  onReiniciar
}: ResultadosFinalesProps) {
  const porcentaje = Math.round((puntuacion / totalPreguntas) * 100);

  // Calcular estadísticas
  const respuestasCorrectas = respuestas.filter(r => r.esCorrecta).length;
  const tiempoAgotado = respuestas.filter(r => r.respuestaSeleccionada === -1).length;
  const respuestasIncorrectas = totalPreguntas - respuestasCorrectas - tiempoAgotado;

  const obtenerMensaje = () => {
    if (porcentaje >= 90) return { texto: '¡Excelente! 🌟', color: 'text-green-600' };
    if (porcentaje >= 70) return { texto: '¡Muy bien! 👏', color: 'text-blue-600' };
    if (porcentaje >= 50) return { texto: '¡Buen intento! 💪', color: 'text-yellow-600' };
    return { texto: 'Seguí practicando 📚', color: 'text-purple-600' };
  };

  const mensaje = obtenerMensaje();

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-500 via-pink-500 to-red-500 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Tarjeta de Resultados Principales */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ¡Quiz Completado!
          </h1>
          
          <div className="my-8">
            <div className="text-7xl font-bold text-purple-600 mb-2">
              {puntuacion}/{totalPreguntas}
            </div>
            <div className="text-3xl font-semibold text-gray-600">
              {porcentaje}%
            </div>
          </div>

          <p className={`text-3xl font-bold ${mensaje.color} mb-8`}>
            {mensaje.texto}
          </p>

          {/* Estadísticas Detalladas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-100 rounded-lg p-4 border-2 border-green-500">
              <div className="text-3xl font-bold text-green-700">{respuestasCorrectas}</div>
              <div className="text-sm text-green-800 font-semibold">✅ Correctas</div>
            </div>
            <div className="bg-red-100 rounded-lg p-4 border-2 border-red-500">
              <div className="text-3xl font-bold text-red-700">{respuestasIncorrectas}</div>
              <div className="text-sm text-red-800 font-semibold">❌ Incorrectas</div>
            </div>
            <div className="bg-orange-100 rounded-lg p-4 border-2 border-orange-500">
              <div className="text-3xl font-bold text-orange-700">{tiempoAgotado}</div>
              <div className="text-sm text-orange-800 font-semibold">⏰ Tiempo Agotado</div>
            </div>
          </div>

          <button
            onClick={onReiniciar}
            className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl py-4 px-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Reiniciar Quiz 🔄
          </button>
        </div>

        {/* Resumen de Respuestas */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            📊 Resumen de Respuestas
          </h2>
          
          <div className="space-y-4">
            {preguntas.map((pregunta, index) => {
              const respuestaUsuario = respuestas.find(r => r.preguntaId === pregunta.id);
              const esCorrecta = respuestaUsuario?.esCorrecta || false;
              const tiempoAgotado = respuestaUsuario?.respuestaSeleccionada === -1;
              
              // Determinar estilos según el tipo de respuesta
              const estilosTarjeta = tiempoAgotado
                ? 'bg-orange-50 border-orange-500'
                : esCorrecta
                  ? 'bg-green-50 border-green-500'
                  : 'bg-red-50 border-red-500';
              
              const emoji = tiempoAgotado ? '⏰' : esCorrecta ? '✅' : '❌';
              
              return (
                <div
                  key={pregunta.id}
                  className={`p-6 rounded-lg border-2 ${estilosTarjeta}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-800 flex-1">
                      {index + 1}. {pregunta.pregunta}
                    </h3>
                    <span className="text-2xl ml-4">
                      {emoji}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {tiempoAgotado ? (
                      <>
                        <p className="text-orange-700 font-semibold">
                          <strong>⏰ Tiempo agotado</strong> - No respondiste a tiempo (-1 punto)
                        </p>
                        <p className="text-gray-700">
                          <strong>Respuesta correcta:</strong>{' '}
                          <span className="text-green-700">
                            {pregunta.opciones[pregunta.respuestaCorrecta]}
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-700">
                          <strong>Tu respuesta:</strong>{' '}
                          <span className={esCorrecta ? 'text-green-700' : 'text-red-700'}>
                            {pregunta.opciones[respuestaUsuario?.respuestaSeleccionada || 0]}
                          </span>
                        </p>
                        
                        {!esCorrecta && (
                          <p className="text-gray-700">
                            <strong>Respuesta correcta:</strong>{' '}
                            <span className="text-green-700">
                              {pregunta.opciones[pregunta.respuestaCorrecta]}
                            </span>
                          </p>
                        )}
                      </>
                    )}
                    
                    {pregunta.explicacion && (
                      <p className="text-gray-600 italic mt-2">
                        💡 {pregunta.explicacion}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}