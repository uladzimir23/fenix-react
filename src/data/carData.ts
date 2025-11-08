// Типы для автомобильных данных
export interface CarBrand {
  id: number;
  name: string;
  logo: string;
}

export interface Generation {
  years: string;
  body: string;
  engines: string[];
}

export interface CarModel {
  id: number;
  name: string;
  generations: Generation[];
}

export interface CarDatabase {
  brand: string;
  models: CarModel[];
}

// База данных марок автомобилей
export const carBrands: CarBrand[] = [
  { id: 1, name: 'Audi', logo: 'https://www.carlogos.org/car-logos/audi-logo.png' },
  { id: 2, name: 'BMW', logo: 'https://www.carlogos.org/car-logos/bmw-logo.png' },
  { id: 3, name: 'Mercedes-Benz', logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png' },
  { id: 4, name: 'Volkswagen', logo: 'https://www.carlogos.org/car-logos/volkswagen-logo.png' },
  { id: 5, name: 'Toyota', logo: 'https://www.carlogos.org/car-logos/toyota-logo.png' },
  { id: 6, name: 'Honda', logo: 'https://www.carlogos.org/car-logos/honda-logo.png' },
  { id: 7, name: 'Ford', logo: 'https://www.carlogos.org/car-logos/ford-logo.png' },
  { id: 8, name: 'Chevrolet', logo: 'https://www.carlogos.org/car-logos/chevrolet-logo.png' },
  { id: 9, name: 'Nissan', logo: 'https://www.carlogos.org/car-logos/nissan-logo.png' },
  { id: 10, name: 'Hyundai', logo: 'https://www.carlogos.org/car-logos/hyundai-logo.png' },
  { id: 11, name: 'Kia', logo: 'https://www.carlogos.org/car-logos/kia-logo.png' },
  { id: 12, name: 'Volvo', logo: 'https://www.carlogos.org/car-logos/volvo-logo.png' },
  { id: 13, name: 'Mazda', logo: 'https://www.carlogos.org/car-logos/mazda-logo.png' },
  { id: 14, name: 'Subaru', logo: 'https://www.carlogos.org/car-logos/subaru-logo.png' },
  { id: 15, name: 'Lexus', logo: 'https://www.carlogos.org/car-logos/lexus-logo.png' },
  { id: 16, name: 'Jeep', logo: 'https://www.carlogos.org/car-logos/jeep-logo.png' },
  { id: 17, name: 'Porsche', logo: 'https://www.carlogos.org/car-logos/porsche-logo.png' },
  { id: 18, name: 'Ferrari', logo: 'https://www.carlogos.org/car-logos/ferrari-logo.png' },
  { id: 19, name: 'Lamborghini', logo: 'https://www.carlogos.org/car-logos/lamborghini-logo.png' },
  { id: 20, name: 'Tesla', logo: 'https://www.carlogos.org/car-logos/tesla-logo.png' }
];

// Детальная база данных по BMW
export const bmwDatabase: CarDatabase = {
  brand: 'BMW',
  models: [
    {
      id: 1,
      name: '3 Series',
      generations: [
        {
          years: '2019-2023',
          body: 'G20',
          engines: [
            '320i (2.0L Turbo, 184 hp)',
            '330i (2.0L Turbo, 255 hp)',
            'M340i (3.0L Turbo, 382 hp)'
          ]
        },
        {
          years: '2012-2019',
          body: 'F30',
          engines: [
            '316i (1.6L Turbo, 136 hp)',
            '320i (2.0L Turbo, 184 hp)',
            '328i (2.0L Turbo, 245 hp)',
            '335i (3.0L Turbo, 306 hp)'
          ]
        }
      ]
    },
    {
      id: 2,
      name: '5 Series',
      generations: [
        {
          years: '2017-2023',
          body: 'G30',
          engines: [
            '520i (2.0L Turbo, 184 hp)',
            '530i (2.0L Turbo, 252 hp)',
            '540i (3.0L Turbo, 340 hp)',
            'M550i (4.4L V8 Turbo, 530 hp)'
          ]
        },
        {
          years: '2010-2017',
          body: 'F10',
          engines: [
            '520i (2.0L Turbo, 184 hp)',
            '528i (2.0L Turbo, 245 hp)',
            '535i (3.0L Turbo, 306 hp)',
            '550i (4.4L V8 Turbo, 450 hp)'
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'X5',
      generations: [
        {
          years: '2019-2023',
          body: 'G05',
          engines: [
            'xDrive40i (3.0L Turbo, 340 hp)',
            'xDrive50i (4.4L V8 Turbo, 462 hp)',
            'M50i (4.4L V8 Turbo, 523 hp)'
          ]
        },
        {
          years: '2014-2018',
          body: 'F15',
          engines: [
            'xDrive35i (3.0L Turbo, 306 hp)',
            'xDrive50i (4.4L V8 Turbo, 450 hp)',
            'M50d (3.0L Diesel, 400 hp)'
          ]
        }
      ]
    },
    {
      id: 4,
      name: '7 Series',
      generations: [
        {
          years: '2016-2022',
          body: 'G11/G12',
          engines: [
            '730i (2.0L Turbo, 258 hp)',
            '740i (3.0L Turbo, 326 hp)',
            '750i (4.4L V8 Turbo, 450 hp)',
            'M760i (6.6L V12, 610 hp)'
          ]
        }
      ]
    },
    {
      id: 5,
      name: 'X3',
      generations: [
        {
          years: '2018-2023',
          body: 'G01',
          engines: [
            'xDrive20i (2.0L Turbo, 184 hp)',
            'xDrive30i (2.0L Turbo, 252 hp)',
            'M40i (3.0L Turbo, 360 hp)'
          ]
        }
      ]
    }
  ]
};

// Дополнительные утилиты для работы с данными
export const getBrandById = (id: number): CarBrand | undefined => {
  return carBrands.find(brand => brand.id === id);
};

export const getModelById = (brand: string, modelId: number): CarModel | undefined => {
  if (brand === 'BMW') {
    return bmwDatabase.models.find(model => model.id === modelId);
  }
  return undefined;
};

export const getAllModels = (brand: string): CarModel[] => {
  if (brand === 'BMW') {
    return bmwDatabase.models;
  }
  return [];
};
