import type { Task, Priority, TaskStatusLabel } from '../types';
import { icons } from './icons';
import { formatDeadline } from '../utils/date';
import { filterTasks, sortTasks } from '../utils/sort';
import { getState } from '../store';

function qs<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el;
}

const statsContainer = () => qs<HTMLDivElement>('#stats');
const taskList = () => qs<HTMLUListElement>('#task-list');
const emptyStateContainer = () => qs<HTMLDivElement>('#empty-state');

function getTaskStatus(task: Task): TaskStatusLabel {
  // TS concept: type alias + union types
  return task.completed ? 'Selesai' : 'Belum Selesai';
}

function getPriorityBadgeClass(priority: Priority): string {
  if (priority === 'high') return 'badge-danger';
  if (priority === 'medium') return 'badge-warning';
  return 'badge-neutral';
}

function getPriorityLabel(priority: Priority): string {
  if (priority === 'high') return 'Tinggi';
  if (priority === 'medium') return 'Sedang';
  return 'Rendah';
}

export function renderStats(): void {
  const { tasks } = getState();
  const total = tasks.length;
  const active = tasks.filter(t => !t.completed).length;
  const done = tasks.filter(t => t.completed).length;

  statsContainer().innerHTML = `
    <article class="bento-card stat-card">
      <span class="stat-label">Total</span>
      <span class="stat-value">${total}</span>
    </article>
    <article class="bento-card stat-card">
      <span class="stat-label">Aktif</span>
      <span class="stat-value">${active}</span>
    </article>
    <article class="bento-card stat-card">
      <span class="stat-label">Selesai</span>
      <span class="stat-value">${done}</span>
    </article>
  `;
}

function renderTaskCard(task: Task): string {
  const statusLabel = getTaskStatus(task);
  const statusBadgeClass = task.completed ? 'badge-success' : 'badge-neutral';
  const doneClass = task.completed ? ' is-done' : '';

  const deadlineInfo = formatDeadline(task.deadline);
  let deadlineHtml = '';
  if (deadlineInfo && !task.completed) {
    const urgencyClass = deadlineInfo.urgency === 'overdue' ? ' is-overdue' : deadlineInfo.urgency === 'soon' ? ' is-soon' : '';
    deadlineHtml = `<span class="task-deadline${urgencyClass}">${icons.clock} ${deadlineInfo.text}</span>`;
  } else if (deadlineInfo && task.completed) {
    deadlineHtml = `<span class="task-deadline">${icons.clock} ${deadlineInfo.text.split(' · ')[0]}</span>`;
  }

  const courseBadge = task.course ? `<span class="badge badge-blue">${task.course}</span>` : '';
  const priorityBadge = `<span class="badge ${getPriorityBadgeClass(task.priority)}">${getPriorityLabel(task.priority)}</span>`;
  const notesHtml = task.notes ? `<p class="task-notes">${task.notes}</p>` : '';

  return `
    <li class="bento-card task-card${doneClass}" data-id="${task.id}">
      <input type="checkbox" class="task-check" ${task.completed ? 'checked' : ''} aria-label="Tandai selesai: ${task.title}">
      <div class="task-body">
        <p class="task-title">${task.title}</p>
        <div class="task-meta">
          <span class="badge ${statusBadgeClass}">${statusLabel}</span>
          ${courseBadge}
          ${priorityBadge}
          ${deadlineHtml}
        </div>
        ${notesHtml}
      </div>
      <div class="task-actions">
        <button type="button" class="btn-icon" data-action="edit" aria-label="Ubah tugas: ${task.title}">${icons.edit}</button>
        <button type="button" class="btn-icon is-danger" data-action="delete" aria-label="Hapus tugas: ${task.title}">${icons.trash}</button>
      </div>
    </li>
  `;
}

function getEmptyStateMessage(filter: string, hasAnyTasks: boolean): { title: string; message: string } {
  if (!hasAnyTasks) {
    return { title: 'Belum ada tugas', message: 'Tambahkan tugas pertamamu lewat formulir di atas.' };
  }
  if (filter === 'pending') {
    return { title: 'Tidak ada tugas aktif', message: 'Semua tugas sudah selesai. Kerja bagus!' };
  }
  if (filter === 'done') {
    return { title: 'Belum ada tugas yang selesai', message: 'Centang tugas yang sudah kamu kerjakan.' };
  }
  return { title: 'Tidak ada tugas', message: '' };
}

export function renderTaskList(): void {
  const { tasks, filter, sortKey } = getState();

  const filtered = filterTasks(tasks, filter);
  const sorted = sortTasks(filtered, sortKey);

  const listEl = taskList();
  const emptyEl = emptyStateContainer();

  if (sorted.length === 0) {
    listEl.innerHTML = '';
    listEl.hidden = true;
    const { title, message } = getEmptyStateMessage(filter, tasks.length > 0);
    emptyEl.innerHTML = `
      <div class="empty-state">
        <h3>${title}</h3>
        <p>${message}</p>
      </div>
    `;
    emptyEl.hidden = false;
  } else {
    emptyEl.innerHTML = '';
    emptyEl.hidden = true;
    listEl.innerHTML = sorted.map(task => renderTaskCard(task)).join('');
    listEl.hidden = false;
  }
}

export function renderFilterTabs(): void {
  const { tasks, filter } = getState();
  const total = tasks.length;
  const active = tasks.filter(t => !t.completed).length;
  const done = tasks.filter(t => t.completed).length;

  const tabs = document.querySelectorAll<HTMLButtonElement>('.filter-tab');
  tabs.forEach(tab => {
    const tabFilter = tab.dataset.filter;
    const isPressed = tabFilter === filter;
    tab.setAttribute('aria-pressed', String(isPressed));

    const countSpan = tab.querySelector<HTMLSpanElement>('.tab-count');
    if (countSpan) {
      if (tabFilter === 'all') countSpan.textContent = String(total);
      else if (tabFilter === 'pending') countSpan.textContent = String(active);
      else if (tabFilter === 'done') countSpan.textContent = String(done);
    }
  });
}
