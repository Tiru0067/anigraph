import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export const CustomDropdown = ({
  options = [],
  value,
  onChange,
  placeholder,
  allowDeselect = false,
  icon: Icon,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption
    ? selectedOption.label
    : placeholder || options[0]?.label || "";

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val) => {
    if (allowDeselect && val === value) {
      onChange("ALL");
    } else {
      onChange(val);
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Dropdown Trigger Button (Sized to the longest option to prevent layout shifts) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-1.75 rounded-xl text-xs font-medium bg-background-200 border transition-all cursor-pointer select-none whitespace-nowrap ${
          isOpen
            ? "border-primary-400 text-typography-100 ring-2 ring-primary-500/20 shadow-md"
            : selectedOption
              ? "border-primary-400/40 text-typography-100 bg-background-200"
              : "border-background-400/30 text-typography-200 hover:text-typography-100 hover:bg-background-300"
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-3.5 h-3.5 text-primary-300 shrink-0" />}

          {/* CSS Grid Sizer: sets container width to the widest label */}
          <div className="grid text-left">
            {options.map((opt) => (
              <span
                key={opt.value}
                className="invisible col-start-1 row-start-1 pointer-events-none select-none"
                aria-hidden="true"
              >
                {opt.label}
              </span>
            ))}
            {placeholder && (
              <span
                className="invisible col-start-1 row-start-1 pointer-events-none select-none"
                aria-hidden="true"
              >
                {placeholder}
              </span>
            )}
            <span className="col-start-1 row-start-1 truncate">
              {displayLabel}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-typography-400 transition-transform duration-200 shrink-0 ml-1 ${
            isOpen ? "rotate-180 text-primary-300" : ""
          }`}
        />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1.5 w-full min-w-full rounded-xl bg-background-200 border border-background-400/40 backdrop-blur-xl shadow-xl shadow-background-000/60 p-1 z-40 flex flex-col gap-0.5"
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-typography-200 hover:text-typography-100 hover:bg-background-300 transition-colors text-left cursor-pointer whitespace-nowrap"
                role="option"
                aria-selected={isSelected}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-primary-300 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
