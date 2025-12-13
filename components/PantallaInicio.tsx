'use client';

interface PantallaInicioProps {
  onComenzar: () => void;
  totalPreguntas: number;
}

export default function PantallaInicio({ onComenzar, totalPreguntas }: PantallaInicioProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🧠 Quiz de Next.js
          </h1>
          <p className="text-xl text-gray-600">
            Pon a prueba tus conocimientos sobre desarrollo web
          </p>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Información del Quiz
          </h2>
          <ul className="text-left space-y-3 text-gray-700">
            <li className="flex items-center">
              <span className="text-2xl mr-3">📝</span>
              <span><strong>{totalPreguntas}</strong> preguntas sobre Next.js y React</span>
            </li>
            <li className="flex items-center">
              <span className="text-2xl mr-3">⏱️</span>
              <span>Sin límite de tiempo</span>
            </li>
            <li className="flex items-center">
              <span className="text-2xl mr-3">✅</span>
              <span>Retroalimentación inmediata</span>
            </li>
            <li className="flex items-center">
              <span className="text-2xl mr-3">🏆</span>
              <span>Obtén tu puntuación final</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onComenzar}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl py-4 px-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Comenzar Quiz 🚀
        </button>
      </div>
    </div>
  );
}