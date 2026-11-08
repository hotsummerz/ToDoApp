function qs<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el;
}

const dialog = () => qs<HTMLDialogElement>('#confirm-dialog');
const confirmText = () => qs<HTMLParagraphElement>('#confirm-text');

export function showConfirmDialog(taskTitle: string): Promise<boolean> {
  return new Promise((resolve) => {
    const dlg = dialog();
    confirmText().textContent = `Tugas "${taskTitle}" akan dihapus permanen.`;

    const handleClose = () => {
      const result = dlg.returnValue === 'confirm';
      dlg.removeEventListener('close', handleClose);
      resolve(result);
    };

    dlg.addEventListener('close', handleClose);
    dlg.showModal();
  });
}
