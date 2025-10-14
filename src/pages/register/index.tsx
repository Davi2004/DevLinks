import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/input"
import { useState } from "react"
import { auth, db } from "../../services/firebaseConnection"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { BiLogOut } from "react-icons/bi"
import toast from "react-hot-toast"

export function Cadastro() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()

        if (name === "" || email === "" || password === "") {
            toast.error("Preencha todos os campos!")
            return
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // Atualiza o nome do usuário no perfil
            await updateProfile(user, {
                displayName: name
            })

            // 🔹 Cria o documento do usuário no Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                email: user.email,
                createdAt: new Date()
            })

            toast.success("Conta criada com sucesso!")
            navigate("/login")
        } catch (error) {
            toast.error("Erro ao tentar cadastrar. Tente novamente.")
            console.log(`Erro: ${error}`)
        }

        setName("")
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
                <span className="relative z-10 -ml-2.5 bg-gradient-to-r from-yellow-500 to-orange-800 bg-clip-text text-transparent">
                    Cadastro
                </span>
            </h1>

            <form onSubmit={handleRegister} className="w-full max-w-xl flex flex-col px-4">
                <Input
                    placeholder="Digite seu nome..."
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    placeholder="Digite seu email..."
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    placeholder="Crie uma senha..."
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white cursor-pointer hover:bg-blue-700 transition-colors"
                >
                    Cadastrar
                </button>

                <p className="text-white text-center mt-4 text-sm">
                    Já possui uma conta?{" "}
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Faça login
                    </Link>
                </p>
            </form>

        </div>
    )
}
