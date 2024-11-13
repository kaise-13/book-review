import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../Slices/authSlice';
import { Header } from "../components/header/Header";
import { url } from '../const';
import Compressor from "compressorjs";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessge] = useState('')
  const [previewUrl, setPreviewUrl] = useState("");
  const [file, setFile] = useState(null)
  const [, setCookie] = useCookies()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleNameChange = (e) => setName(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleFileChange = (e) => {
    const file = e.target.files[0]
      if(!file) {
        return;
      }
      setPreviewUrl(URL.createObjectURL(file));
      new Compressor(file, {
        quality: 0.6,
        maxHeight: 400,
        maxWidth: 400,
        success(compressedFile) {
            // FormDataにリサイズ後の画像を設定
            const formData = new FormData();
            formData.append("icon", compressedFile, compressedFile.name);
            setFile(formData);  // 圧縮したファイルをセット
        },
        error(err) {
            setErrorMessge(`画像の圧縮に失敗しました: ${err.message}`);
        }
      });
  }

  const onSignUp = () => {
    const data = {
      email: email,
      name: name,
      password: password,
    }
    axios
      .post(`${url}/users`, data)
      .then((res) => {
        const token = res.data.token
        dispatch(signIn())
        setCookie('token', token)
        axios
          .post(`${url}/uploads`, file, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .then((res) => {
            navigate('/');
          })
          .catch((err) => {
            setErrorMessge(`アイコンアップロードに失敗しました。 ${err}`);
          });
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`)
      })
  }

  return (
    <div>
      <Header />
      <main className="signup">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form">
          <br />
          <TextField
            type="email"
            id="standard-basic"
            label="e-mail"
            variant="standard"
            onChange={handleEmailChange}
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            label="user name"
            variant="standard"
            onChange={handleNameChange}
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            label="password"
            variant="standard"
            onChange={handlePasswordChange}
          />
          <br />
          <br />
          <div>
          {previewUrl && <img src={previewUrl} alt="プレビュー" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }} />}
          <br />
          <input 
            type="file"
            accept='.jpg, .png'
            onChange={handleFileChange}
          />
          </div>
          <br />
          <Button type="button" variant="contained" onClick={onSignUp}>
            作成
          </Button>
        </form>
      </main>
    </div>
  )
}
