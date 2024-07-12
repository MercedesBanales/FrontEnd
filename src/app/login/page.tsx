import LoginForm from "@/components/LoginForm";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center p-4 gap-24 w-full">
            <h1 className="text-black text-3xl font-bold">Welcome</h1>
            <LoginForm />
        </div>
    );
}