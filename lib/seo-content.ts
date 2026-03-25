const BASE = 'https://calcfi.io';

// ─── SCHEMAS ────────────────────────────────────────────────────────────────

export function webAppSchema(locale: string, tool: string, name: string, description: string, features: string[], isAI = false) {
  return {
    '@context': 'https://schema.org',
    '@type': isAI ? 'SoftwareApplication' : 'WebApplication',
    name,
    url: `${BASE}/${locale}/${tool}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    availableLanguage: ['en', 'es'],
    description,
    featureList: features,
    ...(isAI ? { applicationSubCategory: 'AIApplication' } : {}),
  };
}

export function breadcrumbSchema(locale: string, tool: string, toolName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/${locale}` },
      { '@type': 'ListItem', position: 2, name: toolName, item: `${BASE}/${locale}/${tool}` },
    ],
  };
}

export function howToSchema(name: string, steps: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.map((text) => ({ '@type': 'HowToStep', text })),
  };
}

// ─── CONTENT DATA ────────────────────────────────────────────────────────────

interface ToolContent {
  faqs: { q: string; a: string }[];
  faqTitle: string;
  aboutTitle: string;
  aboutBody: string[];
  howToName: string;
  howToSteps: string[];
  appName: string;
  appDescription: string;
  appFeatures: string[];
  relatedTitle: string;
}

type Locale = 'en' | 'es';
type Tool = 'mortgage' | 'compound-interest' | 'loan' | 'bitcoin-profit' | 'dca' | 'financial-advisor';

export const seoContent: Record<Locale, Record<Tool, ToolContent>> = {
  en: {
    mortgage: {
      appName: 'Mortgage Calculator — CalcFi',
      appDescription: 'Free mortgage calculator. Calculate monthly payments, total interest and amortization schedule for any home loan.',
      appFeatures: ['Monthly payment calculation', 'Total interest cost', 'Amortization schedule chart', 'Down payment support'],
      howToName: 'How to use the Mortgage Calculator',
      howToSteps: ['Enter the total home price', 'Enter your down payment amount', 'Set the annual interest rate', 'Choose the loan term in years', 'Click Calculate to see results'],
      faqTitle: 'Mortgage Calculator — FAQ',
      faqs: [
        { q: 'How is the monthly mortgage payment calculated?', a: 'Monthly payments are calculated using the PMT formula: M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12), and n is the number of monthly payments (years × 12).' },
        { q: 'What is included in a mortgage payment?', a: 'This calculator computes principal and interest (P&I) only. Your actual monthly payment may also include property taxes, homeowner\'s insurance, and PMI if your down payment is less than 20%.' },
        { q: 'How much down payment do I need?', a: 'Conventional loans typically require 5–20% down. FHA loans allow 3.5%. A larger down payment reduces your loan amount, monthly payment, and total interest paid.' },
        { q: 'What is an amortization schedule?', a: 'An amortization schedule shows how each payment is split between principal and interest over the life of the loan. Early payments are mostly interest; later payments are mostly principal.' },
        { q: 'How can I reduce my total interest paid?', a: 'You can reduce total interest by making a larger down payment, choosing a shorter loan term, or making extra principal payments. Even one extra payment per year can save thousands in interest.' },
      ],
      aboutTitle: 'About the Mortgage Calculator',
      aboutBody: [
        'The CalcFi mortgage calculator is a free tool that helps homebuyers and homeowners calculate their exact monthly mortgage payments, total interest cost, and view a complete amortization schedule. It uses the standard PMT formula trusted by banks and financial institutions worldwide.',
        'To use the calculator, simply enter the home price, your down payment, the annual interest rate offered by your lender, and the loan term. The calculator instantly shows your monthly payment broken down by principal and interest, plus the total cost of the loan over its lifetime.',
        'For example, a $400,000 home with a 20% down payment ($80,000), a 6.5% interest rate, and a 30-year term results in a monthly payment of approximately $2,023. Over 30 years, you\'ll pay roughly $728,000 total — meaning $408,000 in interest on top of the $320,000 loan.',
        'Use this calculator when comparing mortgage offers from different lenders, deciding on a loan term (15 vs 30 years), or evaluating how a larger down payment affects your monthly budget. All calculations happen instantly in your browser — no data is sent to any server.',
      ],
      relatedTitle: 'Related Tools',
    },
    'compound-interest': {
      appName: 'Compound Interest Calculator — CalcFi',
      appDescription: 'Free compound interest calculator. See how your investment grows over time with daily, monthly, or annual compounding.',
      appFeatures: ['Compound interest calculation', 'Multiple compounding frequencies', 'Growth chart visualization', 'Final balance and interest earned'],
      howToName: 'How to use the Compound Interest Calculator',
      howToSteps: ['Enter your initial investment (principal)', 'Set the annual interest rate or expected return', 'Choose the investment period in years', 'Select compounding frequency (monthly is most common)', 'Click Calculate to see your investment growth'],
      faqTitle: 'Compound Interest — FAQ',
      faqs: [
        { q: 'What is compound interest?', a: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest (which only applies to the principal), compound interest grows exponentially — it\'s what Einstein reportedly called "the eighth wonder of the world."' },
        { q: 'What is the compound interest formula?', a: 'A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate (as a decimal), n is the number of times interest compounds per year, and t is the number of years.' },
        { q: 'How often does interest compound?', a: 'It depends on the account or investment. Savings accounts often compound daily or monthly. Bonds may compound semi-annually. Investment returns are typically modeled annually. More frequent compounding leads to slightly higher returns.' },
        { q: 'What is the Rule of 72?', a: 'The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by the annual interest rate. For example, at 8% annual return, your money doubles in approximately 72 ÷ 8 = 9 years.' },
        { q: 'What is a realistic annual return for investments?', a: 'Historically, the S&P 500 has returned approximately 10% annually (7% after inflation). High-yield savings accounts currently offer 4–5%. CDs offer 4–5.5%. Crypto assets have higher potential returns but much higher volatility.' },
      ],
      aboutTitle: 'About the Compound Interest Calculator',
      aboutBody: [
        'The CalcFi compound interest calculator shows you exactly how investments grow over time using the power of compounding. Whether you\'re planning for retirement, saving for a down payment, or building long-term wealth, this tool reveals the true potential of consistent investing.',
        'Enter your starting investment, the expected annual return, how many years you plan to invest, and how often interest compounds. The calculator shows your final balance, total interest earned, and displays a clear growth chart so you can visualize your wealth building over time.',
        'Example: $10,000 invested at 7% annual return, compounded monthly for 30 years, grows to $81,165. That\'s $71,165 in interest on a $10,000 investment — the power of compound interest working over three decades.',
        'This calculator is ideal for modeling retirement savings, comparing savings accounts with different compounding frequencies, or simply understanding why starting to invest early makes such a dramatic difference. A 25-year-old investing $10,000 ends up with far more at 65 than a 35-year-old investing the same amount.',
      ],
      relatedTitle: 'Related Tools',
    },
    loan: {
      appName: 'Loan Calculator — CalcFi',
      appDescription: 'Free loan calculator for personal loans and auto loans. Calculate monthly payments, total cost and interest for any loan amount and term.',
      appFeatures: ['Monthly payment calculation', 'Total loan cost', 'Total interest paid', 'Supports any loan type'],
      howToName: 'How to use the Loan Calculator',
      howToSteps: ['Enter the total loan amount', 'Enter the annual interest rate from your lender', 'Enter the loan term in months', 'Click Calculate to see your monthly payment and total cost'],
      faqTitle: 'Loan Calculator — FAQ',
      faqs: [
        { q: 'How is a loan payment calculated?', a: 'Loan payments use the same PMT formula as mortgages: M = P × [r(1+r)^n] / [(1+r)^n − 1]. P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments.' },
        { q: 'What is APR vs interest rate?', a: 'The interest rate is the base cost of borrowing. APR (Annual Percentage Rate) includes the interest rate plus other fees (origination fees, closing costs). APR gives a more accurate picture of the true cost of a loan.' },
        { q: 'What is a good interest rate for a personal loan?', a: 'Personal loan rates typically range from 6% to 36% depending on your credit score. Borrowers with excellent credit (740+) may qualify for rates below 10%. Average rates as of 2026 are around 11–12%.' },
        { q: 'Should I choose a shorter or longer loan term?', a: 'Shorter terms mean higher monthly payments but less total interest paid. Longer terms mean lower monthly payments but significantly more interest over the life of the loan. Choose based on what fits your monthly budget while minimizing total cost.' },
        { q: 'Can I pay off a loan early?', a: 'Most personal loans allow early payoff, and it saves significant interest. However, some loans have prepayment penalties — always check your loan agreement. Even paying a small extra amount monthly can cut months off your loan.' },
      ],
      aboutTitle: 'About the Loan Calculator',
      aboutBody: [
        'The CalcFi loan calculator helps you determine the true cost of any personal loan, auto loan, or installment debt. Enter the loan amount, interest rate, and term to instantly see your monthly payment and total repayment cost.',
        'Understanding your loan before signing is critical. A $15,000 car loan at 7% for 60 months costs $2,783 in interest, giving a monthly payment of $297. The same loan at 12% costs $4,980 in interest — nearly $2,200 more. This calculator makes those comparisons instant.',
        'Use this tool to compare offers from multiple lenders, evaluate 36 vs 48 vs 60-month terms, or decide how much you can comfortably borrow based on your monthly budget. The calculator works for personal loans, auto loans, student loans, and any fixed-rate installment debt.',
        'All calculations follow the standard amortization formula used by banks globally. Results are instant and no personal information is required.',
      ],
      relatedTitle: 'Related Tools',
    },
    'bitcoin-profit': {
      appName: 'Bitcoin Profit Calculator — CalcFi',
      appDescription: 'Free Bitcoin profit calculator. Calculate your crypto trading profit, loss, and ROI from any Bitcoin or crypto trade instantly.',
      appFeatures: ['Profit and loss calculation', 'ROI percentage', 'Fee-adjusted net profit', 'BTC amount calculation'],
      howToName: 'How to use the Bitcoin Profit Calculator',
      howToSteps: ['Enter the amount you invested in USD', 'Enter the Bitcoin price when you bought', 'Enter the Bitcoin price when you sold (or target sell price)', 'Enter trading fees percentage (typically 0.1–0.5%)', 'Click Calculate to see your profit or loss'],
      faqTitle: 'Bitcoin Profit Calculator — FAQ',
      faqs: [
        { q: 'How is Bitcoin profit calculated?', a: 'Profit is calculated as: (Sell Price − Buy Price) × BTC Amount − Fees. Your BTC amount is Investment ÷ Buy Price. Net profit subtracts the trading fees from both the buy and sell transactions.' },
        { q: 'What are typical crypto trading fees?', a: 'Major exchanges charge 0.1–0.5% per trade. Coinbase charges up to 1.49%. Binance charges 0.1% (or 0.075% with BNB). DEX trades may include additional gas fees. Always factor fees into your profit calculations.' },
        { q: 'What is ROI in crypto trading?', a: 'ROI (Return on Investment) = (Net Profit ÷ Initial Investment) × 100. A 50% ROI means your investment grew by half. A −20% ROI means you lost 20% of your investment. ROI helps compare performance across different trade sizes.' },
        { q: 'How do taxes affect Bitcoin profits?', a: 'In most countries, Bitcoin profits are subject to capital gains tax. Short-term gains (held less than 1 year) are typically taxed at higher income tax rates. Long-term gains often have reduced rates. Always consult a tax professional.' },
        { q: 'What is the break-even price?', a: 'Your break-even price is the sell price at which you neither profit nor lose money, accounting for fees. If you bought BTC at $30,000 and paid 0.5% fees, your break-even sell price is approximately $30,302.' },
      ],
      aboutTitle: 'About the Bitcoin Profit Calculator',
      aboutBody: [
        'The CalcFi Bitcoin profit calculator lets traders quickly determine the profit or loss on any cryptocurrency trade. Enter your investment amount, buy and sell prices, and trading fees to instantly see gross profit, net profit, and ROI percentage.',
        'Crypto trading can be complex when factoring in fees on both sides of a trade. For example, if you invested $1,000 to buy Bitcoin at $30,000, you received 0.0333 BTC. If you sell at $50,000 with 0.5% fees, your gross profit is $666.67, but after fees on both transactions, your net profit is approximately $631.',
        'This calculator is useful for planning exit strategies, evaluating whether a trade was profitable after fees, or comparing different entry and exit price scenarios. Use it alongside the DCA Calculator if you\'re buying Bitcoin in regular intervals.',
        'Note: This calculator is for educational purposes and assumes a single buy and sell transaction. It does not account for taxes, staking rewards, or complex trading strategies.',
      ],
      relatedTitle: 'Related Tools',
    },
    dca: {
      appName: 'DCA Calculator — CalcFi',
      appDescription: 'Free DCA (Dollar Cost Averaging) calculator for crypto. Calculate your average cost basis, total return and portfolio performance from periodic investments.',
      appFeatures: ['Average cost basis calculation', 'Total portfolio value', 'Total return percentage', 'Investment vs value chart'],
      howToName: 'How to use the DCA Calculator',
      howToSteps: ['Enter your investment amount per period (e.g. $100/month)', 'Enter the number of periods you invested', 'Enter the starting price of Bitcoin (first purchase)', 'Enter the ending price of Bitcoin (current or target price)', 'Click Calculate to see your DCA performance'],
      faqTitle: 'DCA Calculator — FAQ',
      faqs: [
        { q: 'What is Dollar Cost Averaging (DCA)?', a: 'Dollar Cost Averaging is an investment strategy where you invest a fixed amount at regular intervals (weekly, monthly) regardless of price. When prices are low, you buy more; when high, you buy less. Over time, this averages out your cost basis and reduces the impact of volatility.' },
        { q: 'Why is DCA effective for crypto?', a: 'Crypto markets are highly volatile. Trying to time the market is extremely difficult even for professionals. DCA removes the emotional and timing pressure — you invest consistently and benefit from both price dips and long-term growth trends without trying to predict short-term movements.' },
        { q: 'How is the average purchase price calculated?', a: 'Average cost basis = Total Amount Invested ÷ Total BTC Purchased. Because you buy more BTC when prices are low and less when prices are high, your average cost is typically lower than the arithmetic average of all the prices during your investment period.' },
        { q: 'What is the difference between DCA and lump-sum investing?', a: 'Lump-sum investing (investing all at once) outperforms DCA about 2/3 of the time in rising markets, because capital is deployed sooner. However, DCA outperforms in declining or volatile markets and significantly reduces the risk of investing everything at a peak.' },
        { q: 'How often should I DCA into crypto?', a: 'Common DCA frequencies are weekly or monthly. Weekly DCA captures more price variance and typically produces a lower average cost, but monthly DCA is simpler and reduces transaction fees. The most important factor is consistency — stick to your schedule regardless of market news.' },
      ],
      aboutTitle: 'About the DCA Calculator',
      aboutBody: [
        'The CalcFi DCA calculator helps you model and understand the results of a Dollar Cost Averaging strategy in Bitcoin or any cryptocurrency. By investing a fixed amount at regular intervals, investors reduce the impact of market volatility and build positions systematically over time.',
        'Enter the amount you invest each period, the number of periods, and the starting and ending Bitcoin prices. The calculator shows your total invested, final portfolio value, average cost basis, and total return — along with a chart comparing your portfolio value against total invested over time.',
        'Example: Investing $100/month in Bitcoin for 24 months, with Bitcoin starting at $20,000 and ending at $50,000, results in $2,400 total invested. Because you buy more BTC when prices are low, your average cost might be around $32,000, and your final portfolio value would be approximately $4,200 — a 75% total return.',
        'Use this calculator to plan your DCA strategy, evaluate past performance, or compare different investment amounts and frequencies. The DCA strategy is widely recommended by financial educators for long-term crypto accumulation.',
      ],
      relatedTitle: 'Related Tools',
    },
    'financial-advisor': {
      appName: 'Financial Advisor AI — CalcFi',
      appDescription: 'Free AI financial advisor powered by Claude AI. Get instant, personalized answers to your financial questions about mortgages, investments, crypto and more.',
      appFeatures: ['AI-powered financial guidance', 'Bilingual (English and Spanish)', 'Instant responses', 'Covers mortgages, loans, investing, crypto'],
      howToName: 'How to use the Financial Advisor AI',
      howToSteps: ['Type your financial question in the chat box', 'Be specific for better answers (e.g. "Should I choose a 15 or 30-year mortgage?")', 'Press Enter or click Send', 'Read the AI response and ask follow-up questions', 'Use other CalcFi calculators to run the actual numbers'],
      faqTitle: 'Financial Advisor AI — FAQ',
      faqs: [
        { q: 'What can the AI financial advisor help with?', a: 'The AI can answer questions about mortgages, compound interest, personal loans, Bitcoin and crypto investing, DCA strategies, retirement planning concepts, budgeting basics, and general personal finance. It works in both English and Spanish.' },
        { q: 'Is the AI advice personalized?', a: 'The AI provides educational guidance based on your questions. It is not a licensed financial advisor and does not have access to your personal financial data, accounts, or tax situation. For personalized licensed advice, consult a Certified Financial Planner (CFP).' },
        { q: 'Is my conversation data private?', a: 'Conversations are processed through the Anthropic Claude API. No conversation history is stored on CalcFi servers. Each session starts fresh. Do not share sensitive personal information like account numbers or social security numbers.' },
        { q: 'Can the AI make investment decisions for me?', a: 'No. The AI provides educational information only. All investment decisions should be made based on your own research, risk tolerance, and ideally with guidance from a licensed financial professional. Past performance does not guarantee future results.' },
        { q: 'Is the Financial Advisor AI free to use?', a: 'Yes, completely free. No registration, no credit card, no usage limits on CalcFi. The AI is powered by Anthropic\'s Claude model and available in both English and Spanish.' },
      ],
      aboutTitle: 'About the Financial Advisor AI',
      aboutBody: [
        'The CalcFi Financial Advisor AI is a conversational tool powered by Anthropic\'s Claude AI model. It provides instant, educational answers to your financial questions in plain language — no financial jargon, no sales pitches, no registration required.',
        'Ask it anything: "How much house can I afford?", "Is DCA better than lump-sum investing?", "What\'s the difference between a Roth IRA and a 401k?", "How should I think about paying off debt vs investing?" The AI responds thoughtfully and concisely, always reminding you that it\'s for educational purposes only.',
        'The AI works best when used alongside CalcFi\'s calculators. Use the AI to understand concepts and strategy, then use the specific calculators to run the actual numbers for your situation. For example, ask the AI "what loan term should I choose?" and then use the Loan Calculator to compare 36 vs 60 month payments.',
        'This tool is available in both English and Spanish. Simply write your question in your preferred language and the AI will respond accordingly.',
      ],
      relatedTitle: 'Related Tools',
    },
  },
  es: {
    mortgage: {
      appName: 'Calculadora de Hipoteca — CalcFi',
      appDescription: 'Calculadora de hipoteca gratuita. Calcula cuota mensual, intereses totales y plan de amortización completo.',
      appFeatures: ['Cálculo de cuota mensual', 'Intereses totales', 'Tabla de amortización', 'Entrada incluida'],
      howToName: 'Cómo usar la Calculadora de Hipoteca',
      howToSteps: ['Introduce el precio total de la vivienda', 'Introduce el importe de la entrada o pago inicial', 'Establece el tipo de interés anual', 'Elige el plazo del préstamo en años', 'Haz clic en Calcular para ver los resultados'],
      faqTitle: 'Calculadora de Hipoteca — Preguntas Frecuentes',
      faqs: [
        { q: '¿Cómo se calcula la cuota mensual de una hipoteca?', a: 'La cuota mensual se calcula con la fórmula PMT: M = P × [r(1+r)^n] / [(1+r)^n − 1], donde P es el capital prestado, r es el tipo de interés mensual (tipo anual ÷ 12) y n es el número total de cuotas (años × 12).' },
        { q: '¿Qué incluye la cuota hipotecaria?', a: 'Esta calculadora calcula únicamente el capital e intereses. Tu cuota real puede incluir también el seguro de hogar, el seguro de vida vinculado y otros gastos según las condiciones de tu banco.' },
        { q: '¿Cuánta entrada necesito para una hipoteca?', a: 'En España, los bancos financian habitualmente hasta el 80% del valor de tasación, por lo que necesitas al menos un 20% de entrada más un 10-12% adicional para gastos de compraventa. Algunas hipotecas jóvenes permiten financiar hasta el 90-95%.' },
        { q: '¿Qué es el cuadro de amortización?', a: 'El cuadro de amortización muestra cómo se divide cada cuota entre capital e intereses a lo largo del préstamo. Al principio la mayor parte es intereses; al final del préstamo, la mayor parte es capital.' },
        { q: '¿Cómo puedo reducir el total de intereses que pago?', a: 'Puedes reducir los intereses totales haciendo una entrada mayor, eligiendo un plazo más corto o realizando amortizaciones anticipadas. Amortizar 1.000€ de capital extra al año puede ahorrarte miles de euros en intereses.' },
      ],
      aboutTitle: 'Sobre la Calculadora de Hipoteca',
      aboutBody: [
        'La calculadora de hipoteca de CalcFi es una herramienta gratuita que ayuda a compradores y propietarios a calcular con precisión su cuota mensual hipotecaria, el total de intereses y ver el plan de amortización completo. Utiliza la fórmula PMT estándar empleada por bancos e instituciones financieras.',
        'Solo tienes que introducir el precio de la vivienda, la entrada, el tipo de interés anual que te ofrece tu banco y el plazo. La calculadora muestra al instante tu cuota mensual desglosada en capital e intereses, y el coste total del préstamo.',
        'Ejemplo: una vivienda de 300.000€ con 60.000€ de entrada (20%), tipo de interés del 3,5% y 30 años de plazo resulta en una cuota mensual de aproximadamente 1.078€. En 30 años pagarás unos 448.000€ en total, es decir, 208.000€ de intereses sobre los 240.000€ de hipoteca.',
        'Usa esta calculadora para comparar ofertas de distintos bancos, decidir entre 20 o 30 años de hipoteca, o evaluar cómo una mayor entrada reduce tu cuota mensual y el total de intereses. Todos los cálculos son instantáneos en tu navegador.',
      ],
      relatedTitle: 'Herramientas Relacionadas',
    },
    'compound-interest': {
      appName: 'Calculadora de Interés Compuesto — CalcFi',
      appDescription: 'Calculadora de interés compuesto gratuita. Visualiza el crecimiento de tu inversión a lo largo del tiempo con capitalización diaria, mensual o anual.',
      appFeatures: ['Cálculo de interés compuesto', 'Múltiples frecuencias de capitalización', 'Gráfico de crecimiento', 'Capital final e intereses generados'],
      howToName: 'Cómo usar la Calculadora de Interés Compuesto',
      howToSteps: ['Introduce tu inversión inicial (capital)', 'Establece el tipo de interés anual esperado', 'Elige el período de inversión en años', 'Selecciona la frecuencia de capitalización (mensual es la más habitual)', 'Haz clic en Calcular para ver el crecimiento de tu inversión'],
      faqTitle: 'Interés Compuesto — Preguntas Frecuentes',
      faqs: [
        { q: '¿Qué es el interés compuesto?', a: 'El interés compuesto es el interés que se calcula sobre el capital inicial más los intereses acumulados de períodos anteriores. A diferencia del interés simple (que solo aplica al capital), el interés compuesto crece de forma exponencial. Einstein lo llamó "la octava maravilla del mundo".' },
        { q: '¿Cuál es la fórmula del interés compuesto?', a: 'A = P(1 + r/n)^(nt), donde A es el capital final, P es el capital inicial, r es el tipo de interés anual (en decimal), n es el número de veces que se capitaliza al año y t es el número de años.' },
        { q: '¿Con qué frecuencia se capitaliza el interés?', a: 'Depende del producto financiero. Las cuentas de ahorro suelen capitalizar diaria o mensualmente. Los bonos pueden hacerlo semestralmente. Las rentabilidades de inversión se modelan típicamente de forma anual. Mayor frecuencia de capitalización produce rentabilidades ligeramente superiores.' },
        { q: '¿Qué es la Regla del 72?', a: 'La Regla del 72 permite estimar rápidamente cuánto tardarás en doblar tu dinero. Divide 72 entre el tipo de interés anual. Ejemplo: al 8% anual, tu dinero se duplica en aproximadamente 72 ÷ 8 = 9 años.' },
        { q: '¿Qué rentabilidad anual es realista para inversiones?', a: 'Históricamente el S&P 500 ha rentado aproximadamente un 10% anual (7% ajustado a inflación). Las cuentas de ahorro de alta rentabilidad ofrecen actualmente un 3-5%. Los activos crypto tienen mayor potencial pero también mayor volatilidad.' },
      ],
      aboutTitle: 'Sobre la Calculadora de Interés Compuesto',
      aboutBody: [
        'La calculadora de interés compuesto de CalcFi te muestra exactamente cómo crece una inversión a lo largo del tiempo gracias al poder de la capitalización. Tanto si planificas tu jubilación, ahorras para una meta a largo plazo o simplemente quieres entender cómo funciona el interés compuesto, esta herramienta te revela el verdadero potencial de invertir de forma consistente.',
        'Introduce tu inversión inicial, la rentabilidad anual esperada, el número de años y la frecuencia de capitalización. La calculadora muestra el capital final, los intereses generados y un gráfico de crecimiento para visualizar cómo se acumula tu patrimonio.',
        'Ejemplo: 10.000€ invertidos al 7% anual, con capitalización mensual durante 30 años, crecen hasta 81.165€. Eso son 71.165€ de intereses sobre una inversión inicial de 10.000€, el poder del interés compuesto trabajando durante tres décadas.',
        'Esta calculadora es ideal para modelar el ahorro para la jubilación, comparar cuentas de ahorro con distintas frecuencias de capitalización, o simplemente entender por qué empezar a invertir pronto marca una diferencia tan enorme en el resultado final.',
      ],
      relatedTitle: 'Herramientas Relacionadas',
    },
    loan: {
      appName: 'Calculadora de Préstamo — CalcFi',
      appDescription: 'Calculadora de préstamos gratuita para préstamos personales y de coche. Calcula la cuota mensual, coste total e intereses de cualquier préstamo.',
      appFeatures: ['Cálculo de cuota mensual', 'Coste total del préstamo', 'Total de intereses', 'Válido para cualquier tipo de préstamo'],
      howToName: 'Cómo usar la Calculadora de Préstamo',
      howToSteps: ['Introduce el importe total del préstamo', 'Introduce el tipo de interés anual de tu entidad', 'Introduce el plazo del préstamo en meses', 'Haz clic en Calcular para ver tu cuota mensual y coste total'],
      faqTitle: 'Calculadora de Préstamo — Preguntas Frecuentes',
      faqs: [
        { q: '¿Cómo se calcula la cuota de un préstamo?', a: 'La cuota se calcula con la fórmula PMT: M = P × [r(1+r)^n] / [(1+r)^n − 1]. P es el importe del préstamo, r es el tipo de interés mensual (TAE anual ÷ 12) y n es el total de cuotas mensuales.' },
        { q: '¿Qué diferencia hay entre TIN y TAE?', a: 'El TIN (Tipo de Interés Nominal) es el tipo básico del préstamo. La TAE (Tasa Anual Equivalente) incluye el TIN más todas las comisiones y gastos asociados, y refleja el coste real del préstamo. Siempre compara préstamos usando la TAE.' },
        { q: '¿Qué tipo de interés es bueno para un préstamo personal?', a: 'Los tipos de préstamos personales en España suelen oscilar entre el 5% y el 20% TAE, dependiendo del perfil crediticio y la entidad. Los mejores tipos están por debajo del 8% TAE. Compara siempre varias ofertas antes de firmar.' },
        { q: '¿Mejor plazo corto o largo?', a: 'Los plazos cortos implican cuotas más altas pero menos intereses totales. Los plazos largos suponen cuotas más bajas pero pagas significativamente más intereses. Elige el plazo más corto que encaje cómodamente en tu presupuesto mensual.' },
        { q: '¿Puedo cancelar un préstamo anticipadamente?', a: 'Sí, la mayoría de préstamos personales permiten la cancelación anticipada, total o parcial. La normativa española limita las comisiones por cancelación anticipada: máximo el 0,5% si quedan más de 12 meses y el 0,25% si quedan menos de 12 meses.' },
      ],
      aboutTitle: 'Sobre la Calculadora de Préstamo',
      aboutBody: [
        'La calculadora de préstamos de CalcFi te ayuda a conocer el coste real de cualquier préstamo personal, préstamo de coche o financiación a plazos. Introduce el importe, el tipo de interés y el plazo para ver al instante tu cuota mensual y el coste total de devolución.',
        'Entender el préstamo antes de firmarlo es fundamental. Un préstamo de 15.000€ al 7% a 60 meses supone 2.783€ de intereses, con una cuota de 297€. El mismo préstamo al 12% cuesta 4.980€ de intereses, casi 2.200€ más. Esta calculadora hace esas comparaciones inmediatas.',
        'Úsala para comparar ofertas de distintas entidades, evaluar plazos de 36, 48 o 60 meses, o decidir cuánto puedes permitirte pedir basándote en tu presupuesto mensual. Funciona para préstamos personales, préstamos de coche, microcréditos y cualquier financiación a tipo fijo.',
        'Todos los cálculos siguen la fórmula de amortización estándar utilizada por los bancos. Los resultados son instantáneos y no se requiere ningún dato personal.',
      ],
      relatedTitle: 'Herramientas Relacionadas',
    },
    'bitcoin-profit': {
      appName: 'Calculadora de Beneficio Bitcoin — CalcFi',
      appDescription: 'Calculadora de beneficio Bitcoin gratuita. Calcula tu ganancia, pérdida y ROI en trading de crypto al instante.',
      appFeatures: ['Cálculo de ganancia y pérdida', 'ROI en porcentaje', 'Beneficio neto ajustado por comisiones', 'Cálculo de cantidad de BTC'],
      howToName: 'Cómo usar la Calculadora de Beneficio Bitcoin',
      howToSteps: ['Introduce el importe que invertiste en dólares', 'Introduce el precio de Bitcoin en el momento de compra', 'Introduce el precio de Bitcoin en el momento de venta (o precio objetivo)', 'Introduce el porcentaje de comisiones del exchange (normalmente 0,1–0,5%)', 'Haz clic en Calcular para ver tu ganancia o pérdida'],
      faqTitle: 'Calculadora Bitcoin — Preguntas Frecuentes',
      faqs: [
        { q: '¿Cómo se calcula el beneficio en Bitcoin?', a: 'Beneficio = (Precio Venta − Precio Compra) × Cantidad BTC − Comisiones. Tu cantidad de BTC es Inversión ÷ Precio de Compra. El beneficio neto descuenta las comisiones de compra y venta.' },
        { q: '¿Cuáles son las comisiones típicas en trading de crypto?', a: 'Los grandes exchanges cobran entre un 0,1% y un 0,5% por operación. Binance cobra el 0,1% (o 0,075% con BNB). Coinbase puede cobrar hasta el 1,49%. Los exchanges españoles y europeos suelen estar en el 0,15–0,5%.' },
        { q: '¿Qué es el ROI en trading de crypto?', a: 'El ROI (Return on Investment) = (Beneficio Neto ÷ Inversión Inicial) × 100. Un ROI del 50% significa que tu inversión creció a la mitad. Un ROI del −20% significa que perdiste el 20% de tu inversión. El ROI permite comparar el rendimiento entre operaciones de distinto tamaño.' },
        { q: '¿Cómo tributan las ganancias de Bitcoin en España?', a: 'En España, las ganancias por venta de criptomonedas tributan como rendimientos de capital mobiliario en la base del ahorro del IRPF: 19% hasta 6.000€, 21% entre 6.000€ y 50.000€, 23% entre 50.000€ y 200.000€, y 27% por encima. Consulta siempre a un asesor fiscal.' },
        { q: '¿Cuál es mi precio de break-even?', a: 'Tu precio de break-even es el precio de venta al que no ganas ni pierdes, incluyendo las comisiones. Si compraste BTC a 30.000$ con un 0,5% de comisión, tu break-even de venta es aproximadamente 30.302$.' },
      ],
      aboutTitle: 'Sobre la Calculadora de Beneficio Bitcoin',
      aboutBody: [
        'La calculadora de beneficio Bitcoin de CalcFi permite a los traders calcular rápidamente la ganancia o pérdida en cualquier operación de criptomonedas. Introduce tu inversión, el precio de compra, el precio de venta y las comisiones para ver al instante el beneficio bruto, el beneficio neto y el ROI.',
        'El trading de crypto puede ser complejo cuando se tienen en cuenta las comisiones de ambos lados de la operación. Por ejemplo, si invertiste 1.000$ para comprar Bitcoin a 30.000$, compraste 0,0333 BTC. Si vendes a 50.000$ con un 0,5% de comisión, tu beneficio bruto es 666$, pero tras las comisiones de compra y venta, tu beneficio neto es aproximadamente 631$.',
        'Esta calculadora es muy útil para planificar niveles de salida, evaluar si una operación ha sido rentable una vez descontadas las comisiones, o comparar distintos escenarios de entrada y salida. Úsala junto a la Calculadora DCA si compras Bitcoin de forma periódica.',
        'Nota: Esta calculadora es para fines educativos y asume una única operación de compra y venta. No tiene en cuenta impuestos, recompensas por staking ni estrategias de trading complejas.',
      ],
      relatedTitle: 'Herramientas Relacionadas',
    },
    dca: {
      appName: 'Calculadora DCA — CalcFi',
      appDescription: 'Calculadora DCA gratuita para crypto. Calcula tu precio medio de compra, rentabilidad total y evolución de cartera con la estrategia de inversión periódica.',
      appFeatures: ['Precio medio de compra', 'Valor final de cartera', 'Rentabilidad total en porcentaje', 'Gráfico cartera vs invertido'],
      howToName: 'Cómo usar la Calculadora DCA',
      howToSteps: ['Introduce el importe que inviertes cada período (ej. 100€/mes)', 'Introduce el número de períodos de inversión', 'Introduce el precio inicial de Bitcoin (primera compra)', 'Introduce el precio final de Bitcoin (precio actual u objetivo)', 'Haz clic en Calcular para ver el rendimiento de tu DCA'],
      faqTitle: 'Calculadora DCA — Preguntas Frecuentes',
      faqs: [
        { q: '¿Qué es el Dollar Cost Averaging (DCA)?', a: 'El DCA (inversión periódica) es una estrategia que consiste en invertir una cantidad fija a intervalos regulares (semanal, mensual) independientemente del precio. Cuando los precios bajan compras más; cuando suben compras menos. Con el tiempo esto promedia el coste y reduce el impacto de la volatilidad.' },
        { q: '¿Por qué es efectiva la estrategia DCA en crypto?', a: 'Los mercados crypto son muy volátiles. Intentar predecir el mejor momento de compra es extremadamente difícil incluso para profesionales. El DCA elimina la presión emocional y el market timing: inviertes de forma constante y te beneficias tanto de las caídas como de la tendencia alcista a largo plazo.' },
        { q: '¿Cómo se calcula el precio medio de compra?', a: 'Precio medio = Total Invertido ÷ Total BTC Comprado. Como compras más BTC cuando los precios están bajos y menos cuando están altos, tu precio medio suele ser inferior a la media aritmética de todos los precios durante el período de inversión.' },
        { q: '¿Cuál es la diferencia entre DCA y inversión a suma alzada?', a: 'Invertir todo de golpe (lump-sum) supera al DCA aproximadamente 2 de cada 3 veces en mercados alcistas, porque el capital se despliega antes. Sin embargo, el DCA supera al lump-sum en mercados bajistas o volátiles y reduce significativamente el riesgo de invertirlo todo en un máximo.' },
        { q: '¿Con qué frecuencia debo hacer DCA en crypto?', a: 'Las frecuencias más habituales son semanal o mensual. El DCA semanal captura más variación de precios y suele producir un precio medio más bajo, pero el mensual es más sencillo y reduce las comisiones. Lo más importante es la constancia: mantén el plan independientemente de las noticias del mercado.' },
      ],
      aboutTitle: 'Sobre la Calculadora DCA',
      aboutBody: [
        'La calculadora DCA de CalcFi te ayuda a modelar y entender los resultados de una estrategia de Dollar Cost Averaging en Bitcoin o cualquier criptomoneda. Invirtiendo una cantidad fija a intervalos regulares, los inversores reducen el impacto de la volatilidad del mercado y acumulan posiciones de forma sistemática a lo largo del tiempo.',
        'Introduce el importe que inviertes cada período, el número de períodos, y los precios de Bitcoin al inicio y al final. La calculadora muestra el total invertido, el valor final de la cartera, el precio medio de compra y la rentabilidad total, junto con un gráfico que compara el valor de la cartera frente al capital invertido.',
        'Ejemplo: invertir 100€/mes en Bitcoin durante 24 meses, con Bitcoin empezando en 20.000$ y terminando en 50.000$, supone 2.400€ de inversión total. Como compras más BTC cuando el precio está bajo, tu precio medio podría ser unos 32.000$, y el valor final de tu cartera sería aproximadamente 4.200€, una rentabilidad del 75%.',
        'Usa esta calculadora para planificar tu estrategia DCA, evaluar el rendimiento pasado o comparar distintos importes y frecuencias de inversión. La estrategia DCA es ampliamente recomendada por educadores financieros para la acumulación de crypto a largo plazo.',
      ],
      relatedTitle: 'Herramientas Relacionadas',
    },
    'financial-advisor': {
      appName: 'Asesor Financiero IA — CalcFi',
      appDescription: 'Asesor financiero IA gratuito impulsado por Claude AI. Respuestas instantáneas y personalizadas a tus preguntas sobre hipotecas, inversiones, crypto y más.',
      appFeatures: ['Asesoramiento financiero con IA', 'Bilingüe (inglés y español)', 'Respuestas instantáneas', 'Cubre hipotecas, préstamos, inversiones y crypto'],
      howToName: 'Cómo usar el Asesor Financiero IA',
      howToSteps: ['Escribe tu pregunta financiera en el chat', 'Sé específico para obtener mejores respuestas (ej. "¿Me conviene hipoteca a tipo fijo o variable?")', 'Pulsa Enter o haz clic en Enviar', 'Lee la respuesta del asesor IA y haz preguntas de seguimiento', 'Usa las demás calculadoras de CalcFi para calcular los números concretos de tu caso'],
      faqTitle: 'Asesor Financiero IA — Preguntas Frecuentes',
      faqs: [
        { q: '¿Con qué puede ayudarme el asesor financiero IA?', a: 'La IA puede responder preguntas sobre hipotecas, interés compuesto, préstamos personales, Bitcoin y crypto, estrategias DCA, planificación de jubilación, presupuesto personal y finanzas personales en general. Funciona en español e inglés.' },
        { q: '¿El asesoramiento IA es personalizado?', a: 'La IA proporciona orientación educativa basada en tus preguntas. No es un asesor financiero homologado y no tiene acceso a tus datos personales, cuentas bancarias ni situación fiscal. Para asesoramiento personalizado y regulado, consulta con un asesor financiero certificado.' },
        { q: '¿Son privadas mis conversaciones?', a: 'Las conversaciones se procesan a través de la API de Claude de Anthropic. CalcFi no almacena el historial de conversaciones en sus servidores. Cada sesión comienza desde cero. No compartas información personal sensible como números de cuenta o datos bancarios.' },
        { q: '¿Puede la IA tomar decisiones de inversión por mí?', a: 'No. La IA proporciona información educativa únicamente. Todas las decisiones de inversión deben basarse en tu propia investigación, tolerancia al riesgo y, preferiblemente, con la guía de un profesional financiero homologado. Los resultados pasados no garantizan resultados futuros.' },
        { q: '¿El Asesor Financiero IA es gratuito?', a: 'Sí, completamente gratuito. Sin registro, sin tarjeta de crédito, sin límite de uso en CalcFi. La IA está impulsada por el modelo Claude de Anthropic y disponible tanto en español como en inglés.' },
      ],
      aboutTitle: 'Sobre el Asesor Financiero IA',
      aboutBody: [
        'El Asesor Financiero IA de CalcFi es una herramienta conversacional impulsada por el modelo de IA Claude de Anthropic. Ofrece respuestas instantáneas y educativas a tus preguntas financieras en lenguaje natural, sin jerga financiera, sin presión comercial y sin necesidad de registro.',
        'Pregúntale lo que necesites: "¿Cuánta hipoteca puedo pagar?", "¿Es mejor el DCA que invertir todo de golpe?", "¿Qué diferencia hay entre una cuenta de ahorro y un fondo de inversión?", "¿Debo amortizar hipoteca o invertir?". La IA responde de forma reflexiva y concisa, recordándote siempre que se trata de información educativa.',
        'La IA funciona mejor combinada con las calculadoras de CalcFi. Usa la IA para entender conceptos y estrategia, y luego usa las calculadoras concretas para calcular los números de tu situación. Por ejemplo, pregunta a la IA "¿qué plazo de hipoteca me conviene?" y usa después la Calculadora de Hipoteca para comparar 20 vs 30 años con tus datos reales.',
        'Esta herramienta está disponible en español e inglés. Escribe tu pregunta en el idioma que prefieras y la IA responderá en el mismo idioma.',
      ],
      relatedTitle: 'Herramientas Relacionadas',
    },
  },
};

// ─── RELATED TOOLS MAPPING ──────────────────────────────────────────────────

export function getRelatedTools(locale: string, current: Tool) {
  const map: Record<Tool, Tool[]> = {
    mortgage: ['loan', 'compound-interest', 'financial-advisor'],
    'compound-interest': ['mortgage', 'dca', 'financial-advisor'],
    loan: ['mortgage', 'compound-interest', 'financial-advisor'],
    'bitcoin-profit': ['dca', 'compound-interest', 'financial-advisor'],
    dca: ['bitcoin-profit', 'compound-interest', 'financial-advisor'],
    'financial-advisor': ['mortgage', 'bitcoin-profit', 'dca'],
  };

  const hrefMap: Record<Tool, string> = {
    mortgage: `/${locale}/mortgage`,
    'compound-interest': `/${locale}/compound-interest`,
    loan: `/${locale}/loan`,
    'bitcoin-profit': `/${locale}/bitcoin-profit`,
    dca: `/${locale}/dca`,
    'financial-advisor': `/${locale}/financial-advisor`,
  };

  return map[current].map((key) => ({
    title: seoContent[locale as Locale][key].appName.split(' — ')[0],
    href: hrefMap[key],
    description: seoContent[locale as Locale][key].appDescription.split('.')[0] + '.',
  }));
}
