import Image from 'next/image'

export default function NavigationBar() {
    return (
    <>
        <nav className="bg-fuchsia-100 rounded-3xl">
        <div className="mx-auto max-w-7x lg:px-6 lg:py-4">
            <div className="relative flex items-center justify-between">
            <div className="flex flex-shrink-0 items-center">
                    <Image src="/Group2Logo.png" alt="Your Company" width={90} height={80}/>                
                </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch">
                <div className="hidden sm:block">
                    <div className="flex space-x-4">
                        <a href="#" className="rounded-md px-3 py-2 text-xs font-medium text-black hover:text-white">Contacts</a>
                        <a href="#" className="rounded-md px-3 py-2 text-xs font-medium text-black hover:text-white">Notes</a>
                    </div>
                </div>
            </div>
            <div className="flex items-center sm:static sm:inset-auto">
                <a href="#" className="rounded-md px-3 py-2 text-xs font-medium text-black hover:text-white">Login</a>
                <a href="#" className="rounded-3xl px-6 py-2 text-xs font-medium text-white bg-violet-400 hover:text-white">Sign in</a>
            </div>
            </div>
        </div>
        </nav>
    </>
    );
}