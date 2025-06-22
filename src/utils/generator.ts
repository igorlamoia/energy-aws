export function generateCPF(format = false): string {
  const getRandomDigit = () => Math.floor(Math.random() * 10);

  const baseDigits = Array.from({ length: 9 }, getRandomDigit);

  const calcCheckDigit = (digits: number[], factor: number): number => {
    const sum = digits.reduce((acc, digit) => acc + digit * factor--, 0);
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const digit1 = calcCheckDigit(baseDigits, 10);
  const digit2 = calcCheckDigit([...baseDigits, digit1], 11);

  const fullCpf = [...baseDigits, digit1, digit2].join('');

  if (!format) return fullCpf;

  return fullCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
