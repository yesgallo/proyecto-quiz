'use client';

import { useRouter } from 'next/navigation';
import PantallaInicio from '@/components/PantallaInicio';
import preguntasData from '@/data/preguntas.json';

export default function Home() {
  const router = useRouter();

  const comenzarQuiz = () => {
    router.push('/quiz');
  };

  return (
    <PantallaInicio 
      onComenzar={comenzarQuiz} 
      totalPreguntas={preguntasData.preguntas.length} 
    />
  );
}
