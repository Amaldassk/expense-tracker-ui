import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import { useAppContext } from "../context/AppContext";

const transactions = [
  {
    id: 1,
    title: "Grocery Shopping",
    category: "Food",
    date: "Today",
    amount: 2450,
    type: "expense",
  },
  {
    id: 2,
    title: "Salary",
    category: "Income",
    date: "Aug 25",
    amount: 130000,
    type: "income",
  },
  {
    id: 3,
    title: "Electricity Bill",
    category: "Utilities",
    date: "Aug 24",
    amount: 1850,
    type: "expense",
  },
  {
    id: 4,
    title: "Amazon",
    category: "Shopping",
    date: "Aug 23",
    amount: 3200,
    type: "expense",
  },
];

const budgets = [
  {
    name: "Food",
    spent: 7000,
    limit: 10000,
  },
  {
    name: "Transport",
    spent: 2250,
    limit: 5000,
  },
  {
    name: "Shopping",
    spent: 8000,
    limit: 10000,
  },
  {
    name: "Entertainment",
    spent: 2500,
    limit: 5000,
  },
];

export default function Dashboard() {
  const { selectedMonth } = useAppContext();

  return (
    <div className="space-y-6">
      {/* Header */}

      <div
        className="
          flex
          flex-col
          justify-between
          gap-4
          sm:flex-row
          sm:items-center
        "
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

          <p className="mt-1 text-sm text-slate-500">
            Here's your financial overview for {selectedMonth}.
          </p>
        </div>

        <button
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
            hover:bg-indigo-700
          "
        >
          <Plus className="h-4 w-4" />
          Add Expense
        </button>
      </div>

      {/* Summary Cards */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <SummaryCard
          title="Total Balance"
          amount="₹1,25,000"
          description="+8.5% from last month"
          icon={<Wallet />}
          positive
        />

        <SummaryCard
          title="Total Income"
          amount="₹1,50,000"
          description="+12.4% from last month"
          icon={<TrendingUp />}
          positive
        />

        <SummaryCard
          title="Total Expenses"
          amount="₹45,000"
          description="-5.2% from last month"
          icon={<TrendingDown />}
          positive
        />

        <SummaryCard
          title="Total Savings"
          amount="₹1,05,000"
          description="70% savings rate"
          icon={<PiggyBank />}
          positive
        />
      </div>

      {/* Charts / Budget */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-3
        "
      >
        {/* Expense Chart */}

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-5
            xl:col-span-2
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Expense Overview</h2>

              <p className="text-sm text-slate-500">
                Your spending over the last 6 months
              </p>
            </div>

            <select
              className="
                rounded-lg
                border
                border-slate-200
                px-3
                py-2
                text-sm
              "
            >
              <option>Last 6 months</option>
              <option>This year</option>
            </select>
          </div>

          {/* Temporary chart */}

          <div className="mt-6 flex h-64 items-end gap-4">
            {[40, 65, 45, 80, 55, 70].map((height, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="
                      w-full
                      rounded-t-lg
                      bg-indigo-500
                    "
                  style={{
                    height: `${height}%`,
                  }}
                />

                <span className="text-xs text-slate-400">
                  {["Mar", "Apr", "May", "Jun", "Jul", "Aug"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-5
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Budget</h2>

              <p className="text-sm text-slate-500">Monthly spending</p>
            </div>

            <button className="text-sm font-medium text-indigo-600">
              View all
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {budgets.map((budget) => {
              const percentage = (budget.spent / budget.limit) * 100;

              return (
                <div key={budget.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {budget.name}
                    </span>

                    <span className="text-slate-500">
                      ₹{budget.spent.toLocaleString()} / ₹
                      {budget.limit.toLocaleString()}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`
                        h-full
                        rounded-full
                        ${percentage >= 80 ? "bg-red-500" : "bg-indigo-500"}
                      `}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transactions */}

      <div
        className="
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            p-5
          "
        >
          <div>
            <h2 className="font-semibold text-slate-900">
              Recent Transactions
            </h2>

            <p className="text-sm text-slate-500">Your latest transactions</p>
          </div>

          <button className="text-sm font-medium text-indigo-600">
            View all
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.map((transaction) => {
            const income = transaction.type === "income";

            return (
              <div
                key={transaction.id}
                className="
                  flex
                  items-center
                  justify-between
                  px-5
                  py-4
                  hover:bg-slate-50
                "
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      ${
                        income
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }
                    `}
                  >
                    {income ? (
                      <ArrowUpRight className="h-5 w-5" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5" />
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-slate-800">
                      {transaction.title}
                    </p>

                    <p className="text-xs text-slate-500">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                </div>

                <p
                  className={`
                    font-semibold
                    ${income ? "text-green-600" : "text-red-600"}
                  `}
                >
                  {income ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  amount,
  description,
  icon,
  positive,
}: {
  title: string;
  amount: string;
  description: string;
  icon: React.ReactNode;
  positive?: boolean;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <div
          className="
            rounded-lg
            bg-indigo-50
            p-2
            text-indigo-600
          "
        >
          {icon}
        </div>
      </div>

      <h2 className="mt-4 text-2xl font-bold text-slate-900">{amount}</h2>

      <p
        className={`
          mt-2
          text-xs
          ${positive ? "text-green-600" : "text-slate-500"}
        `}
      >
        {description}
      </p>
    </div>
  );
}
