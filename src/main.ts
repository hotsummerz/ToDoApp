import './style.css';
import { config } from './config';
import { init as initStore, subscribe, setFilter, setSortKey, toggleTask, deleteTask } from './store';
import { initForm, enterEditMode } from './ui/form';
import { renderStats, renderTaskList, renderFilterTabs } from './ui/render';
import { showConfirmDialog } from './ui/dialog';
import { showToast } from './ui/toast';
import { initReveal } from './ui/reveal';
import type { Filter, SortKey } from './types';

function qs<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el;
}

document.title = config.appName;

subscribe(() => {
  renderStats();
  renderTaskList();
  renderFilterTabs();
});

document.querySelector<HTMLDivElement>('.filter-tabs')!.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const btn = target.closest<HTMLButtonElement>('.filter-tab');
  if (btn) {
    const filter = btn.dataset.filter as Filter;
    setFilter(filter);
  }
});

qs<HTMLSelectElement>('#sort-select').addEventListener('change', (e) => {
  const sortKey = (e.target as HTMLSelectElement).value as SortKey;
  setSortKey(sortKey);
});

qs<HTMLUListElement>('#task-list').addEventListener('change', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('task-check')) {
    const card = target.closest<HTMLLIElement>('.task-card');
    if (card) {
      const id = card.dataset.id!;
      const task = card.classList.contains('is-done');
      toggleTask(id);
      showToast(task ? 'Tugas dikembalikan ke aktif.' : 'Tugas ditandai selesai.');
    }
  }
});

qs<HTMLUListElement>('#task-list').addEventListener('click', async (e) => {
  const target = e.target as HTMLElement;
  const btn = target.closest<HTMLButtonElement>('[data-action]');
  if (!btn) return;

  const card = btn.closest<HTMLLIElement>('.task-card');
  if (!card) return;

  const id = card.dataset.id!;
  const action = btn.dataset.action;

  if (action === 'edit') {
    enterEditMode(id);
  } else if (action === 'delete') {
    const titleEl = card.querySelector<HTMLParagraphElement>('.task-title');
    const title = titleEl?.textContent ?? 'tugas ini';
    const confirmed = await showConfirmDialog(title);
    if (confirmed) {
      deleteTask(id);
      showToast('Tugas dihapus.');
    }
  }
});

initStore();
initForm();
initReveal();
