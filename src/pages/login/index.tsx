import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/input"
import { useState } from "react"
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth"
import { BiLogOut } from "react-icons/bi"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if(email === '' || password === '') {
            alert("Preencha todos os campos!")
            return
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("Logado com sucesso!")
            navigate("/admin", { replace: true })
        }) .catch((error) => {
            console.log("Erro ao fazer login:");
            console.log(error);
        })

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
            
            <Link to="/" className="select-none">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev
                <span className="relative z-10 -ml-2.5 bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span></h1>
            </Link>

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