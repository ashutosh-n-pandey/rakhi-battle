export type RecentBattleRole = 'creator' | 'sibling' | 'viewer';

export interface RecentBattle {
  id: string;
  name: string;
  role: RecentBattleRole;
  updatedAt: number;
}

const STORAGE_KEY = 'rb_recent_battles_v1';
const MAX_BATTLES = 8;

export function readRecentBattles(): RecentBattle[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is RecentBattle => {
      if (!item || typeof item !== 'object') return false;
      const row = item as Partial<RecentBattle>;
      return typeof row.id === 'string'
        && /^[a-f0-9]{24}$/.test(row.id)
        && typeof row.name === 'string'
        && ['creator', 'sibling', 'viewer'].includes(String(row.role))
        && typeof row.updatedAt === 'number';
    }).slice(0, MAX_BATTLES);
  } catch {
    return [];
  }
}

export function rememberBattle(battle: Omit<RecentBattle, 'updatedAt'>): void {
  try {
    const current = readRecentBattles();
    const existing = current.find((item) => item.id === battle.id);
    const role = existing?.role === 'creator' ? 'creator' : battle.role;
    const next = [
      { ...battle, role, name: battle.name.slice(0, 55), updatedAt: Date.now() },
      ...current.filter((item) => item.id !== battle.id),
    ].slice(0, MAX_BATTLES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Browser storage may be unavailable in private or restricted modes.
  }
}

export function forgetBattle(id: string): void {
  try {
    const next = readRecentBattles().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Nothing else is required when storage is unavailable.
  }
}
