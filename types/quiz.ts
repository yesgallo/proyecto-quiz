export interface Pregunta {
  id: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  explicacion?: string;
}

export interface RespuestaUsuario {
  preguntaId: number;
  respuestaSeleccionada: number;
  esCorrecta: boolean;
}

export interface EstadoQuiz {
  preguntas: Pregunta[];
  preguntaActual: number;
  puntuacion: number;
  respuestas: RespuestaUsuario[];
  quizFinalizado: boolean;
}