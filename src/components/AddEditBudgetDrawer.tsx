import { useEffect, useState } from "react";
import { X } from "lucide-react";

export interface Budget {
  id: number;
  category: string;
  amount: number;
  month: string;
  description?: string;
}

interface AddEditBudgetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  budget?: Budget | null;
  onSave: (budget: Budget) => void;
}

const categories = [
  "Milk",
  "Oil",
  "Cleaning",
  "Orange",
  "Vegetables",
  "Fish",
  "Gas",
  "Aluva Net",
  "Net",
  "Biju",
  "Shopping",
  "Transport",
  "Other",
];

const months = [
  "August 2026",
  "September 2026",
  "October 2026",
  "November 2026",
  "December 2026",
];

export default function AddEditBudgetDrawer({
  isOpen,
  onClose,
  budget,
  onSave,
}: AddEditBudgetDrawerProps) {
  const isEditMode = Boolean(budget);

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("August 2026");
  const [description, setDescription] = useState("");

  /*
   * Populate form when opening/editing
   */
  useEffect(() => {
    if (budget) {
      setCategory(budget.category);
      setAmount(String(budget.amount));
      setMonth(budget.month);
      setDescription(budget.description ?? "");
    } else {
      setCategory("");
      setAmount("");
      setMonth("August 2026");
      setDescription("");
    }
  }, [budget, isOpen]);

  /*
   * Prevent background scrolling
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /*
   * Close drawer using Escape key
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  /*
   * Submit form
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const budgetData: Budget = {
      id: budget?.id ?? Date.now(),
      category,
      amount: Number(amount),
      month,
      description,
    };

    onSave(budgetData);
    onClose();
  };

  /*
   * Reset form when closing
   */
  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={`
        fixed
        inset-0
        z-50
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
      `}
      aria-hidden={!isOpen}
    >
      {/* ==========================================
          BACKDROP
      ========================================== */}

      <div
        className={`
          absolute
          inset-0
          bg-black/40
          transition-opacity
          duration-300
          ease-in-out
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
        onClick={handleClose}
      />

      {/* ==========================================
          DRAWER
      ========================================== */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="budget-drawer-title"
        className={`
          absolute
          right-0
          top-0
          flex
          h-full
          w-full
          max-w-lg
          flex-col
          bg-white
          shadow-2xl

          transform
          transition-transform
          duration-300
          ease-in-out

          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* ========================================
            HEADER
        ======================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-5
          "
        >
          <div>
            <h2
              id="budget-drawer-title"
              className="
                text-lg
                font-semibold
                text-slate-900
              "
            >
              {isEditMode ? "Edit Budget" : "Add New Budget"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditMode
                ? "Update your budget details."
                : "Create a monthly spending limit."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close budget drawer"
            className="
              rounded-lg
              p-2
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-700
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ========================================
            FORM
        ======================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            flex
            min-h-0
            flex-1
            flex-col
          "
        >
          {/* ======================================
              FORM CONTENT
          ====================================== */}

          <div
            className="
              flex-1
              space-y-6
              overflow-y-auto
              p-6
            "
          >
            {/* ====================================
                CATEGORY
            ==================================== */}

            <div>
              <label
                htmlFor="budget-category"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Category
              </label>

              <select
                id="budget-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-100
                "
              >
                <option value="">Select category</option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* ====================================
                AMOUNT
            ==================================== */}

            <div>
              <label
                htmlFor="budget-amount"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Budget Amount
              </label>

              <div className="relative">
                <span
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-sm
                    font-medium
                    text-slate-500
                  "
                >
                  ₹
                </span>

                <input
                  id="budget-amount"
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0"
                  required
                  className="
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    py-3
                    pl-9
                    pr-4
                    text-sm
                    text-slate-700
                    outline-none
                    transition
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                />
              </div>
            </div>

            {/* ====================================
                MONTH
            ==================================== */}

            <div>
              <label
                htmlFor="budget-month"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Month
              </label>

              <select
                id="budget-month"
                value={month}
                onChange={(event) => setMonth(event.target.value)}
                required
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-100
                "
              >
                {months.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* ====================================
                DESCRIPTION
            ==================================== */}

            <div>
              <label
                htmlFor="budget-description"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Description
              </label>

              <textarea
                id="budget-description"
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Add a note about this budget..."
                className="
                  w-full
                  resize-none
                  rounded-lg
                  border
                  border-slate-200
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-100
                "
              />
            </div>

            {/* ====================================
                BUDGET TIP
            ==================================== */}

            <div
              className="
                rounded-lg
                border
                border-indigo-100
                bg-indigo-50
                p-4
              "
            >
              <p
                className="
                  text-sm
                  font-medium
                  text-indigo-900
                "
              >
                Budget tip
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-indigo-700
                "
              >
                Set a realistic limit based on your previous spending. You can
                update the budget later.
              </p>
            </div>
          </div>

          {/* ========================================
              FOOTER
          ======================================== */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-3
              border-t
              border-slate-200
              bg-white
              px-6
              py-4
            "
          >
            <button
              type="button"
              onClick={handleClose}
              className="
                rounded-lg
                border
                border-slate-200
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-50
                focus:outline-none
                focus:ring-2
                focus:ring-slate-300
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                rounded-lg
                bg-indigo-600
                px-5
                py-2.5
                text-sm
                font-medium
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
              {isEditMode ? "Update Budget" : "Add Budget"}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
