// fenix-react-dev/src/data/tuningOptionsData.ts
import { TuningOption } from '../api/services/tunnigOptions';
import { bmwDatabase } from './carData';

// Тип для ключей категорий
type CategoryKey = 'Stage1' | 'ST1' | 'Std' | 'E2' | 'EGRoff' | 'DPFoff' | 'EVAPoff' | 'SAPoff' | 'ADBLUEoff' | 'IMMOoff';

// Описания категорий прошивок
const categoryDescriptions: Record<CategoryKey, string> = {
  Stage1: "Stage1 - общепринятое обозначение стадии тюнинга, при которой меняется только программа управления двигателем (прошивка). При использовании прошивок Stage1, никаких механических доработок двигателя, впуска или выпуска не требуется.",
  ST1: "ST1 - прошивки на бензиновые атмосферные двигателя, где программный тюнинг не дает ощутимого прироста мощности, но улучшает отзывчивость и динамику.",
  Std: "Std - стандартная заводская прошивка, без улучшения силовых характеристик двигателя.",
  E2: "E2 - (Евро-2) - прошивка с отключенным контролем катализатора и отключенным задним датчиком кислорода.",
  EGRoff: "EGRoff - прошивка с отключенной системой ЕГР.",
  DPFoff: "DPFoff - прошивка с отключенной системой сажевого фильтра.",
  EVAPoff: "EVAPoff - прошивка с отключенной системой адсорбера.",
  SAPoff: "SAPoff - прошивка с отключенной системой вторичного воздуха.",
  ADBLUEoff: "ADBLUEoff - прошивка с отключенной системой подачи мочевины.",
  IMMOoff: "IMMOoff - прошивка с отключенным опросом иммобилайзера."
};

// Генератор случайных цен в зависимости от категории
const generatePrice = (category: CategoryKey): number => {
  const priceRanges: Record<CategoryKey, [number, number]> = {
    Stage1: [15000, 25000],
    ST1: [8000, 15000],
    Std: [0, 0],
    E2: [5000, 10000],
    EGRoff: [5000, 8000],
    DPFoff: [7000, 12000],
    EVAPoff: [4000, 7000],
    SAPoff: [4000, 7000],
    ADBLUEoff: [8000, 15000],
    IMMOoff: [3000, 6000]
  };

  const [min, max] = priceRanges[category];
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Генерация прошивок для всех двигателей BMW
const generateTuningOptions = (): TuningOption[] => {
  const options: TuningOption[] = [];
  let id = 1;

  // Категории прошивок
  const categories = Object.keys(categoryDescriptions) as CategoryKey[];

  bmwDatabase.models.forEach(model => {
    model.generations.forEach(generation => {
      generation.engines.forEach(engine => {
        // Для каждого двигателя создаем несколько вариантов прошивок
        const selectedCategories = categories
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * 3) + 2); // 2-4 прошивки на двигатель

        selectedCategories.forEach(category => {
          const price = generatePrice(category);
          
          options.push({
            id: id++,
            name: `${category} ${engine.split(' ')[0]} ${model.name} ${generation.years}`,
            description: `${categoryDescriptions[category]}\n\nПрименение: ${model.name} ${generation.years} ${generation.body}, двигатель: ${engine}`,
            category,
            price: price === 0 ? undefined : price
          });
        });
      });
    });
  });

  return options;
};

export const tuningOptionsData: TuningOption[] = generateTuningOptions();

// Утилиты для работы с данными прошивок
export const getTuningOptionsByEngine = (engineCode: string): TuningOption[] => {
  return tuningOptionsData.filter(option => 
    option.description?.includes(engineCode)
  );
};

export const getTuningOptionsByCategory = (category: string): TuningOption[] => {
  return tuningOptionsData.filter(option => option.category === category);
};

export const getCategories = (): string[] => {
  return Object.keys(categoryDescriptions);
};

export const getCategoryDescription = (category: string): string => {
  return categoryDescriptions[category as CategoryKey] || '';
};