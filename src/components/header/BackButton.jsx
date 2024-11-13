import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export const BackButon = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleBack}>
      戻る
    </Button>
  );
};
