(async () => {
  const list = document.querySelector('[data-documents-list]');
  if (!list) return;

  try {
    const res = await fetch('data/documents.json', { cache: 'no-store' });
    if (!res.ok) return;

    const docs = await res.json();
    if (!Array.isArray(docs)) return;

    list.innerHTML = docs
      .map((doc) => {
        const title = doc.title || 'Документ';
        const file = doc.file || '#';
        const ext = doc.ext || '';
        const updated = doc.updated || '';
        return `<li><a href="${file}" download>${title}</a> (${ext}${updated ? `, оновлено ${updated}` : ''})</li>`;
      })
      .join('');
  } catch (_) {
    // Keep fallback HTML list when JSON is unavailable.
  }
})();
