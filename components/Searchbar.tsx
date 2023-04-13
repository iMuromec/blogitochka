import { cn } from "@/lib/utils";

interface SearchbarProps {
  searchRef: any;
  handleSearch: () => void;
  className?: string;
}
export default function Searchbar({
  searchRef,
  handleSearch,
  className,
}: SearchbarProps) {
  return (
    <div className={cn("items-center w-full md:w-[50%]", className)}>
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Поиск
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            onChange={handleSearch}
            ref={searchRef}
            type="search"
            id="default-search"
            className="block w-full p-2 pt-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
            placeholder="Поиск..."
            required
          />
        </div>
      </form>
    </div>
  );
}
