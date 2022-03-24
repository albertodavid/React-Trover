import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

function Biblio() {
  
  let logged = false;
  let user = ""

  const [bookData, setBookData] = useState([])


  const getUser = async ()=>{
    const check = localStorage.getItem('user');

    if(check && logged!==true){
        logged = true;
        user = check
    }
  }


  function getBooks() {

    const getBooks = {
      method: "GET",
      url: "http://localhost:3001/getBooks",
      params:{username:user}
  }
  axios.request(getBooks).then((response) => {
      console.log(response);
      setBookData(response.data)
  })
    
  }

  useEffect(() => {
    getUser()
    getBooks()
  } ,[])
  
  return (
    <div>
    <Wrapper>
    {bookData.map((book) => {
      return(
      
      <div>
        <img src={`https://books.google.com/books/content/images/frontcover/${book.id}?fife=w400-h600`}/>
        <li className='title'>{book.bookname}</li>
        <li className='author'>{book.author}</li>
        <li>Nota: {book.note} / 5</li>
      </div>
      )
    } 
    )}
    </Wrapper>
    </div>
  )
}

export default Biblio

const Wrapper = styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  gap:2rem;
  width:50%;
  margin: auto;

  img{
    width:200px;
    height:300px;
  }

  li{
    list-style:none;
  }

  .title{
    font-weight:900;
  }
  .author{
    color: gray;
  }

`