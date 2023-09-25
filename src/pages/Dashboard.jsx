import "/src/index.css";
import { useRef, useState } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "/src/config/firebase.js";
import Loader from "../components/Loader";
import Popup from "../components/Popup";

export default function Dashboard() {
    const [loading, setLoading] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [verse, setVerse] = useState("");
    const [changeSection, setChangeSection] = useState('')
    const formRef = useRef();

    async function handleSubmitRenungan(e) {
        e.preventDefault();
        try {
            setLoading(true)
            const uniqueId = author.slice(0, 1) + date.slice(0, 4) + verse.slice(0, 3);
            const docRef = doc(db, "renungan", uniqueId);
            await setDoc(docRef, {
                author: author,
                content: content,
                posted_at: date,
                updated_at: null,
                title: title,
                verse: verse,
            });
            setLoading(false)
            alert("Document added succesfully!!");
            formRef.current.reset();
        } catch (error) {
        console.error("Error adding document: ", error);
        }
    }
    
    const [name, setName] = useState('')
    const [alias, setAlias] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [email, setEmail] = useState('')

    async function handleSubmitPemuda(e) {
        e.preventDefault();
        try {
            setLoading(true)
            const uniqueId = name.slice(0, 1) + birthDate.slice(0, 4);
            const docRef = doc(db, "members", uniqueId);
            await setDoc(docRef, {
                name: name,
                alias: alias,
                birth_date: birthDate,
                email: email,
            });
            setLoading(false)
            alert("Document added succesfully!!");
            formRef.current.reset();
        } catch (error) {
        console.error("Error adding document: ", error);
        }
    }

//   async function getRenungan() {
//     let listRenungan = [];
//     const querySnapshot = await getDocs(collection(db, "renungan"));
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
//       listRenungan.push(doc.data());
//       console.log(listRenungan);
//     });
//   }

    return (
        <>
            {loading && <Loader />}
            <div className="dashboard">
                <section>
                    <h1>Hey, Admin!</h1>
                    <div className="buttons">
                        <button onClick={() => setChangeSection('')}>Home</button>
                        <button onClick={() => setChangeSection('addRenungan')}>Renungan</button>
                        <button onClick={() => setChangeSection('addMember')}>Pemuda</button>
                    </div>
                </section>
                <section>
                    {changeSection == 'addRenungan' &&
                        <>
                            <h1>Add new article</h1>
                            <form ref={formRef} action="" onSubmit={handleSubmitRenungan}>
                                <label htmlFor="title">Judul:</label><br />
                                <input id="title" type="text" onChange={(e) => setTitle(e.target.value)} /> <br />
                                <label htmlFor="date">Tanggal</label><br />
                                <input id="date" type="date" onChange={(e) => setDate(e.target.value)} /> <br />
                                <label htmlFor="author">Penulis:</label><br />
                                <input id="author" type="text" onChange={(e) => setAuthor(e.target.value)} /> <br />
                                <label htmlFor="verse">Ayat:</label><br />
                                <input id="verse" type="text" onChange={(e) => setVerse(e.target.value)} /> <br />
                                <label htmlFor="content">Content: </label><br />
                                <textarea id="content" type="text" onChange={(e) => setContent(e.target.value)} /><br />
                                <button type="submit">submit</button>
                            </form>
                        </>
                    }
                    {changeSection == 'addMember' && 
                        <>
                            <h1>Add new member</h1>
                            <form ref={formRef} action="">
                                <label htmlFor="name">Nama: </label><br />
                                <input id="name" type="text" onChange={(e) => setName(e.target.value)} /> <br />
                                <label htmlFor="email">Email</label><br />
                                <input id="email" type="text" onChange={(e) => setEmail(e.target.value)} /> <br />
                                <label htmlFor="alias">Alias: </label><br />
                                <input id="name" type="text" onChange={(e) => setAlias(e.target.value)} /> <br />
                                <label htmlFor="birthDate">Tanggal lahir:</label><br />
                                <input id="birthDate" type="date" onChange={(e) => setBirthDate(e.target.value)} /> <br />
                                <button type="submit" onClick={handleSubmitPemuda}>submit</button>
                            </form>
                        </>
                        
                    }
                </section>
            </div>
      </>
  )
}
