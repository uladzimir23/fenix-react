// src/data/firmwareData.ts
import { FirmwareFile } from '../api/types/firmware';
import { bmwDatabase } from './carData';
import { DeterministicRandom, generatePrice } from '../utils/deterministicRandom';

// Определяем категории прошивок
type CategoryKey = 'Stage1' | 'Stage2' | 'Stage3' | 'E85' | 'DPFoff' | 'EGRoff' | 'IMMOoff' | 
  'ADBLUEoff' | 'SAPoff' | 'EVAPoff' | 'Custom' | 'Eco' | 'Valet' | 'Race' | 'ST1' | 'Std' | 'E2';

// Описания категорий прошивок
const categoryDescriptions: Record<CategoryKey, string> = {
  Stage1: "Stage1 - общепринятое обозначение стадии тюнинга, при которой меняется только программа управления двигателем (прошивка). При использовании прошивок Stage1, никаких механических доработок двигателя, впуска или выпуска не требуется.",
  Stage2: "Stage2 - прошивка для двигателя с доработанным железом: интеркулер, выхлопная система, воздушный фильтр.",
  Stage3: "Stage3 - максимальный тюнинг с серьезными доработками двигателя, турбины и других компонентов.",
  E85: "E85 - прошивка для работы на биоэтаноле (смесь 85% этанола и 15% бензина).",
  DPFoff: "DPFoff - прошивка с отключенной системой сажевого фильтра.",
  EGRoff: "EGRoff - прошивка с отключенной системой ЕГР.",
  IMMOoff: "IMMOoff - прошивка с отключенным опросом иммобилайзера.",
  ADBLUEoff: "ADBLUEoff - прошивка с отключенной системой подачи мочевины.",
  SAPoff: "SAPoff - прошивка с отключенной системой вторичного воздуха.",
  EVAPoff: "EVAPoff - прошивка с отключенной системой адсорбера.",
  Custom: "Custom - кастомная прошивка под индивидуальные требования.",
  Eco: "Eco - эко-прошивка для снижения расхода топлива.",
  Valet: "Valet - валет-режим с ограничением мощности.",
  Race: "Race - гоночная прошивка для трека.",
  ST1: "ST1 - прошивки на бензиновые атмосферные двигателя, где программный тюнинг не дает ощутимого прироста мощности, но улучшает отзывчивость и динамику.",
  Std: "Std - стандартная заводская прошивка, без улучшения силовых характеристик двигателя.",
  E2: "E2 - (Евро-2) - прошивка с отключенным контролем катализатора и отключенным задним датчиком кислорода."
};

// Типы топлива
const fuelTypes = [
  'Бензин', 'Дизель', 'Бензин/E85', 'Гибрид', 'Газ/Бензин', 'Электрический'
];

// Типы трансмиссии
const transmissionTypes = [
  'Механическая', 'Автоматическая', 'CVT', 'DSG/S-Tronic', 'Роботизированная'
];

// Рекомендуемые инструменты для прошивки
const tuningTools = [
  'KESSv2', 'MPPS v16', 'K-TAG', 'MPPS', 'ODIS', 'VCDS', 'VDIAG', 'XENTRY',
  'Techstream', 'DHT ECU', 'Alientech', 'PCMFlash', 'ECU Safe', 'Flex'
];

// Статусы прошивок
const statuses: Array<'verified' | 'pending' | 'rejected'> = ['verified', 'pending', 'rejected'];

// Авторы прошивок
const authors = [
  'Иван Петров', 'Алексей Смирнов', 'Сергей Козлов', 'Дмитрий Волков', 
  'Артем Новиков', 'Михаил Орлов', 'Андрей Кузнецов', 'Евгений Попов'
];

// Функция для извлечения мощности из строки двигателя
const extractHorsepower = (engine: string): number => {
  const match = engine.match(/(\d+)\s*hp/);
  return match ? parseInt(match[1], 10) : 0;
};

// Функция для определения типа топлива по описанию двигателя
const determineFuelType = (engine: string): string => {
  if (engine.toLowerCase().includes('diesel')) return 'Дизель';
  if (engine.toLowerCase().includes('petrol') || engine.toLowerCase().includes('gasoline')) return 'Бензин';
  if (engine.toLowerCase().includes('hybrid')) return 'Гибрид';
  if (engine.toLowerCase().includes('electric')) return 'Электрический';
  if (engine.toLowerCase().includes('phev')) return 'Гибрид';
  return Math.random() > 0.5 ? 'Бензин' : 'Дизель';
};

// Функция для генерации прошивок на основе базы данных автомобилей
const generateFirmwareFiles = (): FirmwareFile[] => {
  const firmwareFiles: FirmwareFile[] = [];
  let id = 1;

  // Сначала генерируем для BMW
  bmwDatabase.models.forEach(model => {
    model.generations.forEach(generation => {
      generation.engines.forEach(engine => {
        // Создаем детерминированный генератор для этого двигателя
        const seed = `firmware-${model.name}-${generation.body}-${engine}`;
        const random = new DeterministicRandom(seed);
        
        // Для каждого двигателя создаем несколько вариантов прошивок
        const categories = Object.keys(categoryDescriptions) as CategoryKey[];
        const selectedCategories = random.randomSample(categories, random.randomInRange(2, 4));

        selectedCategories.forEach((category: CategoryKey) => {
          const baseHorsepower = extractHorsepower(engine);
          
          // Генерируем детерминированные значения на основе категории и двигателя
          const categorySeed = `${seed}-${category}`;
          const categoryRandom = new DeterministicRandom(categorySeed);
          
          const horsepowerGain = category === 'Stage1' ? categoryRandom.randomInRange(30, 60) :
                               category === 'Stage2' ? categoryRandom.randomInRange(60, 100) :
                               category === 'Stage3' ? categoryRandom.randomInRange(100, 150) :
                               category === 'Eco' ? categoryRandom.randomInRange(5, 15) : categoryRandom.randomInRange(10, 40);

          const torqueGain = Math.round(horsepowerGain * 1.5);
          const fuelType = determineFuelType(engine);
          const price = generatePrice(category, categoryRandom);

          const firmware: FirmwareFile = {
            id: id++,
            name: `${bmwDatabase.brand} ${engine.split(' ')[0]} ${category}`,
            description: `${categoryDescriptions[category]}\n\nПрименение: ${bmwDatabase.brand} ${model.name} ${generation.years} ${generation.body}, двигатель: ${engine}`,
            uploadDate: new Date(Date.now() - categoryRandom.randomInRange(0, 365 * 2 * 24 * 60 * 60 * 1000)),
            version: `${categoryRandom.randomInRange(1, 2)}.${categoryRandom.randomInRange(0, 5)}`,
            brand: bmwDatabase.brand,
            model: model.name,
            engine: engine,
            category: category,
            fileSize: Math.round((categoryRandom.randomInRange(15, 35) / 10) * 10) / 10,
            downloadCount: categoryRandom.randomInRange(0, 300),
            rating: Math.round((categoryRandom.randomInRange(35, 50) / 10) * 10) / 10,
            isPublic: categoryRandom.randomInRange(0, 10) > 3,
            horsepowerGain: horsepowerGain,
            torqueGain: torqueGain,
            fuelType: fuelType,
            originalHorsepower: baseHorsepower,
            tunedHorsepower: baseHorsepower + horsepowerGain,
            originalTorque: Math.round(baseHorsepower * 1.8),
            tunedTorque: Math.round(baseHorsepower * 1.8) + torqueGain,
            fuelConsumptionChange: category === 'Eco' ? `-${categoryRandom.randomInRange(5, 15)}%` : 
                                 categoryRandom.randomInRange(0, 10) > 5 ? `+${categoryRandom.randomInRange(0, 10)}%` : `-${categoryRandom.randomInRange(0, 5)}%`,
            requiredHardware: category === 'Stage2' || category === 'Stage3' ? 
                              ['Увеличенный интеркулер', 'Спорт выхлоп'] : [],
            compatibilityNotes: `Только для ${generation.years} ${generation.body} с двигателем ${engine.split(' ')[0]}`,
            changelog: `v1.0 - Первоначальный релиз`,
            author: categoryRandom.randomElement(authors),
            supportedECUs: ['ECU' + categoryRandom.randomInRange(1000, 9999)],
            status: categoryRandom.randomElement(statuses),
            lastUpdated: new Date(Date.now() - categoryRandom.randomInRange(0, 180 * 24 * 60 * 60 * 1000)),
            fileName: `${bmwDatabase.brand.toLowerCase()}_${engine.split(' ')[0].toLowerCase()}_${category.toLowerCase()}_v1.0.bin`,
            isEncrypted: categoryRandom.randomInRange(0, 10) > 7,
            requiresUnlockCode: categoryRandom.randomInRange(0, 10) > 5,
            recommendedTuningTools: [categoryRandom.randomElement(tuningTools)],
            knownIssues: categoryRandom.randomInRange(0, 10) > 8 ? 'Возможны незначительные колебания на холостом ходу' : undefined,
            installationInstructions: categoryRandom.randomInRange(0, 10) > 5 ? 'Прошивка через OBDII разъем' : 'Требуется снятие и вскрытие ЭБУ',
            testedVehicles: [`${bmwDatabase.brand} ${model.name} ${generation.years}`],
            supportedYears: generation.years,
            transmissionType: categoryRandom.randomElement(transmissionTypes),
            price: price // Добавляем цену
          };

          firmwareFiles.push(firmware);
        });
      });
    });
  });

  return firmwareFiles;
};

export const mockFirmwareFiles: FirmwareFile[] = generateFirmwareFiles();

export const firmwareCategories = Object.keys(categoryDescriptions);

export { fuelTypes, transmissionTypes };

// Добавим в конец файла firmwareData.ts

// Функции для подсчета количества прошивок
export const getFirmwareCountByBrand = (brand: string): number => {
  return mockFirmwareFiles.filter(firmware => firmware.brand === brand).length;
};

export const getFirmwareCountByModel = (brand: string, model: string): number => {
  return mockFirmwareFiles.filter(firmware => 
    firmware.brand === brand && firmware.model === model
  ).length;
};

export const getFirmwareCountByGeneration = (brand: string, model: string, generationBody: string): number => {
  return mockFirmwareFiles.filter(firmware => 
    firmware.brand === brand && 
    firmware.model === model &&
    firmware.description?.includes(generationBody)
  ).length;
};

export const getFirmwareCountByEngine = (engine: string): number => {
  return mockFirmwareFiles.filter(firmware => firmware.engine === engine).length;
};

export const getFirmwareCountByCategory = (category: string): number => {
  return mockFirmwareFiles.filter(firmware => firmware.category === category).length;
};