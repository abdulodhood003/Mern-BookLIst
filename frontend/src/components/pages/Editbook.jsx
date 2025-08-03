import React, { useState, useEffect } from 'react';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Editbook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
        enqueueSnackbar('Book details fetched successfully!', { variant: 'success' });
      })
      .catch(error => {
        console.error("Error fetching book details:", error);
        setLoading(false);
        enqueueSnackbar('Failed to fetch book details. Please try again later.', { variant: 'error' });
      });
  }, [id]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);

    axios.put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        // ✅ Send message to home page
        navigate('/', { state: { message: 'Book edited successfully!' } });
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error updating book:', error);
        enqueueSnackbar('Failed to edit the book. Please try again later.', { variant: 'error' });
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='text'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button
          className='p-2 bg-sky-500 hover:bg-sky-600 text-white rounded w-full mt-6'
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Editbook;
