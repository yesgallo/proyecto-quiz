'use client';

interface OpcionRespuestaProps {
  opcion: string;
  index: number;
  seleccionada: boolean;
  esCorrecta: boolean;
  respuestaRevelada: boolean;
  onClick: () => void;
}

export default function OpcionRespuesta({
  opcion,
  index,
  seleccionada,
  esCorrecta,
  respuestaRevelada,
  onClick
}: OpcionRespuestaProps) {
  
  const obtenerEstilos = () => {
    if (!respuestaRevelada) {
      return seleccionada 
        ? 'bg-purple-500 text-white border-purple-600' 
        : 'bg-white hover:bg-purple-50 border-gray-300';
    }
    
    if (esCorrecta) {
      return 'bg-green-500 text-white border-green-600';
    }
    
    if (seleccionada && !esCorrecta) {
      return 'bg-red-500 text-white border-red-600';
    }
    
    return 'bg-gray-100 border-gray-300 opacity-50';
  };

  return (
    <button
      onClick={onClick}
      disabled={respuestaRevelada}
      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 font-medium ${obtenerEstilos()} ${
        !respuestaRevelada ? 'hover:shadow-md cursor-pointer' : 'cursor-not-allowed'
      }`}
    >
      <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
      {opcion}
    </button>
  );
}