import "/src/index.css";
import { v4 as uuid } from 'uuid';
import { useEffect, useRef, useState } from "react";
import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "/src/config/firebase.js";
import Loader from "../components/Loader";
import admin from '../assets/admin.png'
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const dbRenungan = import.meta.env.VITE_REACT_RENUNGAN_DBNAME
    const dbTodos = import.meta.env.VITE_REACT_TODO_DBNAME
    const navigate = useNavigate()
    const formRef = useRef()
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [propPopup, setPropPopup] = useState('')
    const [changeSection, setChangeSection] = useState('')
    const [formTitle, setFormTitle] = useState('Add new Renungan')
    const [showForm, setShowForm] = useState(false)

    const [listRenungan, setListRenungan] = useState([])
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const [postDate, setPostDate] = useState('')
    const [editDate, setEditDate] = useState('')
    const [title, setTitle] = useState('')
    const [updateId, setUpdateId] = useState(null)
    const [verse, setVerse] = useState('')

    const [todoList, setTodoList] = useState([])
    const [note, setNote] = useState('')

    async function handleSubmitRenungan(e) {
        e.preventDefault();
        try {
            setLoading(true)
            const uniqueId = uuid()
            const docRef = doc(db, dbRenungan, (updateId ? updateId : uniqueId))
            await setDoc(docRef, {
                author: author,
                content: content,
                postedAt: postDate,
                updatedAt: editDate ? editDate : null,
                title: title,
                verse: verse,
            });
            setLoading(false)
            handlePopup('Data added succesfully!')
            getRenungan()
            formRef.current.reset();
            setTitle('')
            setPostDate('')
            setAuthor('')
            setVerse('')
            setContent('')
            setUpdateId('')
            setFormTitle('Add new renungan')
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
    

    async function getRenungan() {
        let listData = [];
        const querySnapshot = await getDocs(collection(db, dbRenungan));
        querySnapshot.forEach((doc) => {
            listData.push({
                docId: doc.id,
                data: doc.data()
            })
        });
        setListRenungan(listData)
    }

    async function delRenungan(id) {
        try {
            setLoading(true)
            await deleteDoc(doc(db, dbRenungan, id))
            setLoading(false)
            handlePopup('Data Deleted')
            getRenungan()
        } catch (error) {
            console.log("Error Deleting:", error)
        }
    }

    function handleEditRenungan(props) {
        setFormTitle(`Edit Renungan ${props.id}`)
        setUpdateId(props.id)
        setTitle(props.pushTitle)
        setAuthor(props.pushAuthor)
        setPostDate(props.pushPostedAt)
        setEditDate(new Date())
        setVerse(props.pushVerse)
        setContent(props.pushContent)
    }

    async function handleSubmitTodo(e) {
        e.preventDefault();
        try {
            setLoading(true)
            const uniqueId = uuid()
            const docRef = doc(db, dbTodos, uniqueId);
            await setDoc(docRef, {
                note: note,
            });
            setLoading(false)
            handlePopup('Data added succesfully!')
            setNote('')
            getTodos()
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    } 

    async function delTodo(id) {
        try {
            setLoading(true)
            await deleteDoc(doc(db, dbTodos, id))
            setLoading(false)
            handlePopup('Data Deleted')
            getTodos()
        } catch (error) {
            console.log("Error Deleting:", error)
        }
    }

    async function getTodos() {
        let listData = [];
        const querySnapshot = await getDocs(collection(db, dbTodos));
        querySnapshot.forEach((doc) => {
            listData.push({
                docId: doc.id,
                data: doc.data()
            })
        });
        setTodoList(listData)
    }

    const ListRenungan = () => {
        return (
            <>
                <table cellSpacing={0}>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Date Posted</th>
                        <th>Author</th>
                        <th>Content</th>
                        {/* <th></th>  */}
                        <th id="tdActions">Actions</th>
                    </tr>
                    {listRenungan.map((renungan, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{renungan.data.title}</td>
                            <td>{renungan.data.postedAt}</td>
                            <td>{renungan.data.author}</td>
                            <td>{renungan.data.content.slice(0,10)}...</td>
                            {/* <td id="content">link to page</td> */}
                            <td id="tdActions">
                                <button id="editBtn" onClick={() => handleEditRenungan({
                                    id: renungan.docId,
                                    pushTitle: renungan.data.title,
                                    pushPostedAt: renungan.data.postedAt,
                                    pushAuthor: renungan.data.author,
                                    pushVerse: renungan.data.verse,
                                    pushContent: renungan.data.content,
                                })}>Edit</button>
                                <button id="delBtn" onClick={() => delRenungan(renungan.docId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </table>
            </>
        )
    }

    const Todo = () => {
        return (
            <>
                {todoList?.map((item, i) => (
                    <div className="noteContainer" key={i}>
                        <p>{i + 1}. {item.data.note}</p>
                        <span>
                            <button onClick={() => delTodo(item.docId)}><ion-icon id="icon" name="trash-outline"></ion-icon></button>
                        </span>
                    </div>
                ))}
            </>
        )
    }

    const Popup = () => {
        return (
            <>
                <div className="popup" style={{ display: showPopup ? 'flex' : 'none' }}>
                    <div className="container">
                        <section>
                            <span></span>
                            <div className="icon">
                                <ion-icon id="icons" name="checkmark-outline"></ion-icon>
                            </div>
                            <p onClick={() => setShowPopup(false)}>x</p>
                        </section>
                        <h1>{ propPopup }</h1>
                    </div>
                </div>
            </>
        )
    }

    function handlePopup(text) {
        const propText = text
        setPropPopup(propText)
        setShowPopup(true)
        setTimeout(() => {
            setShowPopup(false)
        }, 1000);
    }

    function handleExit() {
        localStorage.clear()
        navigate('/')
    }

    useEffect(() => {
        getRenungan()
        getTodos()
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Popup />
            <div className="dashboardNavbar">
                <section>
                    <h1>Hey, Admin!</h1>
                </section>
                <section>
                    <button onClick={() => setChangeSection('')}>Home</button>
                    <button onClick={() => setChangeSection('addJadwal')}>Jadwal</button>
                    <button onClick={() => setChangeSection('addRenungan')}>Renungan</button>
                    <button onClick={() => handleExit()}>Exit</button>
                </section>
            </div>
            <div className="dashboard">
                <div className="container">
                    {changeSection == '' &&
                        <div className="homeSection">
                            <div className="image">
                                <img src={admin} alt="" />
                            </div>
                            <div className="todo">
                                <h1>To-do list </h1>
                                <form ref={formRef} action="" onSubmit={handleSubmitTodo}>
                                    <input type="text" onChange={(e) => setNote(e.target.value)} value={note} placeholder="Add new note..."/>
                                    <button type="submit">+</button>
                                </form>
                                <Todo />
                            </div>
                        </div>
                    }
                    {changeSection == 'addJadwal' && 
                        <section>

                        </section>
                    }
                    {changeSection == 'addRenungan' &&
                        <section>
                            <div className="dataSection">
                                <button onClick={() => setShowForm(!showForm)}>
                                    {showForm ? <p>Cancel</p> : <p>Add new</p>}
                                </button>
                                <ListRenungan />
                            </div>
                            {showForm && 
                                <form ref={formRef} action="" onSubmit={handleSubmitRenungan}>
                                    <h3>{formTitle}</h3>
                                    <label htmlFor="title">Judul:</label><br />
                                    <input id="title" type="text" onChange={(e) => setTitle(e.target.value)} value={title} /> <br />
                                    <p onClick={() => setTitle('Lentera Jiwa')}>+ Lentera Jiwa</p><br />
                                    <label htmlFor="date">Tanggal</label><br />
                                    <input id="date" type="date" onChange={(e) => setPostDate(e.target.value)} value={postDate}/> <br />
                                    <label htmlFor="author">Penulis:</label><br />
                                    <input id="author" type="text" onChange={(e) => setAuthor(e.target.value)} value={author} /> <br />
                                    <span style={{display: 'flex', gap: '24px'}}>
                                        <p onClick={() => setAuthor('Pdt. I Ketut Miasa.S.th.M.Div.')}>+ Pdt. Miasa</p>
                                        <p onClick={() => setAuthor('Pdt. Klemens Hendrik Dubulie.S.th.M.Div.')}>+ Pdt. Klemens</p>
                                        <p onClick={() => setAuthor('')}>+ Others</p>
                                    </span>
                                    <br />
                                    <label htmlFor="verse">Ayat:</label><br />
                                    <input id="verse" type="text" onChange={(e) => setVerse(e.target.value)} value={verse}/> <br />
                                    <label htmlFor="content">Content: </label><br />
                                    <textarea id="content" type="text" onChange={(e) => setContent(e.target.value)} value={content}/><br />
                                    <button type="submit" id="submitBtn">Publish</button>
                                </form>
                            }
                        </section>
                    }
                </div>
            </div>
      </>
  )
}
