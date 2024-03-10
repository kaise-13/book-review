import { useState } from "react";
import { Header } from "../components/Header";
import { useCookies } from "react-cookie"
import axios from "axios";
import { url } from "../const";
import { useNavigate } from "react-router";

export const RegistBook = () => {
    const [title, setTitle] = useState("");
    const handleTitleChange = (e) => setTitle(e.target.value);
    const [url2, setUrl] = useState("");
    const handleUrlChange = (e) => setUrl(e.target.value);
    const [detail, setDetail] = useState("");
    const handleDetailChange = (e) => setDetail(e.target.value);
    const [review, setReview] = useState("");
    const handleReviewChange = (e) => setReview(e.target.value);
    const [errorMessage, setErrorMessage] = useState("");
    const [cookies] = useCookies();
    const navigate = useNavigate();

    const registBook = () => {
      const data = {
        title: title,
        url: url2,
        detail: detail,
        review: review,
      }

      axios
        .post(`${url}/books`, data, {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .then(() => {
          navigate('/')
        })
        .catch((err) => {
          setErrorMessage(`書籍の登録に失敗しました。${err}`)
        })
    }

    return (
        <>
          <div>
            <Header />
            <main className="book-list">
              <p className="book-list__error-message">{errorMessage}</p>
              <div>
                <div>
                  <h2>書籍登録</h2>
                </div>
                <div>
                  <form>
                    <label>タイトル</label>
                    <br />
                    <input onChange={handleTitleChange}/>
                    <br />
                    <label>url</label>
                    <br />
                    <input onChange={handleUrlChange}/>
                    <br />
                    <label>書籍詳細</label>
                    <br />
                    <input onChange={handleDetailChange}/>
                    <br />
                    <label>レビュー</label>
                    <br />
                    <input onChange={handleReviewChange}/>
                  </form>
                </div>
              </div>
              <div>
                <button onClick={registBook}>書籍登録</button>
              </div>
            </main>
          </div>
        </>
    );
};