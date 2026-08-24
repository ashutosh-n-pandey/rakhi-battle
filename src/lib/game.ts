export type Role = 'creator' | 'sibling';
export type AnswerId = 'creator' | 'sibling' | 'both' | 'denied';
export type Answers = Record<string, AnswerId>;

export interface Question {
  key: string;
  prompt: string;
  short: string;
  emoji: string;
  options: Array<{
    id: AnswerId;
    creator: string;
    sibling: string;
  }>;
}

const peopleOptions = [
  { id: 'creator' as const, creator: 'Me, obviously', sibling: 'My sibling' },
  { id: 'sibling' as const, creator: 'My sibling', sibling: 'Me, obviously' },
  { id: 'both' as const, creator: 'Both — diplomatic answer', sibling: 'Both — diplomatic answer' },
  { id: 'denied' as const, creator: 'The family denies everything', sibling: 'The family denies everything' },
];

export const questions: Question[] = [
  { key: 'mummy', prompt: "Ghar mein mummy ka secret favourite kaun tha?", short: "Mummy's favourite", emoji: '👑', options: peopleOptions },
  { key: 'fight', prompt: 'Remote ki ladai sabse pehle kaun shuru karta tha?', short: 'Remote-war starter', emoji: '📺', options: peopleOptions },
  { key: 'drama', prompt: 'Har chhoti baat ka family drama kaun banata tha?', short: 'Drama champion', emoji: '🎭', options: peopleOptions },
  { key: 'kanjoos', prompt: 'Apne paise bachakar doosre ke snacks kaun khaata tha?', short: 'Kanjoos crown', emoji: '🪙', options: peopleOptions },
  { key: 'food', prompt: 'Plate se bina poochhe last bite kaun churaata tha?', short: 'Last-bite chor', emoji: '🍟', options: peopleOptions },
  { key: 'gift', prompt: 'Rakhi shagun ka budget sabse pehle kaun negotiate karega?', short: 'Shagun negotiator', emoji: '🎁', options: peopleOptions },
  { key: 'sorry', prompt: 'Ladai ke baad peace offering sabse pehle kaun laata hai?', short: 'Peace maker', emoji: '🤝', options: peopleOptions },
  { key: 'caring', prompt: 'Bina bole sabse zyada khayal kaun rakhta hai?', short: 'Quietly caring', emoji: '🫶', options: peopleOptions },
];

export const courtQuestionKeys = ['mummy', 'drama', 'kanjoos', 'gift'] as const;

export interface GameResult {
  matches: number;
  total: number;
  percent: number;
  winner: 'creator' | 'sibling' | 'both';
  verdict: string;
  subline: string;
  agreements: string[];
  disputes: string[];
}

export function computeResult(creator: Answers, sibling: Answers): GameResult {
  const agreements = questions.filter((q) => creator[q.key] === sibling[q.key]);
  const disputes = questions.filter((q) => creator[q.key] !== sibling[q.key]);
  const matches = agreements.length;
  const percent = Math.round((matches / questions.length) * 100);

  if (matches >= 6) {
    return {
      matches,
      total: questions.length,
      percent,
      winner: 'sibling',
      verdict: 'Bachpan ke co-authors',
      subline: 'Same memories, same frequency—credit kisne liya, us par case pending hai.',
      agreements: agreements.map((q) => q.key),
      disputes: disputes.map((q) => q.key),
    };
  }
  if (matches >= 4) {
    return {
      matches,
      total: questions.length,
      percent,
      winner: 'both',
      verdict: 'Same bachpan, two director’s cuts',
      subline: 'Kahaani ek hai. Bas tum dono ka edit bilkul alag hai.',
      agreements: agreements.map((q) => q.key),
      disputes: disputes.map((q) => q.key),
    };
  }
  return {
    matches,
    total: questions.length,
    percent,
    winner: 'creator',
    verdict: 'Two stories, one unbreakable team',
    subline: 'Yaadein alag ho sakti hain. Family group chat phir bhi ek hi rahega.',
    agreements: agreements.map((q) => q.key),
    disputes: disputes.map((q) => q.key),
  };
}

export function isAnswers(value: unknown): value is Answers {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const entries = Object.entries(value);
  return entries.length === questions.length && questions.every((q) => {
    const answer = (value as Record<string, unknown>)[q.key];
    return ['creator', 'sibling', 'both', 'denied'].includes(String(answer));
  });
}

export function cleanName(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const name = value.trim().replace(/\s+/g, ' ').slice(0, 24);
  if (name.length < 1) return null;
  return name.replace(/[<>]/g, '');
}

export function displayAnswer(answer: AnswerId, creatorName: string, siblingName: string): string {
  if (answer === 'creator') return creatorName;
  if (answer === 'sibling') return siblingName;
  if (answer === 'both') return 'BOTH';
  return 'TOP SECRET';
}

export function getWinnerName(result: GameResult, creatorName: string, siblingName: string): string {
  if (result.winner === 'creator') return creatorName;
  if (result.winner === 'sibling') return siblingName;
  return `${creatorName} + ${siblingName}`;
}

export function savageVerdict(result: GameResult, creatorName: string, siblingName: string): string {
  if (result.matches >= 7) return `${creatorName} aur ${siblingName} ek hi brain cell share karte hain—and uski custody har Tuesday badalti hai.`;
  if (result.matches >= 5) return `Same ghar, same bachpan, aur family history ke do equally confident historians.`;
  if (result.matches >= 3) return `${creatorName} aur ${siblingName} ko events yaad hain. Facts par abhi bhi Family Court baithi hai.`;
  return `Har legendary sibling story ke do narrators hote hain. In dono ki kahaani full web-series material hai.`;
}

export function bondTitle(result: GameResult): string {
  if (result.matches >= 7) return 'Same-Brain Siblings';
  if (result.matches >= 5) return 'Bachpan Co-Authors';
  if (result.matches >= 3) return 'Director’s-Cut Duo';
  return 'Plot-Twist Partners';
}

export function chainTitle(generation: number): string {
  if (generation <= 0) return 'Chain Starter';
  if (generation === 1) return 'Bachpan Messenger';
  if (generation === 2) return 'Family Influencer';
  return 'Rakhi Legend';
}
