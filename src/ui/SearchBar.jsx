import { HiOutlineSearch } from "react-icons/hi";
import { cn } from "../utils/helpers";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className,
  inputClassName,
  ariaLabel = "Search",
}) {
  return (
    <label className={cn("relative block w-full", className)}>
      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
        <HiOutlineSearch size={20} />
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn(
          "w-full rounded-2xl border border-slate-700/50 bg-primary-900/50 py-3 pl-12 pr-4 text-base text-gray-100 placeholder:text-gray-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40",
          inputClassName
        )}
      />
    </label>
  );
}

export default SearchBar;
