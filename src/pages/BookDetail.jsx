import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { Header } from "../components/header/Header";
import "./bookDetail.css";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, CardActions, Typography, Button, CircularProgress } from '@mui/material';

export const BookDetail = () => {
  const { id } = useParams();
  const [cookies] = useCookies();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [url1, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [isMine, setIsMine] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${url}/books/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        axios
          .post(
            `${url}/logs`,
            { selectBookId: id },
            {
              headers: {
                authorization: `Bearer ${cookies.token}`,
              },
            }
          )
          .catch((err) => {
            setErrorMessage(`ログの送信に失敗しました。${err}`);
          });
        setIsLoading(false);
        setTitle(res.data.title);
        setUrl(res.data.url);
        setDetail(res.data.detail);
        setReview(res.data.review);
        setIsMine(res.data.isMine);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(`書籍情報の取得に失敗しました。${err}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Card
            sx={{
              width: '100%',
              maxWidth: 500,
              p: 2,
              border: '1px solid rgba(0, 0, 0, 0.2)', 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {title}
              </Typography>
              {errorMessage && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Typography>
              )}
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>タイトル：</strong> {title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>URL：</strong> <a href={url1} target="_blank" rel="noopener noreferrer">{url1}</a>
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>詳細：</strong> {detail}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>レビュー：</strong> {review}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              {isMine ? (
                <Button variant="contained" color="primary" component={Link} to={`/edit/${id}`}>
                  書籍編集
                </Button>
              ) : (
                <Button variant="outlined" color="secondary" component={Link} to={`/`}>
                  編集不可
                </Button>
              )}
            </CardActions>
          </Card>
        )}
      </Box>
    </>
  );
};
