
import { BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div>
            <main className="flex min-h-screen items-center justify-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-400 text-xl">404</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                        Página não encontrada
                    </h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                        Desculpe, não conseguimos encontrar a página que você está procurando.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="rounded-md bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-400 flex flex-col items-center justify-center"
                        >
                            <BiHome size={20}/>
                            Volte para o inicio
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}