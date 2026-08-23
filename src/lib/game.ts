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
  { key: 'mummy', prompt: "Who is mummy's secret favourite?", short: "Mummy's favourite", emoji: '👑', options: peopleOptions },
  { key: 'fight', prompt: 'Who starts most of the fights?', short: 'Fight starter', emoji: '🥊', options: peopleOptions },
  { key: 'drama', prompt: 'Who deserves the drama championship?', short: 'Drama champion', emoji: '🎭', options: peopleOptions },
  { key: 'kanjoos', prompt: 'Who is more kanjoos with their own money?', short: 'Kanjoos crown', emoji: '🪙', options: peopleOptions },
  { key: 'food', prompt: "Who steals the other's food without asking?", short: 'Food thief', emoji: '🍟', options: peopleOptions },
  { key: 'gift', prompt: 'Who will demand the better Rakhi gift?', short: 'Gift expectations', emoji: '🎁', options: peopleOptions },
  { key: 'sorry', prompt: 'Who says sorry first after a fight?', short: 'Peace maker', emoji: '🤝', options: peopleOptions },
  { key: 'caring', prompt: 'Who is secretly more caring?', short: 'Secretly caring', emoji: '🫶', options: peopleOptions },
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
      verdict: 'Certified mind reader',
      subline: 'Suspiciously accurate. You have been observed.',
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
      verdict: 'Same family, different reality',
      subline: 'Enough agreement to stay siblings. Barely.',
      agreements: agreements.map((q) => q.key),
      disputes: disputes.map((q) => q.key),
    };
  }
  return {
    matches,
    total: questions.length,
    percent,
    winner: 'creator',
    verdict: 'Do you two even talk?',
    subline: 'Family Court has been summoned immediately.',
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
  if (result.matches >= 7) return `${siblingName} knows ${creatorName} better than the family group chat does. Mildly alarming.`;
  if (result.matches >= 5) return `${creatorName} and ${siblingName} share one brain cell, but it changes owner without warning.`;
  if (result.matches >= 3) return `They share DNA, snacks and absolutely incompatible versions of every family story.`;
  return `${creatorName} and ${siblingName} need introductions. Please involve a responsible adult.`;
}
