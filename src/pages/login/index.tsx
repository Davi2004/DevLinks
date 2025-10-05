import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/input"
import { useState } from "react"
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth"
import { BiLogOut } from "react-icons/bi"
import toast from "react-hot-toast"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if(email === '' || password === '') {
            toast.error("Preencha todos os campos!")
            return
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("Logado com sucesso!")
            navigate("/home")
        } catch (error) {
            if (error) {
                toast("Erro ao tentar fazer login. Tente novamente.", {
                    icon: '⚠️',
                    duration: 2000,
                });
            }
        }

        setEmail("")
        setPassword("")
    }
    
    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
            
            <button className="absolute top-4 left-4 md:top-6 md:left-6">
                <Link to="/"> 
                    <BiLogOut size={28} color="#FFF" /> 
                </Link>
            </button>
            
            <h1 className="mt-11 text-white mb-7 font-bold text-6xl select-none">
                Dev
                <span className="relative z-10 -ml-2.5 bg-gradient-to-r from-yellow-500 to-orange-800 bg-clip-text text-transparent">Link</span>
            </h1>

            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-4">
                
                <Input
                    placeholder="Digite o seu email..."
                    type="email"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value) }
                />

                <Input
                    placeholder="**********"
                    type="password"
                    value={password}
                    onChange={ (e) => setPassword(e.target.value) }
                />

                <button
                    type="submit"
                    className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white cursor-pointer hover:bg-blue-700 transition-colors"
                >
                    Entrar
                </button>
                
            </form>

        </div>
    )
}