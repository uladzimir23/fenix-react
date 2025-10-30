// src/utils/deterministicRandom.ts
export class DeterministicRandom {
  private seed: number;

  constructor(seed: string) {
    this.seed = this.hashString(seed);
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Генератор псевдослучайных чисел (линейный конгруэнтный метод)
  private lcg(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }

  // Случайное число в диапазоне [min, max]
  randomInRange(min: number, max: number): number {
    return Math.floor(this.lcg() * (max - min + 1)) + min;
  }

  // Случайный элемент из массива
  randomElement<T>(array: T[]): T {
    return array[Math.floor(this.lcg() * array.length)];
  }

  // Перемешивание массива (Fisher-Yates алгоритм)
  shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(this.lcg() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Выбор N случайных элементов из массива
  randomSample<T>(array: T[], count: number): T[] {
    const shuffled = this.shuffleArray(array);
    return shuffled.slice(0, count);
  }
}

// Генератор цен в зависимости от категории
export const generatePrice = (category: string, random: DeterministicRandom): number => {
  const priceRanges: Record<string, [number, number]> = {
    Stage1: [15000, 25000],
    Stage2: [8000, 15000],
    Stage3: [60000, 95000],
    E85: [5000, 10000],
    DPFoff: [5000, 8000],
    EGRoff: [7000, 12000],
    IMMOoff: [4000, 7000],
    ADBLUEoff: [4000, 7000],
    SAPoff: [8000, 15000],
    EVAPoff: [3000, 6000],
    Custom: [10000, 18000],
    Eco: [20000, 30000],
    Valet: [12000, 20000],
    Race: [12000, 20000],
    ST1: [12000, 20000],
    Std: [12000, 20000],
    E2: [12000, 20000],
  };

  const range = priceRanges[category] || [0, 0];
  const [min, max] = range;
  return random.randomInRange(min, max);
};