export type Topic = 
  | 'Ratio & Proportion'
  | 'Algebra'
  | 'Probability'
  | 'Quadratics'
  | 'Trigonometry'
  | 'Mensuration'
  | 'Statistics'
  | 'Geometry'
  | 'Vectors'
  | 'Mixed';

export interface Question {
  id: string;
  topic: Topic;
  text: string;
  answer: string;
  options?: string[];
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Monster {
  id: string;
  name: string;
  emoji: string;
  topic: Topic;
  maxHp: number;
  currentHp: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Boss';
  color: string;
}

export interface GameState {
  playerHp: number;
  maxPlayerHp: number;
  currentMonster: Monster | null;
  battleLog: string[];
  isGameOver: boolean;
  hasWon: boolean;
  turn: 'player' | 'monster';
}
