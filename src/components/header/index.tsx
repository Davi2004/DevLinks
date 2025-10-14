import { useEffect, useState } from "react"
import { BiLogOut } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"

import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"
import toast from "react-hot-toast"

export function Header() {

    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [])

    async function handleLogout() {
        signOut(auth);
        navigate("/")
        toast.success("Deslogado com sucesso!")
    }
    
    return (
        <header className="flex justify-between items-center w-full max-w-2xl mt-4 px-1">
            <nav className="w-full bg-white h-12 flex items-center justify-between px-4 rounded-md">

                {user ? (
                    <>
                        <div className="flex gap-4 font-medium">
                            <Link to="/home" className="hover:text-blue-600"> Home </Link>
                            <Link to="/admin" className="hover:text-blue-600"> Links </Link>
                            <Link to="/admin/social" className="hover:text-blue-600"> Redes Sociais </Link>
                            <Link to="/feed" className="hover:text-blue-600"> Feed </Link>
                        </div>

                        <button onClick={handleLogout} className="cursor-pointer">
                            <BiLogOut size={28} color="#DB2629" />
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/" className="text-blue-600 font-medium">
                            Voltar ao Início
                        </Link>
                    </>
                )}
                
            </nav>
            
        </header>
    )
}