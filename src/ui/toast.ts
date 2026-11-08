function qs<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el;
}

const region = () => qs<HTMLDivElement>('#toast-region');

let currentToast: HTMLDivElement | null = null;
let timeout: number | null = null;

export function showToast(message: string): void {
  if (currentToast) {
    currentToast.remove();
    if (timeout !== null) clearTimeout(timeout);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  region().appendChild(toast);
  currentToast = toast;

  timeout = window.setTimeout(() => {
    toast.remove();
    currentToast = null;
    timeout = null;
  }, 3000);
}
