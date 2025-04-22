import { useState } from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div
            className={`app-layout h-screen flex justify-center items-center ${
                darkMode
                    ? "bg-gray-900 text-white"
                    : "bg-gradient-to-br from-[#FFEDD5] to-[#FDBA74]"
            }`}
        >
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="absolute top-4 right-10 shadow-2xl bg-white rounded-full"
            >
                {darkMode ? "🌑" : "☀️"}
            </button>
            <main className="max-w-600">{children}</main>
        </div>
    );
};
