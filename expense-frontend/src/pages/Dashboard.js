import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --surface2: #18181f;
    --border: #2a2a38;
    --accent: #7c6af7;
    --accent2: #f76a8a;
    --accent3: #6af7c8;
    --text: #e8e8f0;
    --muted: #6b6b82;
    --danger: #f76a6a;
    --success: #6af7a8;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes slideRight {
    from { transform: translateX(-16px); opacity: 0; }
    to   { transform: translateX(0);     opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(124,106,247,0.4); }
    50%       { box-shadow: 0 0 0 8px rgba(124,106,247,0); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); } to { transform: rotate(360deg); }
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(16px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  .dashboard-root {
    font-family: 'DM Mono', monospace;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    padding: 40px 24px;
    animation: fadeIn 0.4s ease;
  }

  .dash-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
    animation: fadeUp 0.5s ease both;
  }

  .dash-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 800;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
  }

  .btn-logout {
    font-family: 'DM Mono', monospace;
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 8px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.78rem;
    letter-spacing: 0.05em;
    transition: all 0.2s ease;
  }
  .btn-logout:hover {
    color: var(--danger);
    border-color: var(--danger);
    background: rgba(247,106,106,0.07);
    transform: translateY(-1px);
  }

  .stats-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 32px;
    animation: fadeUp 0.5s 0.1s ease both;
  }

  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
  }
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
  }
  .stat-card:hover { border-color: var(--accent); transform: translateY(-2px); }

  .stat-label {
    font-size: 0.72rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }
  .stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--accent3);
  }

  .btn-report {
    font-family: 'DM Mono', monospace;
    background: linear-gradient(135deg, var(--accent), #5b4de0);
    color: #fff;
    border: none;
    padding: 10px 24px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.82rem;
    letter-spacing: 0.04em;
    transition: all 0.2s ease;
    animation: pulse 2.4s infinite;
    margin-bottom: 32px;
  }
  .btn-report:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(124,106,247,0.35);
    animation: none;
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: 0.02em;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .form-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 32px;
    animation: fadeUp 0.5s 0.15s ease both;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 14px;
  }

  .dash-input {
    font-family: 'DM Mono', monospace;
    background: var(--surface2);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 0.85rem;
    width: 100%;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    -webkit-appearance: none;
  }
  .dash-input::placeholder { color: var(--muted); }
  .dash-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(124,106,247,0.15);
    background: #1e1e2e;
  }
  .dash-input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.6);
    cursor: pointer;
  }

  .btn-add {
    font-family: 'DM Mono', monospace;
    width: 100%;
    background: linear-gradient(135deg, var(--accent3), #3de0a8);
    color: #0a0a0f;
    border: none;
    padding: 13px 24px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.88rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-top: 8px;
    transition: all 0.2s ease;
  }
  .btn-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(106,247,200,0.3);
    filter: brightness(1.08);
  }
  .btn-add:active { transform: translateY(0); }

  .expense-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 40px;
  }

  .expense-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    animation: cardIn 0.4s ease both;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .expense-card:hover {
    border-color: var(--accent);
    transform: translateX(4px);
    box-shadow: -4px 0 0 var(--accent);
  }

  .expense-info { flex: 1; }
  .expense-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 4px;
  }
  .expense-meta {
    font-size: 0.76rem;
    color: var(--muted);
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .expense-meta span { display: flex; align-items: center; gap: 4px; }
  .expense-cat {
    background: rgba(124,106,247,0.15);
    color: var(--accent);
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    border: 1px solid rgba(124,106,247,0.25);
  }

  .expense-amount {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--accent2);
    white-space: nowrap;
  }

  .btn-delete {
    font-family: 'DM Mono', monospace;
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 6px 14px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.76rem;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  .btn-delete:hover {
    color: var(--danger);
    border-color: var(--danger);
    background: rgba(247,106,106,0.08);
    transform: scale(1.05);
  }

  .empty-state {
    text-align: center;
    padding: 48px 24px;
    color: var(--muted);
    font-size: 0.85rem;
    border: 1px dashed var(--border);
    border-radius: 14px;
    animation: fadeIn 0.4s ease;
  }

  .chart-section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    animation: fadeUp 0.5s 0.2s ease both;
  }

  .chart-wrap {
    width: 340px;
    max-width: 100%;
    margin: 0 auto;
    animation: fadeIn 0.6s 0.3s ease both;
  }

  @media (max-width: 600px) {
    .stats-row { grid-template-columns: 1fr; }
    .form-grid  { grid-template-columns: 1fr; }
    .expense-card { flex-direction: column; align-items: flex-start; }
  }
`;

function Dashboard() {

  const [expenses, setExpenses] = useState([]);

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: ""
  });

  const navigate = useNavigate();

  // Fetch expenses
  const fetchExpenses = async () => {

    try {

      const res = await API.get("/expenses");

      setExpenses(res.data);

    } catch (error) {

      console.error("Fetch Error:", error);

    }

  };

  useEffect(() => {

    fetchExpenses();

  }, []);

  // Add Expense
  const addExpense = async () => {

    try {

      const payload = {
        title: expense.title,
        amount: Number(expense.amount),
        category: expense.category,
        date: expense.date,
        description: expense.description
      };

      console.log("Sending Expense:", payload);

      await API.post("/expenses", payload);

      alert("Expense Added Successfully");

      setExpense({
        title: "",
        amount: "",
        category: "",
        date: "",
        description: ""
      });

      fetchExpenses();

    } catch (error) {

      console.error("Add Error:", error.response || error);

      alert("Failed to add expense");

    }

  };

  // Delete Expense
  const deleteExpense = async (id) => {

    try {

      await API.delete(`/expenses/${id}`);

      fetchExpenses();

    } catch (error) {

      console.error("Delete Error:", error);

    }

  };

  // Total Expense
  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  // Logout
  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  // Monthly Report
  const getMonthlyReport = async () => {

    try {

      const res = await API.get("/expenses/report?month=3&year=2026");

      alert("Monthly Expense: ₹ " + res.data);

    } catch (error) {

      console.error("Report Error:", error);

    }

  };

  // Chart Data
  const categoryTotals = {};

  expenses.forEach((exp) => {

    if (!categoryTotals[exp.category]) {

      categoryTotals[exp.category] = 0;

    }

    categoryTotals[exp.category] += exp.amount;

  });

  const chartData = {

    labels: Object.keys(categoryTotals),

    datasets: [
      {
        label: "Expenses",
        data: Object.values(categoryTotals),
        borderWidth: 1,
        backgroundColor: [
          "rgba(124,106,247,0.8)",
          "rgba(247,106,138,0.8)",
          "rgba(106,247,200,0.8)",
          "rgba(247,200,106,0.8)",
          "rgba(106,180,247,0.8)",
        ],
        borderColor: "transparent",
      }
    ]

  };

  return (

    <>
      <style>{styles}</style>

      <div className="dashboard-root">

        <div className="dash-header">
          <h2 className="dash-title">Expense Tracker</h2>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-label">Total Expenses</div>
            <div className="stat-value">₹ {total.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Transactions</div>
            <div className="stat-value">{expenses.length}</div>
          </div>
        </div>

        <button className="btn-report" onClick={getMonthlyReport}>
          Monthly Report ↗
        </button>

        <div className="form-card">
          <div className="section-title">Add Expense</div>

          <div className="form-grid">
            <input
              className="dash-input"
              placeholder="Title"
              value={expense.title}
              onChange={(e) =>
                setExpense({ ...expense, title: e.target.value })
              }
            />

            <input
              className="dash-input"
              type="number"
              placeholder="Amount"
              value={expense.amount}
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
            />

            <input
              className="dash-input"
              placeholder="Category"
              value={expense.category}
              onChange={(e) =>
                setExpense({ ...expense, category: e.target.value })
              }
            />

            <input
              className="dash-input"
              type="date"
              value={expense.date}
              onChange={(e) =>
                setExpense({ ...expense, date: e.target.value })
              }
            />
          </div>

          <input
            className="dash-input"
            placeholder="Description"
            value={expense.description}
            onChange={(e) =>
              setExpense({ ...expense, description: e.target.value })
            }
          />

          <button className="btn-add" onClick={addExpense}>
            + Add Expense
          </button>
        </div>

        <div className="section-title">Expense List</div>

        {expenses.length === 0 ? (

          <div className="empty-state">
            <p>No expenses found</p>
            <p style={{ marginTop: 8, fontSize: "0.75rem" }}>Add your first expense above</p>
          </div>

        ) : (

          <div className="expense-list">
            {expenses.map((e, i) => (

              <div
                className="expense-card"
                key={e.id}
                style={{ animationDelay: `${i * 0.06}s` }}
              >

                <div className="expense-info">
                  <div className="expense-title">{e.title}</div>
                  <div className="expense-meta">
                    <span className="expense-cat">{e.category}</span>
                    <span>{e.date}</span>
                    {e.description && <span>{e.description}</span>}
                  </div>
                </div>

                <div className="expense-amount">₹ {Number(e.amount).toLocaleString()}</div>

                <button className="btn-delete" onClick={() => deleteExpense(e.id)}>
                  Delete
                </button>

              </div>

            ))}
          </div>

        )}

        {expenses.length > 0 && (

          <div className="chart-section">
            <div className="section-title">Expense Chart</div>
            <div className="chart-wrap">
              <Pie data={chartData} />
            </div>
          </div>

        )}

      </div>
    </>

  );

}

export default Dashboard;