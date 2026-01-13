export interface Game {
  name: string;
  isMultidisc: boolean;
  discs: string[];
  isConverted: 'pending' | 'organized';
}

export type GroupingStrategy = 'safe' | 'aggressive';
