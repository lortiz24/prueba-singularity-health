import { DataSource } from 'typeorm';
import { Country } from '../../user/entities/country.entity';
import { v4 as uuidv4 } from 'uuid';

export const countrySeed = async (dataSource: DataSource) => {
  const countryRepository = dataSource.getRepository(Country);

  const countryData = [
    {
      id: uuidv4(),
      name: 'Colombia',
      code: 'COL',
    },
    {
      id: uuidv4(),
      name: 'Estados Unidos',
      code: 'USA',
    },
    {
      id: uuidv4(),
      name: 'México',
      code: 'MEX',
    },
    {
      id: uuidv4(),
      name: 'España',
      code: 'ESP',
    },
    {
      id: uuidv4(),
      name: 'Argentina',
      code: 'ARG',
    },
  ];

  const countries = countryData.map((country) =>
    countryRepository.create({
      code: country.code,
      name: country.name,
    }),
  );
  await countryRepository.save(countries);
};
