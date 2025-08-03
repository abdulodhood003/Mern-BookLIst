import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import { useState } from 'react';
import BookModel from './BookModel';

const BookSingleCard = ({ book }) => {
  const [showModel, setShowModel] = useState(false);

  return (
    <div
      key={book._id}
      className='relative border-2 border-gray-400 rounded-lg p-6 pt-12 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300'
    >
      {/* Year Badge */}
      <h2 className='absolute top-3 right-3 bg-red-400 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md'>
        {book.publishYear}
      </h2>

      {/* Book ID */}
      <h4 className='mb-3 text-gray-500 text-sm break-all'>
        {book._id?.slice(0, 10)}...
      </h4>

      {/* Title */}
      <div className='flex items-center gap-2 mb-2'>
        <PiBookOpenTextLight className='text-red-400 text-2xl' />
        <h3 className='font-medium text-lg'>{book.title}</h3>
      </div>

      {/* Author */}
      <div className='flex items-center gap-2 mb-4'>
        <BiUserCircle className='text-blue-500 text-2xl' />
        <h4 className='text-base'>{book.author}</h4>
      </div>

      {/* Action Icons (View + Info + Edit + Delete in one row) */}
      <div className='flex justify-between items-center mt-2 px-2'>
        <BiShow
          className='text-2xl text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModel(true)}
        />
        <Link to={`/books/${book._id}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black transition-colors duration-200' />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black transition-colors duration-200' />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black transition-colors duration-200' />
        </Link>
      </div>

      {/* Modal */}
      {showModel && (
        <BookModel book={book} onClose={() => setShowModel(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
