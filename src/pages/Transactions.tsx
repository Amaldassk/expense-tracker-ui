import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  Filter,
} from "lucide-react";
import { useMemo, useState } from "react";

type TransactionType = "income" | "expense";

type Transaction = {
  id: number;
  title: string;
  category: string;
  amount: number;
  type: TransactionType;
  date: string;
  description?: string;
};

const initialTransactions: Transaction[] = [
  {
    id: 1,
    title: "Salary",
    category: "Salary",
    amount: 130000,
    type: "income",
    date: "2026-08-01",
    description: "Monthly salary",
  },
  {
    id: 2,
    title: "Milk",
    category: "Food",
    amount: 3000,
    type: "expense",
    date: "2026-08-02",
    description: "Monthly milk expense",
  },
  {
    id: 3,
    title: "Vegetables",
    category: "Food",
    amount: 2750,
    type: "expense",
    date: "2026-08-03",
    description: "Vegetable purchase",
  },
  {
    id: 4,
    title: "Freelance",
    category: "Freelance",
    amount: 15000,
    type: "income",
    date: "2026-08-05",
    description: "Freelance project",
  },
  {
    id: 5,
    title: "Fish",
    category: "Food",
    amount: 1400,
    type: "expense",
    date: "2026-08-06",
    description: "Fish purchase",
  },
  {
    id: 6,
    title: "Internet",
    category: "Bills",
    amount: 725,
    type: "expense",
    date: "2026-08-07",
    description: "Internet bill",
  },
  {
    id: 7,
    title: "Cleaning",
    category: "Household",
    amount: 1250,
    type: "expense",
    date: "2026-08-08",
    description: "Cleaning items",
  },
  {
    id: 8,
    title: "Gas",
    category: "Bills",
    amount: 700,
    type: "expense",
    date: "2026-08-10",
    description: "Gas cylinder",
  },
  {
    id: 9,
    title: "Biju",
    category: "Personal",
    amount: 1000,
    type: "expense",
    date: "2026-08-12",
    description: "Personal payment",
  },
  {
    id: 10,
    title: "Oil",
    category: "Food",
    amount: 650,
    type: "expense",
    date: "2026-08-13",
    description: "Cooking oil",
  },
];

export default function Transactions() {
  const [transactions] = useState<Transaction[]>(initialTransactions);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState<"all" | TransactionType>("all");

  const [categoryFilter, setCategoryFilter] = useState("all");

  const [dateFilter, setDateFilter] = useState("");

  /* ================================================= */
  /* SUMMARY */
  /* ================================================= */

  const totalIncome = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);
  }, [transactions]);

  const balance = totalIncome - totalExpense;

  /* ================================================= */
  /* FILTER */
  /* ================================================= */

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.title.toLowerCase().includes(search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "all" || transaction.category === categoryFilter;

      const matchesDate = !dateFilter || transaction.date === dateFilter;

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }, [transactions, search, typeFilter, categoryFilter, dateFilter]);

  /* ================================================= */
  /* CATEGORIES */
  /* ================================================= */

  const categories = [
    ...new Set(transactions.map((transaction) => transaction.category)),
  ];

  return (
    <div className="space-y-6">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage all your income and expenses.
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
          <Plus className="h-4 w-4" />
          Add Transaction
        </button>
      </div>

      {/* ================================================= */}
      {/* SUMMARY CARDS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Transactions"
          value={transactions.length.toString()}
          icon={<Wallet className="h-5 w-5" />}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <SummaryCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon={<ArrowDownLeft className="h-5 w-5" />}
          iconClass="bg-green-50 text-green-600"
        />

        <SummaryCard
          title="Total Expenses"
          value={formatCurrency(totalExpense)}
          icon={<ArrowUpRight className="h-5 w-5" />}
          iconClass="bg-red-50 text-red-600"
        />

        <SummaryCard
          title="Balance"
          value={formatCurrency(balance)}
          icon={<Wallet className="h-5 w-5" />}
          iconClass="bg-blue-50 text-blue-600"
        />
      </div>

      {/* ================================================= */}
      {/* FILTERS */}
      {/* ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-500" />

          <h2 className="text-sm font-semibold text-slate-800">
            Filter Transactions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}

          <div className="relative">
            <Search
              className="
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                border-slate-200
                py-2.5
                pl-10
                pr-4
                text-sm
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
              "
            />
          </div>

          {/* Type */}

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as "all" | TransactionType)
            }
            className="
              rounded-lg
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-slate-700
              outline-none
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-100
            "
          >
            <option value="all">All Types</option>

            <option value="income">Income</option>

            <option value="expense">Expense</option>
          </select>

          {/* Category */}

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="
              rounded-lg
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-slate-700
              outline-none
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-100
            "
          >
            <option value="all">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Date */}

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="
              rounded-lg
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-slate-700
              outline-none
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-100
            "
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* TRANSACTION TABLE */}
      {/* ================================================= */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="font-semibold text-slate-900">All Transactions</h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredTransactions.length} transactions found
            </p>
          </div>
        </div>

        {/* Desktop Table */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Transaction
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="font-medium text-slate-700">
                      No transactions found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}

        <div className="divide-y divide-slate-100 md:hidden">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionMobileCard
                key={transaction.id}
                transaction={transaction}
              />
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="font-medium text-slate-700">
                No transactions found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* DESKTOP TRANSACTION ROW */
/* ================================================= */

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.type === "income";

  return (
    <tr className="transition hover:bg-slate-50">
      {/* Transaction */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <TransactionIcon type={transaction.type} />

          <div>
            <p className="font-medium text-slate-800">{transaction.title}</p>

            <p className="text-xs text-slate-500">{transaction.description}</p>
          </div>
        </div>
      </td>

      {/* Category */}

      <td className="px-6 py-4">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {transaction.category}
        </span>
      </td>

      {/* Date */}

      <td className="px-6 py-4 text-sm text-slate-500">
        {formatDate(transaction.date)}
      </td>

      {/* Amount */}

      <td
        className={`
          px-6
          py-4
          text-right
          text-sm
          font-semibold
          ${isIncome ? "text-green-600" : "text-red-600"}
        `}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </td>

      {/* Actions */}

      <td className="px-6 py-4">
        <div className="flex justify-end gap-1">
          <button
            type="button"
            title="Edit transaction"
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-indigo-600
            "
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            title="Delete transaction"
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ================================================= */
/* MOBILE TRANSACTION CARD */
/* ================================================= */

function TransactionMobileCard({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.type === "income";

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TransactionIcon type={transaction.type} />

          <div>
            <p className="font-medium text-slate-800">{transaction.title}</p>

            <p className="text-xs text-slate-500">{transaction.category}</p>
          </div>
        </div>

        <p
          className={`
            text-sm
            font-semibold
            ${isIncome ? "text-green-600" : "text-red-600"}
          `}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {formatDate(transaction.date)}
        </span>

        <div className="flex gap-1">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-indigo-600"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* TRANSACTION ICON */
/* ================================================= */

function TransactionIcon({ type }: { type: TransactionType }) {
  const isIncome = type === "income";

  return (
    <div
      className={`
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-full
        ${isIncome ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}
      `}
    >
      {isIncome ? (
        <ArrowDownLeft className="h-5 w-5" />
      ) : (
        <ArrowUpRight className="h-5 w-5" />
      )}
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
/* HELPERS */
/* ================================================= */

function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
