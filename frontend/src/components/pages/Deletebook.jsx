import React, { useState } from 'react';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Deletebook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${baseURL}/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
        enqueueSnackbar('Book deleted successfully!', { variant: 'success' });
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error deleting book:', error);
        enqueueSnackbar('Failed to delete book. Please try again later.', { variant: 'error' });
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col items-center border-2 border-red-400 rounded-xl w-full max-w-xl p-8 mx-auto'>
          <h3 className='text-2xl text-center font-semibold text-red-700'>
            Are you sure you want to delete this book?
          </h3>
          <button
            onClick={handleDeleteBook}
            className='mt-6 p-3 bg-red-600 hover:bg-red-700 text-white rounded-md w-full'
          >
            Yes, Delete it
          </button>
        </div>
      )}
    </div>
  );
};

export default Deletebook;
