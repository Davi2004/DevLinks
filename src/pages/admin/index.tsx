import { useEffect, useRef, useState, type FormEvent } from "react"
import { Header } from "../../components/header"
import { Input } from "../../components/input"

import { FiTrash } from 'react-icons/fi'
import { BiPencil } from 'react-icons/bi'
import { db, auth } from "../../services/firebaseConnection"
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore"
import toast from "react-hot-toast"

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin() {
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#F1F1F1")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#003399")

    const [links, setLinks] = useState<LinkProps[]>([])
    const [editData, setEditData] = useState({
        enabled: false,
        id: "",
    });

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect( () => {
        
        const user = auth.currentUser;
        if (!user) return;
        
        const linksRef = collection(db, "users", user.uid, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            // eslint-disable-next-line prefer-const
            let lista = [] as LinkProps[];

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
        
        return () => {
            unsub();
        }
        
    }, [] )
    
    function handleRegister(e: FormEvent) {
        e.preventDefault()

        const user = auth.currentUser;
        if (!user) return;

        if (nameInput === "" || urlInput === "") {
            toast.error("Preencha todos os campos!");
            return
        }

        if (editData.enabled) {
            handleSaveEdit();
            return;
        }

        addDoc(collection(db, "users", user.uid, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date()
        })

        .then(() => {
            toast.success("Link cadastrado com sucesso!");
            setNameInput("")
            setUrlInput("")
            setBackgroundColorInput("#003399")
            setTextColorInput("#F1F1F1")
        }) 
        .catch((error) => {
            console.log(`Erro ao cadastrar o link: ${error}`);
            toast.error("Erro ao salvar o link 😢");
        })
    }

    async function handleSaveEdit() {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "users", user.uid, "links", editData.id);

        await updateDoc(docRef, {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
        });

        setEditData({ enabled: false, id: "" });
        setNameInput("");
        setUrlInput("");
        setBackgroundColorInput("#0000ff");
        setTextColorInput("#ffffff");
        toast.success("Link editado com sucesso!");
    }    
    
    async function handleDelete(id: string) {
        
        const user = auth.currentUser;
        if (!user) return;
        
        const docRef = doc(db, "users", user.uid, "links", id);
        await deleteDoc(docRef)
        toast.success("Link excluído com sucesso!");
    }
    
    function handleEdit(link: LinkProps) {
        
        setNameInput(link.name);
        setUrlInput(link.url);
        setTextColorInput(link.color);
        setBackgroundColorInput(link.bg);
        
        setEditData({
            enabled: true,
            id: link.id,
        });
        
        inputRef.current?.focus();        
    }
    
    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl px-2" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2"> Nome do Link </label>
                <Input
                    placeholder="Nome do link..."
                    value={nameInput}
                    onChange={ (e) => setNameInput(e.target.value) }
                    ref={inputRef}
                />
                
                <label className="text-white font-medium mt-2 mb-2"> URL do Link </label>
                <Input
                    type="url"
                    placeholder="URL do link..."
                    value={urlInput}
                    onChange={ (e) => setUrlInput(e.target.value) }
                />

                <section className="flex gap-5 my-4">
                    <div className="flex gap-3 items-center">
                        <label className="text-white font-medium mt-2 mb-2"> Cor do Link </label>
                        <input 
                            type="color"
                            value={textColorInput}
                            onChange={ (e) => setTextColorInput(e.target.value) }
                            className="cursor-pointer w-15 h-10"
                        />
                    </div>

                    <div className="flex gap-3 items-center">
                        <label className="text-white font-medium mt-2 mb-2"> Fundo do Link </label>
                        <input 
                            type="color"
                            value={backgroundColorInput}
                            onChange={ (e) => setBackgroundColorInput(e.target.value) }
                            className="cursor-pointer w-15 h-10"
                        />
                    </div>
                </section>

                {nameInput !== "" && (
                    <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mt-2 mb-3"> Veja como está ficando: </label>
                        <article 
                            className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3"
                            style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
                        >
                            <p className="font-medium" style={{ color: textColorInput }}> {nameInput} </p>
                        </article>
                    </div>
                )}

                <button 
                    className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-2 flex justify-center items-center hover:bg-blue-700 transition-colors cursor-pointer"
                    type="submit"
                >
                    {editData.enabled ? "Salvar Edição" : "Cadastrar"}
                </button>
                
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl"> Meus Links </h2>

            {links.length === 0 ? (
                <p className="text-white font-medium"> Vocês ainda não cadastrou nenhum link😥 </p>
            ) : (
                links.map((link) => (
                    <article
                        key={link.id}
                        className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none transition-transform hover:scale-105"
                        style={{ backgroundColor: link.bg, color: link.color }}
                    >
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 font-medium"
                            style={{ color: link.color }}
                        >
                            {link.name}
                        </a>
                        <div className="flex items-center gap-3">
                            <button 
                                className="border border-dashed p-1 rounded cursor-pointer hover:bg-blue-900 transition-colors"
                                onClick={() => handleEdit(link)}
                            >
                                <BiPencil size={18} color="white" />
                            </button>
                            
                            <button
                                className="border border-dashed p-1 rounded cursor-pointer hover:bg-red-600 transition-colors"
                                onClick={() => handleDelete(link.id)}
                            >
                                <FiTrash size={18} color="#FFF"/>
                            </button>
                        </div>
                    </article>
                ))
            )}
            
        </div>
    )
}