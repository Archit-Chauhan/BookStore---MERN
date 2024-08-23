import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import BackButton  from '../components/BackButton';
import axios from 'axios';
import Spinner from "../components/Spinner"
import { useSnackbar } from 'notistack';



const CreateBooks = () => {
    const [title,setTitle] = useState('');
    const [author,setAuthor] = useState('');
    const [publishYear,setPublishYear] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const handleSaveBook = ()=>{
        const data = {
            title,
            author,
            publishYear
        };
        setLoading(true);
        axios.post('http://localhost:5555/books',data)
        .then((response)=>{
            setLoading(false);
            enqueueSnackbar("Book Registered SuccessFully",{variant:'success'});
            navigate('/');
        }).catch((error)=>{
            setLoading(false);
            enqueueSnackbar("Error in Registering the Book",{variant:'error'});
            console.log(error);
        })
    }
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className="text-3xl my-4">Create Book</h1>
        {loading?(
            <Spinner/>
        ):(
            ''
        )}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
            <div className="my-4">
                <label htmlFor="title" className="text-xl mr-4 text-gray-500">Title</label>
                <input 
                    type='text'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    id='title'
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
            </div>
            <div className="my-4">
                <label htmlFor="author" className="text-xl mr-4 text-gray-500">Author</label>
                <input 
                    type='text'
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                    id='author'
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
            </div>
            <div className="my-4">
                <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">Publish Year</label>
                <input 
                    type='text'
                    value={publishYear}
                    onChange={(e)=>setPublishYear(e.target.value)}
                    id='publishYear'
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
            </div>
            <button className='p-2 bg-sky-500' onClick={handleSaveBook}>
                Save
            </button>
        </div>
    </div>
  )
}

export default CreateBooks