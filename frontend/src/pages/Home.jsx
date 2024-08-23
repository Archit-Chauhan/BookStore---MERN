import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState([]);
  const [count, setCount] = useState(0);
  const [showType, setShowType] = useState("card");
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setCount(response.data.count);
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className={showType==="card"?`bg-sky-600 px-4 py-1 rounded-lg` :`bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg`}
          onClick={() => setShowType("card")}
        >
          Card
        </button>
        <button
          className={showType==="table"?`bg-sky-600 px-4 py-1 rounded-lg` :`bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg`}

          onClick={() => setShowType("table")}
        >
          Table
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List:{count}</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? <Spinner /> : showType==='table'? (<BooksTable books={books}/>):(<BooksCard books={books}/>)}
    </div>
  );
};

export default Home;