export default function Page() {
    return (
        <div className="flex flex-col pt-20 w-full h-screen items-start gap-8">
            <h1 className="text-black text-3xl font-bold">Contacts</h1>
            <div className="flex justify-start w-full">
                    <input type="search" id="search-dropdown" className="p-2.5 w-full text-sm text-gray-900 rounded-l-lg bg-gray-200"/>
                    <button type="submit" className="p-2.5 text-sm font-medium text-white bg-gray-200 rounded-e-l focus:ring-4 rounded-r-lg focus:outline-none dark:bg-gray-200 dark:hover:bg-gray-200 dark:focus:ring-gray-500">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
            </div>
        </div>
    );
}