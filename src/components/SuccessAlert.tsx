interface Props {
    message: string
    onClose : () => void
}

export default function SuccessAlert({ message, onClose } : Props) {
    return (
        <div className="bg-green-100 flex justify-between items-center gap-16 rounded-md absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-fit h-fit p-4" role="alert">
            <div className="flex w-full justify-start items-center gap-2">
                <svg className="w-6 h-6 text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd"/>
                </svg>
                <p className="text-green-800 text-sm">{message}</p>
            </div>
            <button className="" onClick={onClose}>
                <svg className="w-6 h-6 text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
            </button>
        </div>
    );
}