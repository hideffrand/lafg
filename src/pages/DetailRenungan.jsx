import "../index.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PageHelmet from "../SEO/PageHelmet";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

export default function DetailRenungan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dbRenungan = import.meta.env.VITE_REACT_RENUNGAN_DBNAME;
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [metaProps, setMetaProps] = useState({});

  async function getDetailRenungan() {
    setLoading(true);
    const res = await getDoc(doc(db, dbRenungan, id));
    if (res.exists()) {
      setDetails(res.data());
      setLoading(false);
    } else {
      navigate("*");
      console.log("No such document!");
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getDetailRenungan();
    setMetaProps({
      title: details.title,
      author: `${details.author}, hideffrand`,
      desc: `${details.verse} | ${details.content?.slice(0, 100)}...`,
      url: `https://www.lafg.online/renungan/${id}`,
    });
    setMetaProps({
      title: "Lentera Jiwa",
      author: "Deffrand Farera",
      desc: "Kejadian 1:1 | Pada mulanya Allah menciptakan langit dan bumi beserta isinya...",
      url: `https://www.lafg.online/renungan/${id}`,
    });
  }, []);

  return (
    <>
      <PageHelmet
        title="Lentera Jiwa"
        author="Deffrand Farera"
        desc="Kejadian 1:1 | Pada mulanya Allah menciptakan langit dan bumi beserta isinya..."
        url={`https://www.lafg.online/renungan/${id}`}
      />
      {loading && <Loader />}
      <Navbar />
      <div className="detailRenungan">
        <div className="container">
          <h1>{details.title}</h1>
          <p id="verse">{details.verse}</p>
          <br />
          <p id="content">{details.content}</p>
          <br />
          <p>{details.author}</p>
          <p>{details.postedAt}</p>
          <span>
            <span></span>
            <div className="buttons">
              <button>
                <ion-icon name="heart-outline"></ion-icon>
              </button>
              <div className="shareContainer">
                <button></button>
              </div>
            </div>
          </span>
          {/* <button onClick={() => navigate(`/renungan/${}/${index + 1}`)}>Next</button> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
