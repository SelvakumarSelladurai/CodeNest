import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { FiCommand, FiSearch, FiX } from "react-icons/fi";
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const SEARCH_PATH = "/concepts";

const isMac =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [isFocused, setIsFocused] = useState(false);

  const urlQuery =
    location.pathname === SEARCH_PATH
      ? (searchParams.get("q") ?? "")
      : null;

  useEffect(() => {
    if (urlQuery !== null) {
      setQuery(urlQuery);
    }
  }, [urlQuery]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        !!target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

      const isModifierK =
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k";

      const isSlash =
        event.key === "/" &&
        !isTyping &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey;

      if (isModifierK || isSlash) {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    navigate(`${SEARCH_PATH}?q=${encodeURIComponent(trimmedQuery)}`);
    inputRef.current?.blur();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Escape") return;

    if (query) {
      setQuery("");
    } else {
      event.currentTarget.blur();
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const showShortcutHint = !isFocused && query.length === 0;

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="w-full max-w-xl"
    >
      <label htmlFor="global-search" className="sr-only">
        Search concepts
      </label>

      <div
        className={[
          "group flex h-10 items-center gap-2.5 rounded-xl border bg-white px-3",
          "transition-all duration-200",
          "border-sky-100 hover:border-sky-200",
          "focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100",
        ].join(" ")}
      >
        <FiSearch
          size={17}
          aria-hidden="true"
          className="shrink-0 text-slate-400 transition-colors duration-200 group-focus-within:text-sky-600"
        />

        <input
          ref={inputRef}
          id="global-search"
          type="search"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search concepts..."
          className={[
            "min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none",
            "placeholder:text-slate-400",
            "[&::-webkit-search-cancel-button]:appearance-none",
          ].join(" ")}
        />

        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="flex size-5 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-sky-50 hover:text-sky-600 outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <FiX size={14} aria-hidden="true" />
          </button>
        )}

        {showShortcutHint && (
          <div
            aria-hidden="true"
            className="hidden shrink-0 items-center gap-1 rounded-md border border-sky-100 bg-sky-50 px-1.5 py-0.5 text-[11px] font-medium text-sky-700/60 sm:flex"
          >
            {isMac ? (
              <FiCommand size={11} />
            ) : (
              <span>Ctrl</span>
            )}
            <span>K</span>
          </div>
        )}
      </div>
    </form>
  );
}

export default SearchBar;