const form = document.querySelector('[data-application-form]');

if (form) {
  const status = form.querySelector('[data-status]');
  const submitEmail = form.querySelector('[data-send="email"]');
  const submitTelegram = form.querySelector('[data-send="telegram"]');
  const submitBoth = form.querySelector('[data-send="both"]');

  const readData = () => {
    const data = new FormData(form);
    return {
      fullName: (data.get('full_name') || '').toString().trim(),
      phone: (data.get('phone') || '').toString().trim(),
      email: (data.get('email') || '').toString().trim(),
      program: (data.get('program') || '').toString().trim(),
      message: (data.get('message') || '').toString().trim(),
    };
  };

  const validate = (payload) => {
    if (!payload.fullName || !payload.phone || !payload.program) {
      status.textContent = "Заповніть обов'язкові поля: ПІБ, телефон і програма.";
      status.style.color = '#b85708';
      return false;
    }

    status.textContent = '';
    return true;
  };

  const composeText = (payload) => {
    return [
      'Нова заявка до Dragonsky',
      `ПІБ: ${payload.fullName}`,
      `Телефон: ${payload.phone}`,
      `Email: ${payload.email || '-'}`,
      `Програма: ${payload.program}`,
      `Коментар: ${payload.message || '-'}`,
    ].join('\n');
  };

  const sendEmail = (payload) => {
    const subject = encodeURIComponent('Заявка на вступ до Dragonsky');
    const body = encodeURIComponent(composeText(payload));
    const target = form.dataset.mailTo || 'priem@dragonsky.edu.ua';
    window.location.href = `mailto:${target}?subject=${subject}&body=${body}`;
  };

  const sendTelegram = (payload) => {
    const text = encodeURIComponent(composeText(payload));
    const username = form.dataset.telegram || 'Dragonsky_Admission';
    window.open(`https://t.me/${username}?text=${text}`, '_blank', 'noopener');
  };

  submitEmail?.addEventListener('click', () => {
    const payload = readData();
    if (!validate(payload)) return;
    sendEmail(payload);
    status.textContent = 'Чернетку листа відкрито в поштовому клієнті.';
    status.style.color = '#1e8f4d';
  });

  submitTelegram?.addEventListener('click', () => {
    const payload = readData();
    if (!validate(payload)) return;
    sendTelegram(payload);
    status.textContent = 'Відкрито чат Telegram із заповненою заявкою.';
    status.style.color = '#1e8f4d';
  });

  submitBoth?.addEventListener('click', () => {
    const payload = readData();
    if (!validate(payload)) return;
    sendTelegram(payload);
    sendEmail(payload);
    status.textContent = 'Підготовлено відправлення в Telegram і на пошту.';
    status.style.color = '#1e8f4d';
  });
}

