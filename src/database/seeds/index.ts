import { DataSource } from 'typeorm';
import { typeDocumentSeed } from './type-document.seed';
import { countrySeed } from './country.seed';

export const runSeeds = async (dataSource: DataSource) => {
  try {
    console.log('Iniciando la siembra de datos...');
    
    await typeDocumentSeed(dataSource);
    console.log('✅ Datos de tipos de documento sembrados exitosamente');
    
    await countrySeed(dataSource);
    console.log('✅ Datos de países sembrados exitosamente');
    
    console.log('¡Siembra de datos completada!');
  } catch (error) {
    console.error('Error durante la siembra de datos:', error);
    throw error;
  }
};