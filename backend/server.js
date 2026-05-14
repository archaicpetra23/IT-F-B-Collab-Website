const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Load static data
const dataPath = path.join(__dirname, 'data/financial-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// ===== POST /login =====
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@test.com' && password === 'admin123') {
    return res.json({ success: true, message: 'Login berhasil', user: { email, role: 'admin' } });
  }
  res.status(401).json({ success: false, message: 'Email atau password salah' });
});

// ===== GET /income-statement =====
app.get('/api/income-statement', (req, res) => {
  const { revenue, cogs, expenses, tax } = data;
  const grossProfit = revenue - cogs;
  const netProfit = grossProfit - expenses - tax;
  const profitMargin = ((netProfit / revenue) * 100).toFixed(2);
  const growthRate = data.growthRate / 100;
  res.json({
    revenue, cogs, expenses, tax, grossProfit, netProfit,
    profitMargin: `${profitMargin}%`,
    forecast: {
      revenue: Math.round(revenue * (1 + growthRate)),
      netProfit: Math.round(netProfit * (1 + growthRate)),
      growthRate: `${data.growthRate}%`
    }
  });
});

// ===== GET /cash-flow =====
app.get('/api/cash-flow', (req, res) => {
  const { cashSales, cashInvestment, cashSalary, cashOperational } = data;
  const totalCashIn = cashSales + cashInvestment;
  const totalCashOut = cashSalary + cashOperational;
  const netCashFlow = totalCashIn - totalCashOut;
  res.json({
    cashIn: { sales: cashSales, investment: cashInvestment, total: totalCashIn },
    cashOut: { salary: cashSalary, operational: cashOperational, total: totalCashOut },
    netCashFlow,
    status: netCashFlow >= 0 ? 'Surplus' : 'Defisit'
  });
});

// ===== GET /balance-sheet =====
app.get('/api/balance-sheet', (req, res) => {
  const { cash, inventory, equipment, debt, payables, capital } = data;
  const totalAssets = cash + inventory + equipment;
  const totalLiabilities = debt + payables;
  const totalEquity = capital;
  res.json({
    assets: { cash, inventory, equipment, total: totalAssets },
    liabilities: { debt, payables, total: totalLiabilities },
    equity: { capital, total: totalEquity },
    balanced: Math.abs(totalAssets - (totalLiabilities + totalEquity)) < 1
  });
});

// ===== GET /financial-analysis =====
app.get('/api/financial-analysis', (req, res) => {
  const { fixedCost, sellingPrice, variableCost, initialInvestment, annualCashInflow } = data;
  const contributionMargin = sellingPrice - variableCost;
  const bepUnit = Math.ceil(fixedCost / contributionMargin);
  const bepRevenue = bepUnit * sellingPrice;
  const paybackPeriod = (initialInvestment / annualCashInflow).toFixed(2);
  const roi5yr = (((annualCashInflow * 5 - initialInvestment) / initialInvestment) * 100).toFixed(2);
  res.json({
    bep: { fixedCost, sellingPrice, variableCost, contributionMargin, bepUnit, bepRevenue },
    paybackPeriod: { initialInvestment, annualCashInflow, years: paybackPeriod, roi5yr: `${roi5yr}%`, status: parseFloat(paybackPeriod) < 5 ? 'Layak' : 'Pertimbangkan Ulang' }
  });
});

// ===== GET /api/dashboard (Summary) =====
app.get('/api/dashboard', (req, res) => {
  const { 
    revenue, cogs, expenses, tax, growthRate,
    cashSales, cashInvestment, cashSalary, cashOperational,
    cash, inventory, equipment, debt, payables, capital,
    fixedCost, sellingPrice, variableCost, initialInvestment, annualCashInflow
  } = data;

  const grossProfit = revenue - cogs;
  const netProfit = grossProfit - expenses - tax;
  const netCashFlow = (cashSales + cashInvestment) - (cashSalary + cashOperational);
  const totalAssets = cash + inventory + equipment;
  const totalLiabilities = debt + payables;
  
  const contributionMargin = sellingPrice - variableCost;
  const bepUnit = Math.ceil(fixedCost / contributionMargin);
  const bepRevenue = bepUnit * sellingPrice;
  const paybackPeriod = (initialInvestment / annualCashInflow).toFixed(2);

  res.json({
    summary: {
      revenue, netProfit, netCashFlow, bepRevenue, bepUnit,
      profitMargin: ((netProfit / revenue) * 100).toFixed(1),
      totalAssets, totalLiabilities, paybackPeriod
    },
    raw: data
  });
});

// Only listen if running directly (local dev)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ FinForecast Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
