// src/data/tuningOptionsData.ts
import { TuningOption } from '../api/services/tunnigOptions';
import { bmwDatabase } from './carData';
import { DeterministicRandom } from '../utils/deterministicRandom';

// Определяем категории прошивок
type CategoryKey = 'Stage1' | 'Stage2' | 'Stage3' | 'E85' | 'DPFoff' | 'EGRoff' | 'IMMOoff' | 
  'ADBLUEoff' | 'SAPoff' | 'EVAPoff' | 'Custom' | 'Eco' | 'Valet' | 'Race' | 'ST1' | 'Std' | 'E2';

// Описания категорий прошивок
const categoryDescriptions: Record<CategoryKey, string> = {
  Stage1: "Stage1 - При использовании прошивок Stage1, никаких механических доработок двигателя, впуска или выпуска не требуется.",
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

// Helper function to safely get category description
const getCategoryDescriptionSafe = (category: string): string => {
  return categoryDescriptions[category as CategoryKey] || 'Описание недоступно';
};

// Генерация опций тюнинга для всех двигателей BMW
// Генерация опций тюнинга для всех двигателей BMW
const generateTuningOptions = (): TuningOption[] => {
  const options: TuningOption[] = [];
  let id = 1;

  // Категории прошивок - используем ВСЕ категории
  const categories = Object.keys(categoryDescriptions) as CategoryKey[];

  bmwDatabase.models.forEach(model => {
    model.generations.forEach(generation => {
      generation.engines.forEach(engine => {
        // Для каждого двигателя создаем опции для ВСЕХ категорий
        categories.forEach((category: CategoryKey) => {
          options.push({
            id: id++,
            name: `${category} ${engine.split(' ')[0]} ${model.name} ${generation.years}`,
            description: `${getCategoryDescriptionSafe(category)}`,
            category,
            engineCode: engine
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
    option.engineCode === engineCode
  );
};

export const getTuningOptionsByCategory = (category: string): TuningOption[] => {
  return tuningOptionsData.filter(option => option.category === category);
};

export const getCategories = (): CategoryKey[] => {
  return Object.keys(categoryDescriptions) as CategoryKey[];
};

export const getCategoryDescription = (category: string): string => {
  return getCategoryDescriptionSafe(category);
};