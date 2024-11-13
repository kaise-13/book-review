import { useCookies } from "react-cookie";
import { Header } from "../components/header/Header";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { url } from "../const";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const EditBook = () => {
    const { id } = useParams();
    const [cookies] = useCookies();
    const [title, setTitle] = useState("");
    const [url1, setUrl] = useState("");
    const [detail, setDetail] = useState("");
    const [review, setReview] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const navigate = useNavigate();

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleUrlChange = (e) => setUrl(e.target.value);
    const handleDetailChange = (e) => setDetail(e.target.value);
    const handleReviewChange = (e) => setReview(e.target.value);

    useEffect(() => {
        axios
            .get(`${url}/books/${id}`, {
              headers: {
                authorization: `Bearer ${cookies.token}`,
              },
            })
            .then((res) => {
              setTitle(res.data.title);
              setUrl(res.data.url);
              setDetail(res.data.detail);
              setReview(res.data.review);
            })
            .catch((err) => {
              setErrorMessage(`書籍の取得に失敗しました。${err}`)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const editBook = () => {
        const data = {
            title: title,
            url: url,
            detail: detail,
            review: review,
        }

        axios
            .put(`${url}/books/${id}`, data, {
                headers: {
                    authorization: `Bearer ${cookies.token}`,
                },
            })
            .then((res) => {
                navigate(`/detail/${id}`);
            })
            .catch((err) => {
                setErrorMessage(`書籍の更新に失敗しました。${err}`)
            })
    }
    const deleteBook = () => {
        axios
            .delete(`${url}/books/${id}`,{
                headers: {
                    authorization: `Bearer ${cookies.token}`,
                },
            })
            .then((res) => {
                navigate('/');
            })
            .catch((err) => {
                setErrorMessage(`書籍の削除に失敗しました。${err}`)
            })
    }

    return (
        <div>
            <Header />
            <main>
                <h2>書籍編集</h2>
                <p>{errorMessage}</p>
                <form>
                    <TextField 
                      id="standard-basic"
                      label="book title"
                      variant="standard"
                      onChange={handleTitleChange}
                      value={title}
                    />
                    <br />
                    <br />
                    <TextField
                      id="standard-basic"
                      label="book url"
                      variant="standard" 
                      onChange={handleUrlChange}
                      value={url1}
                    />
                    <br />
                    <br />
                    <br />
                    <TextField 
                      id="outlined-multiline-flexible"
                      label="book detail"
                      multiline
                      maxRows={4}
                      onChange={handleDetailChange} 
                      value={detail}
                    />
                    <br />
                    <br />
                    <br />
                    <TextField 
                      id="outlined-multiline-flexible"
                      label="book feedback"
                      multiline
                      maxRows={4}
                      onChange={handleReviewChange} 
                      value={review}
                    />
                </form>
                <br />
                    <Button variant="contained" color="info" style={{ marginRight: '8px' }} onClick={editBook}>更新</Button>
                    <Button variant="contained" sx={{background: "red", color: "white"}} onClick={deleteBook}>削除</Button>
            </main>
        </div>
    )
}