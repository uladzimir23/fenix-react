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

export interface CarEngine {
  engines: string[];
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
  { id: 20, name: 'Tesla', logo: 'https://www.carlogos.org/car-logos/tesla-logo.png' },
  // Добавленные марки
  { id: 21, name: 'Cadillac', logo: 'https://www.carlogos.org/car-logos/cadillac-logo.png' },
  { id: 22, name: 'Jaguar', logo: 'https://www.carlogos.org/car-logos/jaguar-logo.png' },
  { id: 23, name: 'Land Rover', logo: 'https://www.carlogos.org/car-logos/land-rover-logo.png' },
  { id: 24, name: 'Mitsubishi', logo: 'https://www.carlogos.org/car-logos/mitsubishi-logo.png' },
  { id: 25, name: 'Chrysler', logo: 'https://www.carlogos.org/car-logos/chrysler-logo.png' },
  { id: 26, name: 'Dodge', logo: 'https://www.carlogos.org/car-logos/dodge-logo.png' },
  { id: 27, name: 'Ram', logo: 'https://www.carlogos.org/car-logos/ram-logo.png' },
  { id: 28, name: 'Buick', logo: 'https://www.carlogos.org/car-logos/buick-logo.png' },
  { id: 29, name: 'GMC', logo: 'https://www.carlogos.org/car-logos/gmc-logo.png' },
  { id: 30, name: 'Acura', logo: 'https://www.carlogos.org/car-logos/acura-logo.png' },
  { id: 31, name: 'Infiniti', logo: 'https://www.carlogos.org/car-logos/infiniti-logo.png' },
  { id: 32, name: 'Lincoln', logo: 'https://www.carlogos.org/car-logos/lincoln-logo.png' },
  { id: 33, name: 'Mini', logo: 'https://www.carlogos.org/car-logos/mini-logo.png' },
  { id: 34, name: 'Bentley', logo: 'https://www.carlogos.org/car-logos/bentley-logo.png' },
  { id: 35, name: 'Maserati', logo: 'https://www.carlogos.org/car-logos/maserati-logo.png' },
  { id: 36, name: 'Rolls-Royce', logo: 'https://www.carlogos.org/car-logos/rolls-royce-logo.png' },
  { id: 37, name: 'McLaren', logo: 'https://www.carlogos.org/car-logos/mclaren-logo.png' },
  { id: 38, name: 'Bugatti', logo: 'https://www.carlogos.org/car-logos/bugatti-logo.png' },
  { id: 39, name: 'Genesis', logo: 'https://www.carlogos.org/car-logos/genesis-logo.png' },
  { id: 40, name: 'Alfa Romeo', logo: 'https://www.carlogos.org/car-logos/alfa-romeo-logo.png' },
  { id: 41, name: 'Fiat', logo: 'https://www.carlogos.org/car-logos/fiat-logo.png' },
  { id: 42, name: 'Peugeot', logo: 'https://www.carlogos.org/car-logos/peugeot-logo.png' },
  { id: 43, name: 'Renault', logo: 'https://www.carlogos.org/car-logos/renault-logo.png' },
  { id: 44, name: 'Citroën', logo: 'https://www.carlogos.org/car-logos/citroen-logo.png' },
  { id: 45, name: 'DS Automobiles', logo: 'https://www.carlogos.org/car-logos/ds-logo.png' },
  { id: 46, name: 'Opel', logo: 'https://www.carlogos.org/car-logos/opel-logo.png' },
  { id: 47, name: 'Saab', logo: 'https://www.carlogos.org/car-logos/saab-logo.png' },
  { id: 48, name: 'Skoda', logo: 'https://www.carlogos.org/car-logos/skoda-logo.png' },
  { id: 49, name: 'Seat', logo: 'https://www.carlogos.org/car-logos/seat-logo.png' },
  { id: 50, name: 'Suzuki', logo: 'https://www.carlogos.org/car-logos/suzuki-logo.png' }
];

// Детальная база данных по BMW

export const bmwDatabase: CarDatabase = {
  brand: 'BMW',
  models: [
    {
      id: 1,
      name: '1 Series',
      generations: [
        {
          years: '2019-2023',
          body: 'F40',
          engines: [
            '118i (1.5L Turbo, 140 hp)',
            '120i (2.0L Turbo, 178 hp)',
            '128ti (2.0L Turbo, 265 hp)',
            'M135i (2.0L Turbo, 306 hp)'
          ]
        },
        {
          years: '2011-2019',
          body: 'F20/F21',
          engines: [
            '114i (1.6L Turbo, 102 hp)',
            '116i (1.6L Turbo, 136 hp)',
            '118i (1.6L Turbo, 170 hp)',
            '120i (2.0L Turbo, 184 hp)',
            'M140i (3.0L Turbo, 340 hp)'
          ]
        },
        {
          years: '2004-2013',
          body: 'E81/E82/E87/E88',
          engines: [
            '116i (1.6L, 116 hp)',
            '118i (2.0L, 136 hp)',
            '120i (2.0L, 170 hp)',
            '130i (3.0L, 265 hp)',
            'M Coupe (3.0L Turbo, 340 hp)'
          ]
        }
      ]
    },
    {
      id: 2,
      name: '2 Series',
      generations: [
        {
          years: '2022-2023',
          body: 'G42',
          engines: [
            '220i (2.0L Turbo, 184 hp)',
            '230i (2.0L Turbo, 245 hp)',
            'M240i (3.0L Turbo, 374 hp)'
          ]
        },
        {
          years: '2014-2021',
          body: 'F22/F23',
          engines: [
            '218i (1.5L Turbo, 136 hp)',
            '220i (2.0L Turbo, 184 hp)',
            '230i (2.0L Turbo, 252 hp)',
            'M240i (3.0L Turbo, 340 hp)',
            'M2 (3.0L Turbo, 370-410 hp)'
          ]
        },
        {
          years: '2014-2021',
          body: 'F45/F46 (Active/Gran Tourer)',
          engines: [
            '216i (1.5L Turbo, 116 hp)',
            '218i (1.5L Turbo, 136 hp)',
            '225xe (1.5L Turbo PHEV, 224 hp)'
          ]
        }
      ]
    },
    {
      id: 3,
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
          body: 'F30/F31',
          engines: [
            '316i (1.6L Turbo, 136 hp)',
            '320i (2.0L Turbo, 184 hp)',
            '328i (2.0L Turbo, 245 hp)',
            '335i (3.0L Turbo, 306 hp)'
          ]
        },
        {
          years: '2005-2013',
          body: 'E90/E91/E92/E93',
          engines: [
            '318i (2.0L, 129 hp)',
            '320i (2.0L, 156 hp)',
            '325i (2.5L, 218 hp)',
            '330i (3.0L, 258 hp)',
            '335i (3.0L Twin-Turbo, 306 hp)',
            'M3 (4.0L V8, 420 hp)'
          ]
        },
        {
          years: '1998-2006',
          body: 'E46',
          engines: [
            '318i (2.0L, 118 hp)',
            '320i (2.2L, 170 hp)',
            '325i (2.5L, 192 hp)',
            '330i (3.0L, 231 hp)',
            'M3 (3.2L, 343 hp)'
          ]
        },

        {
          years: '1990-2000',
          body: 'E36',
          engines: [
            '316i (1.6L, 102 hp)',
            '318i (1.8L, 115 hp)',
            '320i (2.0L, 150 hp)',
            '325i (2.5L, 192 hp)',
            '328i (2.8L, 193 hp)',
            'M3 (3.0L, 286 hp)'
          ]
        },
        {
          years: '1982-1994',
          body: 'E30',
          engines: [
            '316i (1.6L, 102 hp)',
            '318i (1.8L, 115 hp)',
            '320i (2.0L, 129 hp)',
            '325i (2.5L, 171 hp)',
            'M3 (2.3L, 192-238 hp)'
          ]
        }
      ]
    },
    {
      id: 4,
      name: '4 Series',
      generations: [
        {
          years: '2020-2023',
          body: 'G22/G23/G26',
          engines: [
            '420i (2.0L Turbo, 184 hp)',
            '430i (2.0L Turbo, 258 hp)',
            '440i (3.0L Turbo, 374 hp)',
            'M440i (3.0L Turbo, 374 hp)',
            'M4 (3.0L Turbo, 480-510 hp)'
          ]
        },
        {
          years: '2013-2020',
          body: 'F32/F33/F36',
          engines: [
            '420i (2.0L Turbo, 184 hp)',
            '428i (2.0L Turbo, 245 hp)',
            '435i (3.0L Turbo, 306 hp)',
            '440i (3.0L Turbo, 326 hp)',
            'M4 (3.0L Turbo, 431-450 hp)'
          ]
        }
      ]
    },
    {
      id: 5,
      name: '5 Series',
      generations: [
        {
          years: '2017-2023',
          body: 'G30/G31',
          engines: [
            '520i (2.0L Turbo, 184 hp)',
            '530i (2.0L Turbo, 252 hp)',
            '540i (3.0L Turbo, 340 hp)',
            'M550i (4.4L V8 Turbo, 530 hp)'
          ]
        },
        {
          years: '2010-2017',
          body: 'F10/F11/F07',
          engines: [
            '520i (2.0L Turbo, 184 hp)',
            '528i (2.0L Turbo, 245 hp)',
            '535i (3.0L Turbo, 306 hp)',
            '550i (4.4L V8 Turbo, 450 hp)'
          ]
        },
        {
          years: '2003-2010',
          body: 'E60/E61',
          engines: [
            '520i (2.2L, 170 hp)',
            '525i (2.5L, 218 hp)',
            '530i (3.0L, 258 hp)',
            '545i (4.4L V8, 333 hp)',
            'M5 (5.0L V10, 507 hp)'
          ]
        },
        {
          years: '1995-2003',
          body: 'E39',
          engines: [
            '520i (2.2L, 170 hp)',
            '523i (2.5L, 170 hp)',
            '528i (2.8L, 193 hp)',
            '530i (3.0L, 231 hp)',
            '540i (4.4L V8, 286 hp)',
            'M5 (4.9L V8, 400 hp)'
          ]
        },

        {
          years: '1988-1996',
          body: 'E34',
          engines: [
            '518i (1.8L, 113 hp)',
            '520i (2.0L, 150 hp)',
            '525i (2.5L, 192 hp)',
            '530i (3.0L, 218 hp)',
            '535i (3.5L, 218 hp)',
            '540i (4.0L V8, 286 hp)',
            'M5 (3.6L, 315 hp)'
          ]
        }
      ]
    },
    {
      id: 6,
      name: '6 Series',
      generations: [
        {
          years: '2018-2023',
          body: 'G32 (Gran Turismo)',
          engines: [
            '630i (2.0L Turbo, 258 hp)',
            '640i (3.0L Turbo, 340 hp)'
          ]
        },
        {
          years: '2011-2017',
          body: 'F06/F12/F13',
          engines: [
            '640i (3.0L Turbo, 320 hp)',
            '650i (4.4L V8 Turbo, 450 hp)',
            'M6 (4.4L V8 Turbo, 560 hp)'
          ]
        },
        {
          years: '2004-2010',
          body: 'E63/E64',
          engines: [
            '630i (3.0L, 258 hp)',
            '645i (4.4L V8, 333 hp)',
            '650i (4.8L V8, 367 hp)',
            'M6 (5.0L V10, 507 hp)'
          ]
        }
      ]
    },
    {
      id: 7,
      name: '7 Series',
      generations: [
        {
          years: '2023-...',
          body: 'G70',
          engines: [
            '735i (3.0L Turbo, 286 hp)',
            '740i (3.0L Turbo, 381 hp)',
            '760i (4.4L V8 Turbo, 537 hp)'
          ]
        },
        {
          years: '2016-2022',
          body: 'G11/G12',
          engines: [
            '730i (2.0L Turbo, 258 hp)',
            '740i (3.0L Turbo, 326 hp)',
            '750i (4.4L V8 Turbo, 450 hp)',
            'M760i (6.6L V12, 610 hp)'
          ]
        },
        {
          years: '2009-2015',
          body: 'F01/F02/F03/F04',
          engines: [
            '730i (3.0L, 272 hp)',
            '740i (3.0L Turbo, 326 hp)',
            '750i (4.4L V8 Turbo, 450 hp)',
            '760i (6.0L V12, 544 hp)'
          ]
        },
        {
          years: '2002-2008',
          body: 'E65/E66/E67/E68',
          engines: [
            '730i (3.0L, 231 hp)',
            '735i (3.6L, 272 hp)',
            '745i (4.4L V8, 333 hp)',
            '760i (6.0L V12, 445 hp)'
          ]
        },

        {
          years: '1994-2001',
          body: 'E38',
          engines: [
            '728i (2.8L, 193 hp)',
            '735i (3.5L, 235 hp)',
            '740i (4.4L V8, 286 hp)',
            '750i (5.4L V12, 326 hp)'
          ]
        }
      ]
    },
    {
      id: 8,
      name: '8 Series',
      generations: [
        {
          years: '2018-2023',
          body: 'G14/G15/G16',
          engines: [
            '840i (3.0L Turbo, 340 hp)',
            '850i (4.4L V8 Turbo, 530 hp)',
            'M8 (4.4L V8 Turbo, 600 hp)'
          ]
        },
        {
          years: '1990-1999',
          body: 'E31',
          engines: [
            '840i (4.4L V8, 286 hp)',
            '850i (5.0L V12, 300 hp)',
            '850CSi (5.6L V12, 380 hp)'
          ]
        }
      ]
    },
    {
      id: 9,
      name: 'X1',
      generations: [
        {
          years: '2022-2023',
          body: 'U11',
          engines: [
            'xDrive20i (2.0L Turbo, 170 hp)',
            'xDrive23i (2.0L Turbo, 218 hp)',
            'xDrive30e (PHEV, 326 hp)'
          ]
        },
        {
          years: '2015-2022',
          body: 'F48',
          engines: [
            'sDrive18i (1.5L Turbo, 136 hp)',
            'xDrive20i (2.0L Turbo, 192 hp)',
            'xDrive25d (2.0L Diesel, 231 hp)'
          ]
        },
        {
          years: '2009-2015',
          body: 'E84',
          engines: [
            'sDrive18i (2.0L, 143 hp)',
            'xDrive20i (2.0L Turbo, 184 hp)',
            'xDrive28i (3.0L, 258 hp)'
          ]
        }
      ]
    },
    {
      id: 10,
      name: 'X2',
      generations: [
        {
          years: '2017-2023',
          body: 'F39',
          engines: [
            'sDrive18i (1.5L Turbo, 140 hp)',
            'xDrive20i (2.0L Turbo, 192 hp)',
            'M35i (2.0L Turbo, 306 hp)'
          ]
        }
      ]
    },
    {
      id: 11,
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
        },
        {
          years: '2011-2017',
          body: 'F25',
          engines: [
            'xDrive20i (2.0L Turbo, 184 hp)',
            'xDrive28i (2.0L Turbo, 245 hp)',
            'xDrive35i (3.0L Turbo, 306 hp)'
          ]
        },
        {
          years: '2004-2010',
          body: 'E83',
          engines: [
            '2.0i (2.0L, 150 hp)',
            '2.5i (2.5L, 218 hp)',
            '3.0i (3.0L, 231 hp)'
          ]
        }
      ]
    },
    {
      id: 12,
      name: 'X4',
      generations: [
        {
          years: '2018-2023',
          body: 'G02',
          engines: [
            'xDrive20i (2.0L Turbo, 184 hp)',
            'xDrive30i (2.0L Turbo, 252 hp)',
            'M40i (3.0L Turbo, 360 hp)'
          ]
        },
        {
          years: '2014-2018',
          body: 'F26',
          engines: [
            'xDrive20i (2.0L Turbo, 184 hp)',
            'xDrive28i (2.0L Turbo, 245 hp)',
            'xDrive35i (3.0L Turbo, 306 hp)'
          ]
        }
      ]
    },
    {
      id: 13,
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
          body: 'F15/F16',
          engines: [
            'xDrive35i (3.0L Turbo, 306 hp)',
            'xDrive50i (4.4L V8 Turbo, 450 hp)',
            'M50d (3.0L Diesel, 400 hp)'
          ]
        },
        {
          years: '2007-2013',
          body: 'E70/E71/E72',
          engines: [
            'xDrive35i (3.0L Turbo, 306 hp)',
            'xDrive50i (4.4L V8 Turbo, 407 hp)',
            'X5 M (4.4L V8 Turbo, 555 hp)'
          ]
        },
        {
          years: '2000-2006',
          body: 'E53',
          engines: [
            '3.0i (3.0L, 231 hp)',
            '4.4i (4.4L V8, 286 hp)',
            '4.8is (4.8L V8, 360 hp)'
          ]
        },
      ]
    },
    {
      id: 14,
      name: 'X6',
      generations: [
        {
          years: '2020-2023',
          body: 'G06',
          engines: [
            'xDrive40i (3.0L Turbo, 340 hp)',
            'M50i (4.4L V8 Turbo, 530 hp)'
          ]
        },
        {
          years: '2015-2019',
          body: 'F16',
          engines: [
            'xDrive35i (3.0L Turbo, 306 hp)',
            'xDrive50i (4.4L V8 Turbo, 450 hp)'
          ]
        }
      ]
    },
    {
      id: 15,
      name: 'X7',
      generations: [
        {
          years: '2019-2023',
          body: 'G07',
          engines: [
            'xDrive40i (3.0L Turbo, 340 hp)',
            'xDrive50i (4.4L V8 Turbo, 462 hp)',
            'M50i (4.4L V8 Turbo, 523 hp)'
          ]
        }
      ]
    },
    {
      id: 16,
      name: 'Z3',
      generations: [
        {
          years: '1996-2002',
          body: 'E36/7',
          engines: [
            '1.8i (1.8L, 115 hp)',
            '2.8i (2.8L, 193 hp)',
            'M Roadster (3.2L, 240 hp)'
          ]
        }
      ]
    },
    {
      id: 17,
      name: 'Z4',
      generations: [
        {
          years: '2019-2023',
          body: 'G29',
          engines: [
            'sDrive20i (2.0L Turbo, 197 hp)',
            'sDrive30i (2.0L Turbo, 258 hp)',
            'M40i (3.0L Turbo, 340 hp)'
          ]
        },
        {
          years: '2009-2016',
          body: 'E89',
          engines: [
            'sDrive20i (2.0L Turbo, 184 hp)',
            'sDrive35i (3.0L Turbo, 306 hp)'
          ]
        },
        {
          years: '2002-2008',
          body: 'E85/E86',
          engines: [
            '2.5i (2.5L, 192 hp)',
            '3.0i (3.0L, 231 hp)',
            'M Roadster (3.2L, 343 hp)'
          ]
        }
      ]
    },
    {
      id: 18,
      name: 'i3',
      generations: [
        {
          years: '2013-2022',
          body: 'I01',
          engines: [
            'i3 (170 hp)',
            'i3s (184 hp)',
            'i3 REx (range extender)'
          ]
        }
      ]
    },
    {
      id: 19,
      name: 'i4',
      generations: [
        {
          years: '2021-2023',
          body: 'G26',
          engines: [
            'eDrive40 (340 hp)',
            'M50 (544 hp)'
          ]
        }
      ]
    },
    {
      id: 20,
      name: 'i7',
      generations: [
        {
          years: '2022-2023',
          body: 'G70',
          engines: [
            'i7 xDrive60 (544 hp)',
            'i7 M70 (660 hp)'
          ]
        }
      ]
    },
    {
      id: 21,
      name: 'i8',
      generations: [
        {
          years: '2014-2020',
          body: 'I12',
          engines: [
            'i8 (1.5L Turbo PHEV, 362 hp)'
          ]
        }
      ]
    },
    {
      id: 22,
      name: 'M Models',
      generations: [
        {
          years: '2015-2022',
          body: 'F90 M5',
          engines: [
            'M5 (4.4L V8 Turbo, 600 hp)',
            'M5 Competition (4.4L V8 Turbo, 625 hp)'
          ]
        },
        {
          years: '2014-2020',
          body: 'F82/F83 M4',
          engines: [
            'M4 (3.0L Turbo, 431 hp)',
            'M4 Competition (3.0L Turbo, 450 hp)'
          ]
        },
        {
          years: '2005-2013',
          body: 'E60/E61 M5',
          engines: [
            'M5 (5.0L V10, 507 hp)'
          ]
        },
        {
          years: '2000-2006',
          body: 'E46 M3',
          engines: [
            'M3 (3.2L, 343 hp)'
          ]
        },
        {
          years: '2018-2023',
          body: 'F90 M5',
          engines: [
            'M5 (4.4L V8 Turbo, 600 hp)',
            'M5 Competition (4.4L V8 Turbo, 625 hp)'
          ]
        },
        {
          years: '2019-2023',
          body: 'X3 M/X4 M',
          engines: [
            'X3 M (3.0L Turbo, 480 hp)',
            'X3 M Competition (3.0L Turbo, 510 hp)'
          ]
        },
        {
          years: '2020-2023',
          body: 'X5 M/X6 M',
          engines: [
            'X5 M (4.4L V8 Turbo, 600 hp)',
            'X5 M Competition (4.4L V8 Turbo, 625 hp)'
          ]
        },
        {
          years: '1986-1991',
          body: 'E30 M3',
          engines: [
            'M3 (2.3L, 192-238 hp)'
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
