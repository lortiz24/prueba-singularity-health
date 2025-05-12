import { QueryFailedError } from 'typeorm';

interface DatabaseErrorResponse {
  message: string;
}

export const handleDatabaseError = (error: unknown): DatabaseErrorResponse => {
  if (error instanceof QueryFailedError) {
    const pgError = error as any;

    switch (pgError.code) {
      case '23505':
        return {
          message: 'Ya existe un registro con estos datos'
        };

      case '23503':
        return {
          message: 'No se encontró el registro relacionado'
        };

      case '23502':
        return {
          message: 'Faltan campos requeridos'
        };

      default:
        return {
          message: 'Error en la base de datos'
        };
    }
  }

  return {
    message: 'Error inesperado en la base de datos'
  };
};
