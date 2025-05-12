import { DataSource } from 'typeorm';
import { TypeDocument } from '../../user/entities/type-document.entity';
import { v4 as uuidv4 } from 'uuid';

export const typeDocumentSeed = async (dataSource: DataSource) => {
  const typeDocumentRepository = dataSource.getRepository(TypeDocument);

  const typeDocuments = [
    {
      id: uuidv4(),
      nameTypeDocument: 'Cédula de Ciudadanía',
    },
    {
      id: uuidv4(),
      nameTypeDocument: 'Tarjeta de Identidad',
    },
    {
      id: uuidv4(),
      nameTypeDocument: 'Cédula de Extranjería',
    },
    {
      id: uuidv4(),
      nameTypeDocument: 'Pasaporte',
    },
    {
      id: uuidv4(),
      nameTypeDocument: 'Registro Civil',
    },
    {
      id: uuidv4(),
      nameTypeDocument: 'Carné Diplomático',
    },
  ];

  await typeDocumentRepository.save(typeDocuments);
};