export interface Filter {
  search: string;
  status: 'all' | 'organized' | 'pending';
  onlyMultiDisc: boolean;
}

export interface Game {
  name: string;
  isMultiDisc: boolean;
  discs: string[];
  status: 'pending' | 'organized';
}

export type GroupingStrategy = 'safe' | 'aggressive';
export type Section = 'browser' | 'queue';
