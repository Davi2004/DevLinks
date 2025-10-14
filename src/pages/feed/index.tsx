import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { Header } from "../../components/header"

interface LinkProps {
    id: string
    name: string
    url: string
    bg: string
    color: string
}

interface UserProps {
    uid: string
    name: string
    email: string
    links: LinkProps[]
}

export function Feed() {
    const [users, setUsers] = useState<UserProps[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFeed() {
            console.log("🚀 Iniciando carregamento do feed...")
            setLoading(true)

            try {
                // 1️⃣ Busca todos os usuários cadastrados
                const usersRef = collection(db, "users")
                const usersSnapshot = await getDocs(usersRef)

                if (usersSnapshot.empty) {
                    console.warn("⚠️ Nenhum usuário encontrado na coleção 'users'.")
                    setUsers([])
                    setLoading(false)
                    return
                }

                const userList: UserProps[] = []

                // 2️⃣ Percorre cada usuário e busca seus links
                for (const userDoc of usersSnapshot.docs) {
                    const userData = userDoc.data()
                    const userId = userDoc.id

                    const linksRef = collection(db, "users", userId, "links")
                    const linksQuery = query(linksRef, orderBy("created", "asc"))
                    const linksSnapshot = await getDocs(linksQuery)

                    const links: LinkProps[] = linksSnapshot.docs.map((linkDoc) => ({
                        id: linkDoc.id,
                        name: linkDoc.data().name,
                        url: linkDoc.data().url,
                        bg: linkDoc.data().bg,
                        color: linkDoc.data().color,
                    }))

                    // Adiciona o usuário apenas se ele tiver links
                    if (links.length > 0) {
                        userList.push({
                            uid: userId,
                            name: userData.name || "Usuário sem nome",
                            email: userData.email || "Sem email",
                            links,
                        })
                    }
                }

                console.log(`✅ Feed carregado com sucesso (${userList.length} usuários encontrados).`)
                setUsers(userList)
            } catch (error) {
                console.error("❌ Erro ao carregar feed:", error)
            } finally {
                setLoading(false)
            }
        }

        loadFeed()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-white text-2xl font-medium">Carregando feed...</h1>
            </div>
        )
    }

    if (users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Header />
                <p className="text-white font-medium">Nenhum usuário com links cadastrados 😢</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center h-screen pb-7 px-2">
            <Header />
            <h1 className="text-3xl md:text-4xl font-bold text-white my-8">Feed de Links 🌐</h1>

            <main className="flex flex-col w-11/12 max-w-2xl gap-5">
                {users.map((user) => (
                    <section
                        key={user.uid}
                        className="bg-gray-900/60 border border-gray-700 rounded-2xl p-5 shadow-lg shadow-blue-900/20"
                    >
                        <h2 className="text-white font-bold text-2xl mb-3 text-center">
                            {user.name}
                        </h2>

                        <div className="flex flex-col gap-3">
                            {user.links.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center font-medium py-2 rounded-lg hover:scale-105 transition-transform"
                                    style={{ backgroundColor: link.bg, color: link.color }}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </div>
    )
}