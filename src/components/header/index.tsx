import { BiLogOut, BiLogIn } from "react-icons/bi"
import { Link } from "react-router-dom"

import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"

export function Header({ showLogin = false }) {

    async function handleLogout() {
        signOut(auth);
    }
    
    return (
        <header className="flex justify-between items-center w-full max-w-2xl mt-4 px-1">
            <nav className="w-full bg-white h-12 flex items-center justify-between px-4 rounded-md">

                <div className="flex gap-4 font-medium">

                    <Link to="/" className="hover:text-blue-600"> Home </Link>
                    <Link to="/admin" className="hover:text-blue-600"> Links </Link>
                    <Link to="/admin/social" className="hover:text-blue-600"> Redes Sociais </Link>
                    
                </div>
                
                {showLogin ? (
                    <button>
                        <Link to="/login">
                            <BiLogIn size={28} className="text-black hover:text-blue-600 transition-colors" />
                        </Link>
                    </button>
                ) : (
                    <button onClick={handleLogout} className="cursor-pointer">
                        <BiLogOut size={28} color="#DB2629" />
                    </button>
                )}
                
            </nav>
            
        </header>
    )
}