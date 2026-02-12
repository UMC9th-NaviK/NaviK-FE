export interface AbilityItem {
  abilityId: number;
  content: string;
}

export interface AbilityPageResult {
  content: AbilityItem[];
  hasNext: boolean;
  nextCursor: string | null;
}
