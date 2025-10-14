import { Link } from "react-router-dom";

export function HomeScreen() {
    return (
        <div className="relative flex w-full h-screen items-center justify-center flex-col">
            
            <h1 className="mt-11 text-white mb-2 font-bold text-8xl select-none">
                Dev
                <span className="relative z-10 -ml-5 bg-gradient-to-r from-yellow-500 to-orange-800 bg-clip-text text-transparent">
                    Link
                </span>
            </h1>

            <p className="text-white sm:text-lg md:text-2xl"> O seu gerenciador de links para desenvolvedores </p>

            <div className="flex gap-3 mt-4">
                <span className="cursor-pointer text-center border border-yellow-600 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-1 px-3 rounded-md hover:scale-105 transition transform">
                    <Link to="/register">
                        Vamos começar?
                    </Link>
                </span>
                <span className="cursor-pointer text-center border border-yellow-600 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded-md hover:scale-105 transition transform">
                    <Link to="/feed">
                        <span> Ver Feed Público </span>
                    </Link>
                </span>
            </div>
            
        </div>
    )
}