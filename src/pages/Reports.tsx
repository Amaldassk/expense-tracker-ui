import Highcharts from "highcharts";
import HighchartsReactImport from "highcharts-react-official";

import {
  BarChart3,
  Download,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import "highcharts/modules/exporting";

const HighchartsReact =
  (HighchartsReactImport as any).default ?? HighchartsReactImport;

const monthlyData = [
  {
    month: "Mar",
    income: 125000,
    expense: 42000,
  },
  {
    month: "Apr",
    income: 128000,
    expense: 46000,
  },
  {
    month: "May",
    income: 130000,
    expense: 51000,
  },
  {
    month: "Jun",
    income: 130000,
    expense: 47500,
  },
  {
    month: "Jul",
    income: 130000,
    expense: 53000,
  },
  {
    month: "Aug",
    income: 145000,
    expense: 32500,
  },
];

const categoryData = [
  {
    name: "Food",
    y: 12000,
  },
  {
    name: "Bills",
    y: 8500,
  },
  {
    name: "Transport",
    y: 5000,
  },
  {
    name: "Shopping",
    y: 4000,
  },
  {
    name: "Household",
    y: 3000,
  },
];

const topExpenses = [
  {
    name: "Vegetables",
    category: "Food",
    amount: 2750,
  },
  {
    name: "Milk",
    category: "Food",
    amount: 2200,
  },
  {
    name: "Fish",
    category: "Food",
    amount: 1400,
  },
  {
    name: "Cleaning",
    category: "Household",
    amount: 1250,
  },
  {
    name: "Internet",
    category: "Bills",
    amount: 725,
  },
];

export default function Reports() {
  const currentMonth = monthlyData[monthlyData.length - 1];

  const totalIncome = monthlyData.reduce(
    (total, item) => total + item.income,
    0,
  );

  const totalExpense = monthlyData.reduce(
    (total, item) => total + item.expense,
    0,
  );

  const balance = currentMonth.income - currentMonth.expense;

  const savingsRate = (balance / currentMonth.income) * 100;

  /*
   * ======================================================
   * INCOME VS EXPENSE CHART
   * ======================================================
   */

  const incomeExpenseOptions: Highcharts.Options = {
    chart: {
      type: "column",
      height: 350,
      backgroundColor: "transparent",
    },

    title: {
      text: "",
    },

    xAxis: {
      categories: monthlyData.map((item) => item.month),

      lineWidth: 0,

      tickWidth: 0,
    },

    yAxis: {
      title: {
        text: "",
      },

      labels: {
        formatter: function () {
          return `₹${Number(this.value) / 1000}k`;
        },
      },

      gridLineColor: "#e2e8f0",
    },

    tooltip: {
      shared: true,

      valueDecimals: 0,

      formatter: function () {
        const points = this.points || [];

        let result = `<b>${this.x}</b><br/>`;

        points.forEach((point) => {
          result += `${point.series.name}: <b>${formatCurrency(
            Number(point.y),
          )}</b><br/>`;
        });

        return result;
      },
    },

    legend: {
      align: "center",
      verticalAlign: "bottom",
    },

    plotOptions: {
      column: {
        borderRadius: 4,

        pointPadding: 0.1,

        groupPadding: 0.15,
      },
    },

    series: [
      {
        type: "column",
        name: "Income",

        data: monthlyData.map((item) => item.income),

        color: "#22c55e",
      },

      {
        type: "column",
        name: "Expenses",

        data: monthlyData.map((item) => item.expense),

        color: "#ef4444",
      },
    ],

    credits: {
      enabled: false,
    },

    exporting: {
      enabled: true,
    },
  };

  /*
   * ======================================================
   * CATEGORY PIE CHART
   * ======================================================
   */

  const categoryOptions: Highcharts.Options = {
    chart: {
      type: "pie",
      height: 350,
      backgroundColor: "transparent",
    },

    title: {
      text: "",
    },

    tooltip: {
      pointFormat:
        "Amount: <b>₹{point.y:,.0f}</b><br/>" +
        "Percentage: <b>{point.percentage:.1f}%</b>",
    },

    plotOptions: {
      pie: {
        innerSize: "55%",

        allowPointSelect: true,

        cursor: "pointer",

        dataLabels: {
          enabled: false,
        },

        showInLegend: true,
      },
    },

    series: [
      {
        type: "pie",

        name: "Expenses",

        data: categoryData,
      },
    ],

    credits: {
      enabled: false,
    },

    exporting: {
      enabled: true,
    },
  };

  /*
   * ======================================================
   * EXPENSE TREND
   * ======================================================
   */

  const expenseTrendOptions: Highcharts.Options = {
    chart: {
      type: "line",
      height: 300,
      backgroundColor: "transparent",
    },

    title: {
      text: "",
    },

    xAxis: {
      categories: monthlyData.map((item) => item.month),

      lineWidth: 0,

      tickWidth: 0,
    },

    yAxis: {
      title: {
        text: "",
      },

      labels: {
        formatter: function () {
          return `₹${Number(this.value) / 1000}k`;
        },
      },

      gridLineColor: "#e2e8f0",
    },

    tooltip: {
      formatter: function () {
        return `
          <b>${this.x}</b><br/>
          Expenses:
          <b>${formatCurrency(Number(this.y))}</b>
        `;
      },
    },

    plotOptions: {
      line: {
        lineWidth: 3,

        marker: {
          radius: 4,
        },
      },
    },

    series: [
      {
        type: "line",

        name: "Expenses",

        data: monthlyData.map((item) => item.expense),

        color: "#ef4444",
      },
    ],

    credits: {
      enabled: false,
    },

    exporting: {
      enabled: true,
    },
  };

  return (
    <div className="space-y-6">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>

          <p className="mt-1 text-sm text-slate-500">
            Analyze your income, expenses and spending patterns.
          </p>
        </div>

        <button
          type="button"
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-indigo-600
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            shadow-sm
            transition
            hover:bg-indigo-700
          "
        >
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Monthly Income"
          value={formatCurrency(currentMonth.income)}
          icon={<TrendingUp className="h-5 w-5" />}
          iconClass="bg-green-50 text-green-600"
        />

        <SummaryCard
          title="Monthly Expenses"
          value={formatCurrency(currentMonth.expense)}
          icon={<TrendingDown className="h-5 w-5" />}
          iconClass="bg-red-50 text-red-600"
        />

        <SummaryCard
          title="Monthly Balance"
          value={formatCurrency(balance)}
          icon={<Wallet className="h-5 w-5" />}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <SummaryCard
          title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          icon={<BarChart3 className="h-5 w-5" />}
          iconClass="bg-blue-50 text-blue-600"
        />
      </div>

      {/* ================================================= */}
      {/* INCOME VS EXPENSE */}
      {/* ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="font-semibold text-slate-900">Income vs Expenses</h2>

          <p className="mt-1 text-sm text-slate-500">
            Compare your income and expenses over the last 6 months.
          </p>
        </div>

        <HighchartsReact
          highcharts={Highcharts}
          options={incomeExpenseOptions}
        />
      </div>

      {/* ================================================= */}
      {/* CHARTS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* CATEGORY */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="font-semibold text-slate-900">
              Expenses by Category
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Distribution of your spending.
            </p>
          </div>

          <HighchartsReact highcharts={Highcharts} options={categoryOptions} />
        </div>

        {/* EXPENSE TREND */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="font-semibold text-slate-900">Expense Trend</h2>

            <p className="mt-1 text-sm text-slate-500">
              Track how your expenses change each month.
            </p>
          </div>

          <HighchartsReact
            highcharts={Highcharts}
            options={expenseTrendOptions}
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* TOP EXPENSES */}
      {/* ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="font-semibold text-slate-900">Top Expenses</h2>

          <p className="mt-1 text-sm text-slate-500">
            Your highest individual expenses this month.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {topExpenses.map((expense, index) => (
            <div
              key={expense.name}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-600">
                  {index + 1}
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {expense.name}
                  </p>

                  <p className="text-xs text-slate-500">{expense.category}</p>
                </div>
              </div>

              <p className="text-sm font-semibold text-red-600">
                -{formatCurrency(expense.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================= */}
      {/* MONTHLY SUMMARY */}
      {/* ================================================= */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="font-semibold text-slate-900">Monthly Summary</h2>

          <p className="mt-1 text-sm text-slate-500">
            Financial summary for the last 6 months.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Month
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Income
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Expenses
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Balance
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Savings
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {monthlyData.map((item) => {
                const monthlyBalance = item.income - item.expense;

                const monthlySavings = (monthlyBalance / item.income) * 100;

                return (
                  <tr key={item.month} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                      {item.month}
                    </td>

                    <td className="px-6 py-4 text-right text-sm font-medium text-green-600">
                      +{formatCurrency(item.income)}
                    </td>

                    <td className="px-6 py-4 text-right text-sm font-medium text-red-600">
                      -{formatCurrency(item.expense)}
                    </td>

                    <td className="px-6 py-4 text-right text-sm font-semibold text-slate-800">
                      {formatCurrency(monthlyBalance)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                        {monthlySavings.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr className="border-t border-slate-200 bg-slate-50">
                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  Total
                </td>

                <td className="px-6 py-4 text-right text-sm font-bold text-green-600">
                  {formatCurrency(totalIncome)}
                </td>

                <td className="px-6 py-4 text-right text-sm font-bold text-red-600">
                  {formatCurrency(totalExpense)}
                </td>

                <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">
                  {formatCurrency(totalIncome - totalExpense)}
                </td>

                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* SUMMARY CARD */
/* ================================================= */

function SummaryCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <div className={`rounded-lg p-2 ${iconClass}`}>{icon}</div>
      </div>

      <p className="mt-4 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

/* ================================================= */
/* CURRENCY */
/* ================================================= */

function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
