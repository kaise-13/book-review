import { useState } from "react";
import { Header } from "../components/Header";
import { useCookies } from "react-cookie"
import axios from "axios";
import { url } from "../const";
import { useNavigate } from "react-router";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const RegistBook = () => {
    const [title, setTitle] = useState("");
    const [url2, setUrl] = useState("");
    const [detail, setDetail] = useState("");
    const [review, setReview] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [cookies] = useCookies();

    const navigate = useNavigate();

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleUrlChange = (e) => setUrl(e.target.value);
    const handleDetailChange = (e) => setDetail(e.target.value);
    const handleReviewChange = (e) => setReview(e.target.value);

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
                    <TextField
                      id="standard-basic"
                      label="book title"
                      variant="standard"
                      onChange={handleTitleChange}
                    />
                    <br />
                    <br />
                    <TextField
                      id="standard-basic"
                      label="book url"
                      variant="standard"
                      onChange={handleUrlChange}
                    />
                    <br />
                    <br />
                    <TextField
                      id="standard-basic"
                      label="book detail"
                      variant="standard"
                      onChange={handleDetailChange}
                    />
                    <br />
                    <br />
                    <TextField
                      id="standard-basic"
                      label="book feedback"
                      variant="standard" 
                      onChange={handleReviewChange}
                    />
                  </form>
                </div>
              </div>
              <br />
              <br />
              <div>
                <Button variant="contained" onClick={registBook}>書籍登録</Button>
              </div>
            </main>
          </div>
        </>
    );
};