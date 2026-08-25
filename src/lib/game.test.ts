import { describe, expect, it } from 'vitest';
import { computeResult, isAnswers, questions, relationshipProfile, type Answers } from './game';

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
    expect(result.subline).not.toMatch(/do you.*talk|weak|fail/i);
  });

  it('produces a research-inspired harmonious profile from high warmth and low conflict', () => {
    const answers = all('creator');
    const profile = relationshipProfile(answers, answers);
    expect(profile).toMatchObject({ pattern: 'harmonious', title: 'Safe-Harbour Siblings', warmth: 100, conflict: 0 });
  });

  it('keeps warmth and conflict independent for an affect-intense profile', () => {
    const warmAndIntense = all('creator');
    for (const question of questions) {
      if (question.dimension === 'conflict') warmAndIntense[question.key] = 'denied';
    }
    const profile = relationshipProfile(warmAndIntense, warmAndIntense);
    expect(profile).toMatchObject({ pattern: 'affect-intense', title: 'Firecracker Family', warmth: 100, conflict: 100 });
  });

  it('covers conflict-forward and low-involved patterns without negative judgments', () => {
    const conflictForward = all('denied');
    expect(relationshipProfile(conflictForward, conflictForward)).toMatchObject({ pattern: 'conflictual', title: 'Courtroom Companions' });
    const independent = all('denied');
    for (const question of questions) {
      if (question.dimension === 'conflict') independent[question.key] = 'creator';
    }
    expect(relationshipProfile(independent, independent)).toMatchObject({ pattern: 'low-involved', title: 'Independent Allies' });
  });
});
