export function calculateMortgage(
  homePrice: number,
  downPayment: number,
  annualRate: number,
  years: number
) {
  const loanAmount = homePrice - downPayment;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  if (monthlyRate === 0) {
    const monthly = loanAmount / numPayments;
    return {
      monthly,
      total: monthly * numPayments,
      totalInterest: 0,
      loanAmount,
      schedule: [],
    };
  }

  const monthly =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const total = monthly * numPayments;
  const totalInterest = total - loanAmount;

  const schedule: { year: number; principal: number; interest: number; balance: number }[] = [];
  let balance = loanAmount;

  for (let y = 1; y <= years; y++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthly - interestPayment;
      yearPrincipal += principalPayment;
      yearInterest += interestPayment;
      balance -= principalPayment;
    }
    schedule.push({
      year: y,
      principal: yearPrincipal,
      interest: yearInterest,
      balance: Math.max(0, balance),
    });
  }

  return { monthly, total, totalInterest, loanAmount, schedule };
}

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundsPerYear: number
) {
  const data: { year: number; balance: number }[] = [];
  for (let y = 0; y <= years; y++) {
    const balance =
      principal * Math.pow(1 + annualRate / 100 / compoundsPerYear, compoundsPerYear * y);
    data.push({ year: y, balance });
  }
  const finalAmount = data[years].balance;
  const totalInterest = finalAmount - principal;
  const totalGrowth = ((finalAmount - principal) / principal) * 100;
  return { finalAmount, totalInterest, totalGrowth, data };
}

export function calculateLoan(amount: number, annualRate: number, termMonths: number) {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) {
    const monthly = amount / termMonths;
    return { monthly, total: monthly * termMonths, totalInterest: 0 };
  }
  const monthly =
    (amount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  const total = monthly * termMonths;
  return { monthly, total, totalInterest: total - amount };
}

export function calculateBitcoinProfit(
  investment: number,
  buyPrice: number,
  sellPrice: number,
  feePct: number
) {
  const btcAmount = investment / buyPrice;
  const grossProfit = (sellPrice - buyPrice) * btcAmount;
  const saleValue = btcAmount * sellPrice;
  const fees = (investment + saleValue) * (feePct / 100);
  const netProfit = grossProfit - fees;
  const roi = (netProfit / investment) * 100;
  return { btcAmount, grossProfit, netProfit, roi };
}

export function calculateDCA(
  amountPerPeriod: number,
  periods: number,
  startPrice: number,
  endPrice: number
) {
  const priceStep = periods > 1 ? (endPrice - startPrice) / (periods - 1) : 0;
  let totalInvested = 0;
  let totalBtc = 0;
  const data: { period: number; value: number; invested: number }[] = [];

  for (let i = 0; i < periods; i++) {
    const price = startPrice + priceStep * i;
    const btcBought = amountPerPeriod / price;
    totalInvested += amountPerPeriod;
    totalBtc += btcBought;
    const currentPrice = startPrice + priceStep * i;
    const currentValue = totalBtc * currentPrice;
    data.push({ period: i + 1, value: currentValue, invested: totalInvested });
  }

  const finalValue = totalBtc * endPrice;
  const avgPrice = totalInvested / totalBtc;
  const totalReturn = ((finalValue - totalInvested) / totalInvested) * 100;
  return { totalInvested, finalValue, avgPrice, totalReturn, totalBtc, data };
}
