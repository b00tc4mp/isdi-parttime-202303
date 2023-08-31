export default function SearchInput({ children, className, ...props }) {
    return(
        <input
            type="text"
            id="Search"
            placeholder="Search for..."
            className="w-full rounded-md border-gray-light py-2.5 pe-10 shadow-sm sm:text-sm"
        />
    )
}

