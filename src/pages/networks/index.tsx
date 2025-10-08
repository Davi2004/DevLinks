import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { db, auth } from '../../services/firebaseConnection'
import { setDoc, getDoc, doc } from 'firebase/firestore'
import toast from "react-hot-toast";

export function Networks() {
    const [facebook, setFacebook] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [instagram, setInstagram] = useState("");
        
    useEffect(() => {
        function loadLinks() {
            const user = auth.currentUser;
            if (!user) return;
            const docRef = doc(db, "users", user.uid, "social", "links");
            
            getDoc(docRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setFacebook(snapshot.data()?.facebook || "");
                    setWhatsapp(snapshot.data()?.whatsapp || "");
                    setInstagram(snapshot.data()?.instagram || "");
                }
            })
        }

        loadLinks();
    }, [])
    
    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        const user = auth.currentUser;
        if (!user) return;
        
        await setDoc(doc(db, "users", user.uid, "social", "links"), {
            facebook: facebook,
            whatsapp: whatsapp,
            instagram: instagram
        })

        .then(() => {
            toast.success("Redes sociais salvas com sucesso! ✅");
        })
        .catch((error) => {
            console.log(`Erro ao salvar: ${error}`);
            toast.error("Erro ao salvar redes sociais 😢");
        })
    }
    
    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-white text-2xl font-medium mt-8 mb-4"> Minhas Redes Sociais </h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2"> Link do Facebook </label>                
                <Input
                    type="url"
                    placeholder="Digite a url do Facebook..."
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2"> Link do WhatsApp </label>
                <Input
                    type="url"
                    placeholder="Digite a url do WhatsApp..."
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2"> Link do Instagram </label>
                <Input
                    type="url"
                    placeholder="Digite a url do Instagram..."
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <button 
                    type="submit"
                    className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex cursor-pointer mb-7 font-medium"
                >
                    Salvar
                </button>
                
            </form>
            
        </div>
    )
}