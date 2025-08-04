import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import { useSnackbar } from 'notistack'; // ✅ Add this

const Show = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar(); // ✅ Add this

  useEffect(() => {
    if (!id) {
      setErrorMsg("Invalid book ID.");
      setLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
        enqueueSnackbar('Book details fetched successfully!', { variant: 'success' }); // ✅ Snackbar here
      })
      .catch((err) => {
        console.error('Error fetching book:', err);
        setErrorMsg('Failed to load book details.');
        setLoading(false);
        enqueueSnackbar('Failed to load book details.', { variant: 'error' }); // ✅ Optional: error notification
      });
  }, [id]);

  if (loading) return <Spinner />;

  if (errorMsg)
    return <p className='text-red-500 p-4'>{errorMsg}</p>;

  if (!book || !book.title)
    return <p className="text-red-500 p-4">No book data found.</p>;

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl mb-4'>Book Details</h1>
      <div className='border p-4 rounded-md'>
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Publish Year:</strong> {book.publishYear}</p>
        <p><strong>Created At:</strong> {new Date(book.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(book.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Show;
