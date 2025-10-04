import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { db } from '../../services/firebaseConnection'
import { setDoc, getDoc, doc } from 'firebase/firestore'

export function Networks() {
    const [facebook, setFacebook] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [instagram, setInstagram] = useState("");
        
    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined) {
                    setFacebook(snapshot.data()?.facebook)
                    setWhatsapp(snapshot.data()?.whatsapp)
                    setInstagram(snapshot.data()?.instagram)
                }
            })
        }

        loadLinks();
    }, [])
    
    function handleRegister(e: FormEvent) {
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            facebook: facebook,
            whatsapp: whatsapp,
            instagram: instagram
        })

        .then(() => {
            console.log("Redes sociais cadastradas com sucesso!");
        })
        .catch((error) => {
            console.log(`Erro ao salvar ${error}`)
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