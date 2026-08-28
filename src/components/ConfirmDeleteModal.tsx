import { useEffect } from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";

interface ConfirmDeleteDrawerProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  itemName?: string;
  confirmText?: string;
  cancelText?: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteDrawer({
  isOpen,
  title = "Delete item?",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName,
  confirmText = "Delete",
  cancelText = "Cancel",
  isDeleting = false,
  onConfirm,
  onCancel,
}: ConfirmDeleteDrawerProps) {
  /*
   * Escape key
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isDeleting) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isDeleting, onCancel]);

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

  return (
    <div
      className={`
        fixed
        inset-0
        z-[100]
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
        onClick={() => {
          if (!isDeleting) {
            onCancel();
          }
        }}
      />

      {/* ==========================================
          RIGHT DRAWER
      ========================================== */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-drawer-title"
        className={`
          absolute
          right-0
          top-0
          flex
          h-full
          w-full
          max-w-md
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
              id="delete-drawer-title"
              className="
                text-lg
                font-semibold
                text-slate-900
              "
            >
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Confirm this action before continuing.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            aria-label="Close"
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className="flex-1 overflow-y-auto p-6">
          {/* WARNING ICON */}

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-red-50
            "
          >
            <AlertTriangle className="h-7 w-7 text-red-600" />
          </div>

          {/* MESSAGE */}

          <div className="mt-6">
            <h3
              className="
                text-base
                font-semibold
                text-slate-900
              "
            >
              Are you sure?
            </h3>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-slate-500
              "
            >
              {message}
            </p>
          </div>

          {/* ITEM */}

          {itemName && (
            <div
              className="
                mt-6
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-4
              "
            >
              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Item to delete
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  font-semibold
                  text-slate-800
                "
              >
                {itemName}
              </p>
            </div>
          )}

          {/* WARNING */}

          <div
            className="
              mt-6
              rounded-xl
              border
              border-red-100
              bg-red-50
              p-4
            "
          >
            <div className="flex gap-3">
              <AlertTriangle
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-red-500
                "
              />

              <p
                className="
                  text-xs
                  leading-5
                  text-red-700
                "
              >
                Deleting this item is permanent. You will not be able to recover
                it after deletion.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================
            FOOTER
        ======================================== */}

        <div
          className="
            border-t
            border-slate-200
            bg-white
            px-6
            py-4
          "
        >
          <div className="flex gap-3">
            {/* CANCEL */}

            <button
              type="button"
              onClick={onCancel}
              disabled={isDeleting}
              className="
                flex-1
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {cancelText}
            </button>

            {/* DELETE */}

            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="
                flex-1
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-red-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-red-700
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
                focus:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isDeleting ? (
                <>
                  <span
                    className="
                      h-4
                      w-4
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />

                  {confirmText}
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
