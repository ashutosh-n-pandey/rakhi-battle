import { readRecentBattles, rememberBattle } from '../lib/recent';

interface ReuseResponse {
  id?: string;
  creator_name?: string;
  error?: string;
}

async function createSiblingBattle(sourceId: string, from: 'waiting' | 'result'): Promise<ReuseResponse> {
  const response = await fetch(`/api/challenges/${sourceId}/reuse`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ session_id: window.rakhiSession }),
  });
  const data = await response.json() as ReuseResponse;
  if (!response.ok || !data.id) throw new Error(data.error || 'Could not create another sibling battle.');

  rememberBattle({ id: data.id, name: data.creator_name || 'Rakhi Battle', role: 'creator' });
  window.rakhiTrack('multi_sibling_created', { from }, data.id);
  return data;
}

function enhanceWaitingPage() {
  const waiting = document.querySelector<HTMLElement>('[data-waiting]');
  if (!waiting?.dataset.id) return;
  const link = waiting.querySelector<HTMLAnchorElement>('.waiting-new-link');
  const status = waiting.querySelector<HTMLElement>('[data-wait-status]');
  if (!link) return;

  link.textContent = '+ Another sibling — reuse my 8 answers';
  link.setAttribute('aria-label', 'Create a private link for another sibling without answering again');

  let busy = false;
  link.addEventListener('click', async (event) => {
    if (busy) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    busy = true;
    const original = link.textContent;
    link.textContent = 'Creating sibling link…';
    link.setAttribute('aria-disabled', 'true');
    if (status) status.textContent = 'Reusing your same 8 answers for a new private battle…';

    try {
      const data = await createSiblingBattle(waiting.dataset.id!, 'waiting');
      location.href = `/waiting/${data.id}?fresh=1&multi=1`;
    } catch (error) {
      busy = false;
      link.textContent = original;
      link.removeAttribute('aria-disabled');
      if (status) status.textContent = error instanceof Error ? error.message : 'Please retry.';
    }
  });
}

function enhanceResultPage() {
  const result = document.querySelector<HTMLElement>('[data-result-game]');
  const id = result?.dataset.id;
  if (!result || !id) return;

  const isCreatorDevice = readRecentBattles().some((battle) => battle.id === id && battle.role === 'creator');
  if (!isCreatorDevice) return;

  const menu = result.querySelector<HTMLElement>('.final-game-menu');
  const freshStart = menu?.querySelector<HTMLAnchorElement>('a.btn.btn-primary[data-repeat]');
  if (!menu || !freshStart || menu.querySelector('[data-reuse-sibling]')) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn-gold btn-block';
  button.dataset.reuseSibling = '';
  button.textContent = 'Another sibling — reuse my 8 answers →';

  const status = document.createElement('p');
  status.className = 'status';
  status.dataset.reuseSiblingStatus = '';

  menu.insertBefore(button, freshStart);
  menu.insertBefore(status, freshStart);

  let busy = false;
  button.addEventListener('click', async () => {
    if (busy) return;
    busy = true;
    button.disabled = true;
    button.textContent = 'Creating sibling link…';
    status.textContent = 'Same answers, brand-new private battle.';

    try {
      const data = await createSiblingBattle(id, 'result');
      location.href = `/waiting/${data.id}?fresh=1&multi=1`;
    } catch (error) {
      busy = false;
      button.disabled = false;
      button.textContent = 'Another sibling — reuse my 8 answers →';
      status.textContent = error instanceof Error ? error.message : 'Please retry.';
    }
  });
}

enhanceWaitingPage();
enhanceResultPage();
