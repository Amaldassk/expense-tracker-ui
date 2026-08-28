import { useMemo, useState } from "react";
import { Edit2, Plus, Trash2, Wallet } from "lucide-react";

import AddEditBudgetDrawer from "../components/AddEditBudgetDrawer";
import type { Budget } from "../types/budget";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

interface BudgetWithSpent extends Budget {
  spent: number;
}

/*
 * Temporary data
 * Later this will come from RTK Query.
 */
const initialBudgets: BudgetWithSpent[] = [
  {
    id: 1,
    category: "Milk",
    amount: 3000,
    month: "August 2026",
    description: "Monthly milk expense",
    spent: 2200,
  },
  {
    id: 2,
    category: "Oil",
    amount: 1000,
    month: "August 2026",
    description: "Cooking oil",
    spent: 750,
  },
  {
    id: 3,
    category: "Cleaning",
    amount: 2000,
    month: "August 2026",
    description: "House cleaning supplies",
    spent: 1200,
  },
  {
    id: 4,
    category: "Orange",
    amount: 3000,
    month: "August 2026",
    description: "Fruits",
    spent: 1800,
  },
  {
    id: 5,
    category: "Vegetables",
    amount: 3500,
    month: "August 2026",
    description: "Monthly vegetables",
    spent: 2900,
  },
  {
    id: 6,
    category: "Fish",
    amount: 2000,
    month: "August 2026",
    description: "Fish and seafood",
    spent: 1600,
  },
  {
    id: 7,
    category: "Gas",
    amount: 955,
    month: "August 2026",
    description: "Cooking gas",
    spent: 955,
  },
  {
    id: 8,
    category: "Aluva Net",
    amount: 710,
    month: "August 2026",
    description: "Internet bill",
    spent: 710,
  },
  {
    id: 9,
    category: "Net",
    amount: 725,
    month: "August 2026",
    description: "Internet expense",
    spent: 500,
  },
  {
    id: 10,
    category: "Biju",
    amount: 2000,
    month: "August 2026",
    description: "Monthly expense",
    spent: 1000,
  },
];

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function getProgress(spent: number, budget: number) {
  if (budget <= 0) return 0;

  return Math.min(Math.round((spent / budget) * 100), 100);
}

function getProgressClass(percentage: number) {
  if (percentage >= 100) {
    return "bg-red-500";
  }

  if (percentage >= 80) {
    return "bg-amber-500";
  }

  return "bg-indigo-500";
}

function getStatus(spent: number, budget: number) {
  if (spent > budget) {
    return {
      text: "Over budget",
      className: "bg-red-50 text-red-600",
    };
  }

  const percentage = budget > 0 ? (spent / budget) * 100 : 0;

  if (percentage >= 80) {
    return {
      text: "Almost reached",
      className: "bg-amber-50 text-amber-600",
    };
  }

  return {
    text: "On track",
    className: "bg-emerald-50 text-emerald-600",
  };
}

export default function Budgets() {
  const [budgets, setBudgets] = useState<BudgetWithSpent[]>(initialBudgets);

  const [deleteBudget, setDeleteBudget] = useState<BudgetWithSpent | null>(
    null,
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  /*
   * Summary calculations
   */
  const summary = useMemo(() => {
    const totalBudget = budgets.reduce(
      (total, budget) => total + budget.amount,
      0,
    );

    const totalSpent = budgets.reduce(
      (total, budget) => total + budget.spent,
      0,
    );

    const remaining = totalBudget - totalSpent;

    const percentage =
      totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

    return {
      totalBudget,
      totalSpent,
      remaining,
      percentage,
    };
  }, [budgets]);

  /*
   * Add budget
   */
  const handleAddBudget = () => {
    setSelectedBudget(null);
    setIsDrawerOpen(true);
  };

  /*
   * Edit budget
   */
  const handleEditBudget = (budget: BudgetWithSpent) => {
    setSelectedBudget({
      id: budget.id,
      category: budget.category,
      amount: budget.amount,
      month: budget.month,
      description: budget.description,
    });

    setIsDrawerOpen(true);
  };

  /*
   * Delete budget
   */
  const handleDeleteBudget = (budgetId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this budget?",
    );

    if (!confirmed) return;

    setBudgets((currentBudgets) =>
      currentBudgets.filter((budget) => budget.id !== budgetId),
    );
  };

  /*
   * Save budget
   *
   * This supports both ADD and EDIT.
   */
  const handleSaveBudget = (budget: Budget) => {
    setBudgets((currentBudgets) => {
      const existingBudget = currentBudgets.find(
        (item) => item.id === budget.id,
      );

      /*
       * EDIT
       */
      if (existingBudget) {
        return currentBudgets.map((item) =>
          item.id === budget.id
            ? {
                ...item,
                ...budget,
              }
            : item,
        );
      }

      /*
       * ADD
       */
      return [
        ...currentBudgets,
        {
          ...budget,
          spent: 0,
        },
      ];
    });
  };

  return (
    <div className="min-h-full bg-slate-50 p-6 lg:p-8">
      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Budgets</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your monthly spending limits.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddBudget}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-indigo-600
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
          "
        >
          <Plus className="h-4 w-4" />
          Add Budget
        </button>
      </div>

      {/* ==========================================
          SUMMARY CARDS
      ========================================== */}

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* TOTAL BUDGET */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Budget</p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatCurrency(summary.totalBudget)}
              </p>
            </div>

            <div className="rounded-lg bg-indigo-50 p-3">
              <Wallet className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* TOTAL SPENT */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Spent</p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatCurrency(summary.totalSpent)}
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-3">
              <Wallet className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </div>

        {/* REMAINING */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Remaining</p>

              <p
                className={`
                  mt-2
                  text-2xl
                  font-bold
                  ${summary.remaining < 0 ? "text-red-600" : "text-emerald-600"}
                `}
              >
                {formatCurrency(Math.abs(summary.remaining))}
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3">
              <Wallet className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          OVERALL PROGRESS
      ========================================== */}

      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">Overall Spending</h2>

            <p className="mt-1 text-sm text-slate-500">
              {formatCurrency(summary.totalSpent)} spent of{" "}
              {formatCurrency(summary.totalBudget)}
            </p>
          </div>

          <span className="text-sm font-semibold text-slate-700">
            {summary.percentage}%
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-500
              ${getProgressClass(summary.percentage)}
            `}
            style={{
              width: `${summary.percentage}%`,
            }}
          />
        </div>
      </div>

      {/* ==========================================
          BUDGET LIST
      ========================================== */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* TABLE HEADER */}

        <div className="border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Monthly Budgets</h2>

              <p className="mt-1 text-sm text-slate-500">
                {budgets.length} budget
                {budgets.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Month
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Budget
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Spent
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Progress
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {budgets.map((budget) => {
                const percentage = getProgress(budget.spent, budget.amount);

                const status = getStatus(budget.spent, budget.amount);

                return (
                  <tr key={budget.id} className="transition hover:bg-slate-50">
                    {/* CATEGORY */}

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {budget.category}
                        </p>

                        {budget.description && (
                          <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
                            {budget.description}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* MONTH */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {budget.month}
                    </td>

                    {/* BUDGET */}

                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {formatCurrency(budget.amount)}
                    </td>

                    {/* SPENT */}

                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      {formatCurrency(budget.spent)}
                    </td>

                    {/* PROGRESS */}

                    <td className="min-w-[180px] px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`
                              h-full
                              rounded-full
                              transition-all
                              duration-500
                              ${getProgressClass(percentage)}
                            `}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <span className="w-10 text-right text-xs font-medium text-slate-500">
                          {percentage}%
                        </span>
                      </div>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-2.5
                          py-1
                          text-xs
                          font-medium
                          ${status.className}
                        `}
                      >
                        {status.text}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleEditBudget(budget)}
                          title="Edit budget"
                          className="
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-indigo-50
                            hover:text-indigo-600
                          "
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteBudget(budget)}
                          className="
    rounded-lg
    p-2
    text-slate-500
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
              })}
            </tbody>
          </table>
        </div>

        {/* ========================================
            MOBILE CARDS
        ======================================== */}

        <div className="divide-y divide-slate-100 md:hidden">
          {budgets.map((budget) => {
            const percentage = getProgress(budget.spent, budget.amount);

            const status = getStatus(budget.spent, budget.amount);

            return (
              <div key={budget.id} className="p-5">
                {/* TOP */}

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {budget.category}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {budget.month}
                    </p>
                  </div>

                  <span
                    className={`
                      rounded-full
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      ${status.className}
                    `}
                  >
                    {status.text}
                  </span>
                </div>

                {/* AMOUNTS */}

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Budget</p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {formatCurrency(budget.amount)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Spent</p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {formatCurrency(budget.spent)}
                    </p>
                  </div>
                </div>

                {/* PROGRESS */}

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Spending progress
                    </span>

                    <span className="text-xs font-medium text-slate-600">
                      {percentage}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`
                        h-full
                        rounded-full
                        ${getProgressClass(percentage)}
                      `}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="mt-5 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditBudget(budget)}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-slate-200
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-slate-600
                      hover:bg-slate-50
                    "
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteBudget(budget.id)}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-red-100
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-red-600
                      hover:bg-red-50
                    "
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {budgets.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <Wallet className="h-6 w-6 text-slate-400" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              No budgets yet
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
              Create your first budget to start tracking your monthly spending.
            </p>

            <button
              type="button"
              onClick={handleAddBudget}
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-indigo-600
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                hover:bg-indigo-700
              "
            >
              <Plus className="h-4 w-4" />
              Add Budget
            </button>
          </div>
        )}
      </div>

      {/* ==========================================
          ADD / EDIT DRAWER
      ========================================== */}

      <AddEditBudgetDrawer
        isOpen={isDrawerOpen}
        budget={selectedBudget}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedBudget(null);
        }}
        onSave={handleSaveBudget}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(deleteBudget)}
        title="Delete budget?"
        message="Are you sure you want to delete this budget? This action cannot be undone."
        itemName={
          deleteBudget
            ? `${deleteBudget.category} - ₹${deleteBudget.amount.toLocaleString(
                "en-IN",
              )}`
            : undefined
        }
        onCancel={() => setDeleteBudget(null)}
        onConfirm={() => {
          if (!deleteBudget) return;

          setBudgets((current) =>
            current.filter((item) => item.id !== deleteBudget.id),
          );

          setDeleteBudget(null);
        }}
      />
    </div>
  );
}
