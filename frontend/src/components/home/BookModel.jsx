import { AiOutlineClose} from 'react-icons/ai'
import {PiBookOpenTextLight} from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi';


const BookModel = ({book, onClose}) => {
  return (
    <div className='fixed bg-black bg-opacity-60 top-0 left-0 bottom-0 right-0 z-50 flex justify-center items-center' onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()} className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'>
        <AiOutlineClose className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer" onClick={onClose}/>
        {/* Year Badge */}
        <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
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
        <p className='mt-4'>Anything you want to show</p>
        <p className='my-2'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, velit! Quae corrupti aliquid recusandae. Aut perspiciatis nobis quaerat nihil amet.
        </p>
      </div>
    </div>
  );
}

export default BookModel