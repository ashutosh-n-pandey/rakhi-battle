import { describe, expect, it } from 'vitest';
import { computeResult, isAnswers, questions, type Answers } from './game';

const all = (answer: Answers[string]): Answers => Object.fromEntries(questions.map((q) => [q.key, answer]));

describe('Rakhi Battle scoring', () => {
  it('awards the sibling a perfect match', () => {
    const result = computeResult(all('creator'), all('creator'));
    expect(result).toMatchObject({ matches: 8, percent: 100, winner: 'sibling' });
  });

  it('awards the creator on a low match', () => {
    const result = computeResult(all('creator'), all('sibling'));
    expect(result).toMatchObject({ matches: 0, percent: 0, winner: 'creator' });
  });

  it('returns a joint verdict at four matches', () => {
    const creator = all('creator');
    const sibling = all('sibling');
    questions.slice(0, 4).forEach((q) => { sibling[q.key] = 'creator'; });
    expect(computeResult(creator, sibling)).toMatchObject({ matches: 4, percent: 50, winner: 'both' });
  });

  it('rejects incomplete and unknown answers', () => {
    expect(isAnswers({ mummy: 'creator' })).toBe(false);
    expect(isAnswers({ ...all('creator'), mummy: 'hacker' })).toBe(false);
    expect(isAnswers(all('both'))).toBe(true);
  });

  it('keeps a zero-match result affectionate', () => {
    const result = computeResult(all('creator'), all('sibling'));
    expect(result.verdict).toBe('Two stories, one unbreakable team');
    expect(result.subline).not.toMatch(/do you.*talk|weak|fail/i);
  });
});
