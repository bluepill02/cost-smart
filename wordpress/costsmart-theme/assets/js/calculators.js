(function () {
  function money(value) {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Number.isFinite(value) ? value : 0);
  }

  function calculate(container) {
    const amount = Number(container.querySelector('[data-cs-field="amount"]')?.value || 0);
    const rate = Number(container.querySelector('[data-cs-field="rate"]')?.value || 0);
    const years = Number(container.querySelector('[data-cs-field="years"]')?.value || 0);
    const type = container.dataset.costsmartCalculator || '';
    const result = container.querySelector('[data-cs-result]');
    if (!result) return;

    if (type.includes('emi') || type.includes('loan')) {
      const months = Math.max(years * 12, 1);
      const monthlyRate = rate / 100 / 12;
      const emi = monthlyRate === 0 ? amount / months : amount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
      result.textContent = `Estimated monthly EMI: ${money(emi)} · Total interest: ${money((emi * months) - amount)}`;
      return;
    }

    if (type.includes('sip') || type.includes('investment') || type.includes('retirement')) {
      const months = Math.max(years * 12, 1);
      const monthlyRate = rate / 100 / 12;
      const futureValue = monthlyRate === 0 ? amount * months : amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      result.textContent = `Estimated future value: ${money(futureValue)} after ${years} years.`;
      return;
    }

    if (type.includes('gst') || type.includes('tax') || type.includes('tds')) {
      const tax = amount * rate / 100;
      result.textContent = `Estimated tax: ${money(tax)} · Total including tax: ${money(amount + tax)}`;
      return;
    }

    const simpleInterest = amount * rate * years / 100;
    result.textContent = `Estimated value: ${money(amount + simpleInterest)} · Gain/charge: ${money(simpleInterest)}`;
  }

  document.querySelectorAll('[data-costsmart-calculator]').forEach((container) => {
    container.addEventListener('input', () => calculate(container));
    calculate(container);
  });
}());
