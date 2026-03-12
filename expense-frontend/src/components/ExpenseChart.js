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

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rotateIn {
    from { opacity: 0; transform: rotate(-6deg) scale(0.92); }
    to   { opacity: 1; transform: rotate(0deg)  scale(1);    }
  }

  .chart-widget {
    font-family: 'DM Mono', monospace;
    background: #111118;
    border: 1px solid #2a2a38;
    border-radius: 20px;
    padding: 32px 28px;
    width: 400px;
    margin: 20px auto;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.5s ease both;
  }
  .chart-widget::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #7c6af7, #f76a8a, #6af7c8);
  }

  .chart-widget-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem;
    font-weight: 800;
    color: #e8e8f0;
    letter-spacing: -0.3px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .chart-widget-title::before {
    content: '';
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #7c6af7;
    box-shadow: 0 0 8px rgba(124,106,247,0.7);
    display: inline-block;
  }

  .chart-inner {
    animation: rotateIn 0.6s 0.15s ease both;
  }
`;

function ExpenseChart({ expenses }) {

  const categoryTotals = {};

  expenses.forEach(exp => {
    if (!categoryTotals[exp.category]) {
      categoryTotals[exp.category] = 0;
    }
    categoryTotals[exp.category] += exp.amount;
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categoryTotals),
        borderWidth: 1,
        backgroundColor: [
          "rgba(124,106,247,0.85)",
          "rgba(247,106,138,0.85)",
          "rgba(106,247,200,0.85)",
          "rgba(247,200,106,0.85)",
          "rgba(106,180,247,0.85)",
        ],
        borderColor: "#0a0a0f",
        hoverOffset: 8,
      }
    ]
  };

  return (
    <>
      <style>{styles}</style>
      <div className="chart-widget">
        <div className="chart-widget-title">Expense Category Chart</div>
        <div className="chart-inner">
          <Pie data={data}/>
        </div>
      </div>
    </>
  );
}

export default ExpenseChart;