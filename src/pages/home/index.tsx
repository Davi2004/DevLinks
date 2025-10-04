import {useEffect, useState} from "react"
import { Social } from "../../components/social"
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

import { db } from '../../services/firebaseConnection'
import { getDocs, getDoc, collection, orderBy, query, doc } from 'firebase/firestore'

import minhaImagem from '../../assets/IMG_6530.png'

import { Header } from "../../components/header"

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface SocialLinksProps {
    facebook: string;
    whatsapp: string;
    instagram: string;
} 

export function Home() {
    const [links, setLinks] = useState<LinkProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(db, "links")
            const queryRef = query(linksRef, orderBy("created", "asc"))

            getDocs(queryRef)
            .then((snapshot) => {
                const lista = [] as LinkProps[];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        bg: doc.data().bg,
                        color: doc.data().color
                    })
                })

                setLinks(lista);
                
            })
        }

        loadLinks();
        
    }, [])

    useEffect(() => {
        function loadSocialLinks() {
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            
            .then((snapshot) => {
                if(snapshot.data() !== undefined) {
                    setSocialLinks({
                        facebook: snapshot.data()?.facebook,
                        whatsapp: snapshot.data()?.whatsapp,
                        instagram: snapshot.data()?.instagram
                    })
                }
            })
        }

        loadSocialLinks();
        
    }, [])

    return (
        <div className="flex flex-col w-full items-center justify-center">

            <Header showLogin={true}/>
            
            <img src={minhaImagem} className="w-60 h-60 object-cover rounded-full mt-5 animate-float shadow-xl shadow-blue-600/30"/>
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-2"> Davi Rocha Pereira </h1>
            <span className="font-bold text-gray-50 mb-5 mt-3"> Veja meus links ⬇️ </span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">

                {links.map((link) => (
                    <section 
                        key={link.id}
                        className="font-bold mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
                        style={{ backgroundColor: link.bg, color: link.color }}
                    >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <p className="text-base md:text-lg"> {link.name} </p>
                        </a>
                    </section>
                ))}

                { socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center items-center gap-3 my-4">
                        <Social url={socialLinks.facebook}>
                            <FaFacebook size={30} color="#FFF" className="transition-transform hover:rotate-360 duration-1500" />
                        </Social>
                        
                        <Social url={socialLinks.whatsapp}>
                            <FaWhatsapp size={34} color="#FFF" className="transition-transform hover:rotate-360 duration-1500" />
                        </Social>
                        
                        <Social url={socialLinks.instagram}>
                            <FaInstagram size={32} color="#FFF"  className="transition-transform hover:rotate-360 duration-1500" />
                        </Social>
                    </footer>
                )}
                
            </main>
            
        </div>
    )
}