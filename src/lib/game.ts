export type Role = 'creator' | 'sibling';
export type AnswerId = 'creator' | 'sibling' | 'both' | 'denied';
export type Answers = Record<string, AnswerId>;
export type RelationshipDimension = 'warmth' | 'conflict' | 'rivalry' | 'balance';
export type RelationshipPattern = 'harmonious' | 'affect-intense' | 'conflictual' | 'low-involved';

export interface Question {
  key: string;
  dimension: RelationshipDimension;
  prompt: string;
  short: string;
  emoji: string;
  options: Array<{
    id: AnswerId;
    creator: string;
    sibling: string;
    score: number;
  }>;
}

const peopleOptions = [
  { id: 'creator' as const, creator: 'Me — final boss', sibling: 'My sibling — final boss', score: 1 },
  { id: 'sibling' as const, creator: 'My sibling — final boss', sibling: 'Me — final boss', score: 1 },
  { id: 'both' as const, creator: 'Both — joint cabinet', sibling: 'Both — joint cabinet', score: 3 },
  { id: 'denied' as const, creator: 'Depends on the crisis', sibling: 'Depends on the crisis', score: 2 },
];

const scale = (labels: [string, string, string, string], scores: [number, number, number, number]) =>
  (['creator', 'sibling', 'both', 'denied'] as const).map((id, index) => ({
    id,
    creator: labels[index],
    sibling: labels[index],
    score: scores[index],
  }));

export const questions: Question[] = [
  { key: 'mummy', dimension: 'rivalry', prompt: 'Mummy-papa ke favourite wali debate kitni serious thi?', short: 'Favourite-child rivalry', emoji: '👑', options: scale(['Bas family joke tha', 'Kabhi-kabhi points bante the', 'Proper competition thi', 'Case abhi bhi pending hai'], [0, 1, 2, 3]) },
  { key: 'fight', dimension: 'conflict', prompt: 'Ladai hoti thi toh cold war kitni der chalti thi?', short: 'Cold-war duration', emoji: '📺', options: scale(['5 minute, then normal', 'Khaane tak cold war', 'Agla din tak', 'Family Court abhi bhi baithi hai'], [0, 1, 2, 3]) },
  { key: 'drama', dimension: 'balance', prompt: 'Family decision mein final boss kaun hota tha?', short: 'Family power balance', emoji: '🎭', options: peopleOptions },
  { key: 'kanjoos', dimension: 'rivalry', prompt: 'Marks, gifts ya attention—competition kitni thi?', short: 'Competition level', emoji: '🏁', options: scale(['Main cheerleader mode', 'Thoda tease, phir cheer', 'Har win ka rematch', 'Scoreboard kabhi band nahi hua'], [0, 1, 2, 3]) },
  { key: 'food', dimension: 'warmth', prompt: 'Apni favourite cheez share karni ho toh?', short: 'Sharing instinct', emoji: '🍟', options: scale(['Bina poochhe half-half', 'Ek bite—terms apply', 'Pehle negotiation', 'Touch kiya toh case'], [3, 2, 1, 0]) },
  { key: 'gift', dimension: 'balance', prompt: 'Rakhi plan ya family outing ka decision kaise hota hai?', short: 'Decision style', emoji: '🎁', options: scale(['Dono milkar', 'Ek idea, doosra execution', 'Jo zyada loud, wahi winner', 'Parents decide'], [3, 2, 1, 0]) },
  { key: 'sorry', dimension: 'conflict', prompt: 'Ladai ke baad patch-up kaise hota hai?', short: 'Repair style', emoji: '🤝', options: scale(['Same day, bina speech', 'Food bribe ke baad', 'Koi pehle sorry nahi bolta', 'Topic archive nahi, active hai'], [0, 1, 2, 3]) },
  { key: 'caring', dimension: 'warmth', prompt: 'Real problem aaye toh sibling?', short: 'Shows-up score', emoji: '🫶', options: scale(['Bina bole pahunch jaata hai', 'Ek call mein aa jaata hai', 'Lecture ke baad help', 'Family group se pata chalta hai'], [3, 2, 1, 0]) },
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
  profile: RelationshipProfile;
}

export interface RelationshipProfile {
  warmth: number;
  conflict: number;
  rivalry: number;
  balance: number;
  pattern: RelationshipPattern;
  researchLabel: string;
  title: string;
  description: string;
}

function scoreDimension(dimension: RelationshipDimension, creator: Answers, sibling: Answers): number {
  const relevant = questions.filter((question) => question.dimension === dimension);
  const earned = relevant.reduce((total, question) => {
    const creatorScore = question.options.find((option) => option.id === creator[question.key])?.score ?? 0;
    const siblingScore = question.options.find((option) => option.id === sibling[question.key])?.score ?? 0;
    return total + creatorScore + siblingScore;
  }, 0);
  return Math.round((earned / (relevant.length * 6)) * 100);
}

export function relationshipProfile(creator: Answers, sibling: Answers): RelationshipProfile {
  const warmth = scoreDimension('warmth', creator, sibling);
  const conflict = scoreDimension('conflict', creator, sibling);
  const rivalry = scoreDimension('rivalry', creator, sibling);
  const balance = scoreDimension('balance', creator, sibling);
  if (warmth >= 60 && conflict < 50) return { warmth, conflict, rivalry, balance, pattern: 'harmonious', researchLabel: 'Harmonious pattern', title: 'Safe-Harbour Siblings', description: 'Warmth leads this bond. The teasing exists, but showing up matters more.' };
  if (warmth >= 60 && conflict >= 50) return { warmth, conflict, rivalry, balance, pattern: 'affect-intense', researchLabel: 'Affect-intense pattern', title: 'Firecracker Family', description: 'High warmth, high intensity. You can fight loudly and still arrive first.' };
  if (warmth < 60 && conflict >= 50) return { warmth, conflict, rivalry, balance, pattern: 'conflictual', researchLabel: 'Conflict-forward pattern', title: 'Courtroom Companions', description: 'The objections are strong. So is the shared archive that keeps the case alive.' };
  return { warmth, conflict, rivalry, balance, pattern: 'low-involved', researchLabel: 'Low-involved pattern', title: 'Independent Allies', description: 'Low drama, plenty of space—and a bond that does not need daily attendance.' };
}

export function computeResult(creator: Answers, sibling: Answers): GameResult {
  const agreements = questions.filter((q) => creator[q.key] === sibling[q.key]);
  const disputes = questions.filter((q) => creator[q.key] !== sibling[q.key]);
  const matches = agreements.length;
  const percent = Math.round((matches / questions.length) * 100);
  const profile = relationshipProfile(creator, sibling);

  if (matches >= 6) {
    return {
      matches,
      total: questions.length,
      percent,
      winner: 'sibling',
      verdict: profile.title,
      subline: profile.description,
      agreements: agreements.map((q) => q.key),
      disputes: disputes.map((q) => q.key),
      profile,
    };
  }
  if (matches >= 4) {
    return {
      matches,
      total: questions.length,
      percent,
      winner: 'both',
      verdict: profile.title,
      subline: profile.description,
      agreements: agreements.map((q) => q.key),
      disputes: disputes.map((q) => q.key),
      profile,
    };
  }
  return {
    matches,
    total: questions.length,
    percent,
    winner: 'creator',
    verdict: profile.title,
    subline: profile.description,
    agreements: agreements.map((q) => q.key),
    disputes: disputes.map((q) => q.key),
    profile,
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

export function displayAnswer(question: Question, answer: AnswerId, role: Role): string {
  const option = question.options.find((candidate) => candidate.id === answer);
  return option?.[role] ?? 'No answer';
}

export function getWinnerName(result: GameResult, creatorName: string, siblingName: string): string {
  if (result.winner === 'creator') return creatorName;
  if (result.winner === 'sibling') return siblingName;
  return `${creatorName} + ${siblingName}`;
}

export function savageVerdict(result: GameResult, creatorName: string, siblingName: string): string {
  if (result.profile?.pattern === 'harmonious') return `${creatorName} aur ${siblingName}: arguments limited edition, support lifetime warranty.`;
  if (result.profile?.pattern === 'affect-intense') return `${creatorName} aur ${siblingName} pyaar bhi full volume par karte hain aur ladai bhi.`;
  if (result.profile?.pattern === 'conflictual') return `${creatorName} aur ${siblingName} ke family case mein evidence kam, confidence unlimited hai.`;
  if (result.profile?.pattern === 'low-involved') return `${creatorName} aur ${siblingName}: low maintenance, permanent membership.`;
  if (result.matches >= 7) return `${creatorName} aur ${siblingName} ek hi brain cell share karte hain—and uski custody har Tuesday badalti hai.`;
  if (result.matches >= 5) return `Same ghar, same bachpan, aur family history ke do equally confident historians.`;
  if (result.matches >= 3) return `${creatorName} aur ${siblingName} ko events yaad hain. Facts par abhi bhi Family Court baithi hai.`;
  return `Har legendary sibling story ke do narrators hote hain. In dono ki kahaani full web-series material hai.`;
}

export function bondTitle(result: GameResult): string {
  if (result.profile?.title) return result.profile.title;
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
