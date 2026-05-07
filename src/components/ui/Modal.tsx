import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
}: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
      ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200
        ${open ? "opacity-100" : "opacity-0"}`}
      />

      <div
        className={`relative bg-white rounded-xl shadow-lg w-full max-w-md mx-4
        transform transition-all duration-200
        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        {(title || description) && (
          <div className="flex items-start justify-between p-5 border-b border-[#D9DFE4]">
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-gray-500 mt-1">{description}</p>
              )}
            </div>

            <X
              onClick={onClose}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            />
          </div>
        )}

        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
