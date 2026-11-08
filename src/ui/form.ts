import type { Task, Priority } from '../types';
import { getState, addTask, updateTask, setEditing } from '../store';
import { showToast } from './toast';

function qs<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el;
}

const form = () => qs<HTMLFormElement>('#task-form');
const formTitle = () => qs<HTMLHeadingElement>('#form-title');
const submitBtn = () => form().querySelector<HTMLButtonElement>('button[type="submit"]')!;
const cancelBtn = () => qs<HTMLButtonElement>('#cancel-edit');

const titleInput = () => qs<HTMLInputElement>('#task-title');
const courseInput = () => qs<HTMLInputElement>('#task-course');
const deadlineInput = () => qs<HTMLInputElement>('#task-deadline');
const priorityInput = () => qs<HTMLSelectElement>('#task-priority');
const notesInput = () => qs<HTMLTextAreaElement>('#task-notes');

const titleError = () => qs<HTMLParagraphElement>('#task-title-error');

function clearValidation(): void {
  titleInput().removeAttribute('aria-invalid');
  titleError().hidden = true;
  titleError().textContent = '';
}

function showError(message: string): void {
  titleInput().setAttribute('aria-invalid', 'true');
  titleError().textContent = message;
  titleError().hidden = false;
  titleInput().focus();
}

function validateTitle(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Judul tugas wajib diisi.';
  if (trimmed.length > 120) return 'Judul tugas maksimal 120 karakter.';
  return null;
}

function resetForm(): void {
  form().reset();
  clearValidation();
  setEditing(null);
  formTitle().textContent = 'Tambah Tugas';
  submitBtn().textContent = 'Tambah Tugas';
  cancelBtn().hidden = true;
}

function loadTaskIntoForm(task: Task): void {
  titleInput().value = task.title;
  courseInput().value = task.course;
  deadlineInput().value = task.deadline ?? '';
  priorityInput().value = task.priority;
  notesInput().value = task.notes;

  setEditing(task.id);
  formTitle().textContent = 'Ubah Tugas';
  submitBtn().textContent = 'Simpan Perubahan';
  cancelBtn().hidden = false;

  form().scrollIntoView({ behavior: 'smooth', block: 'start' });
  titleInput().focus();
}

export function initForm(): void {
  form().addEventListener('submit', (e) => {
    e.preventDefault();
    clearValidation();

    const title = titleInput().value;
    const error = validateTitle(title);
    if (error) {
      showError(error);
      return;
    }

    const trimmedTitle = title.trim();
    const course = courseInput().value.trim().slice(0, 80);
    const deadline = deadlineInput().value || null;
    const priority = priorityInput().value as Priority;
    const notes = notesInput().value.trim().slice(0, 500);

    const { editingId } = getState();

    if (editingId) {
      updateTask(editingId, { title: trimmedTitle, course, deadline, priority, notes });
      showToast('Perubahan disimpan.');
      resetForm();
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        course,
        deadline,
        priority,
        notes,
        completed: false,
        createdAt: Date.now(),
        completedAt: null,
      };
      addTask(newTask);
      showToast('Tugas ditambahkan.');
      resetForm();
    }
  });

  cancelBtn().addEventListener('click', () => {
    resetForm();
  });
}

export function enterEditMode(taskId: string): void {
  const { tasks } = getState();
  const task = tasks.find(t => t.id === taskId);
  if (task) loadTaskIntoForm(task);
}
