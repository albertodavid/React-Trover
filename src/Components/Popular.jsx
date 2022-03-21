import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css"
import {Link}  from 'react-router-dom'


function Popular() {
  
    console.log(process.env.REACT_APP_API_KEY);

  const listaTemas = ["", "art", "architecture", "awards", "biography", 'business', 'computers', 'cookbooks', 'crafts', 'politics', 'education', 'fiction', 'comics', 'history', 'humor', 'kids', 'law', 'literature', 'medicine', 'music', 'mystery', 'crime', 'nature', 'family', 'pets', 'philosophy', 'poetry', 'preschool', 'psychology', "puzzles", "reference", "religion", "romance", "science", "technology", "fantasy", "social", "sports", "transportation", "travel"]
  const books = [] 

  const [popular, setPopular] = useState(['','','','','',"","","","",""])

  const getPopular = async () => {
    const api = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${listaTemas[Math.floor(Math.random() * 39) + 1]}&maxResults=10&key=${process.env.REACT_APP_API_KEY}`)
    const data = await api.json();
      
    books.push(data.items)  
    
    setPopular(books)
  }
  useEffect(() => {
    getPopular();
    console.log(popular);
  },[]);
  

  if(popular[0]===""){
    return(
      <Wrapper>
        <h1>Loading</h1>
        <img src="https://i.imgur.com/vQCfLOT.gif" />
      </Wrapper>
    )
  }else{
    console.log(popular);
    return (
      <Wrapper>
  
        <h1>Some ideas:</h1>
  
  
  
        <Splide options={{
            perPage:4,
            pagination:false,
            drag:'free',
            gap: '3rem',
            breakpoints:{
              640:{
                  perPage:1,
              },
              800:{
                  perPage:2
              },
              1600:{
                perPage:3
            }
          },
          }}>
          {popular[0].map((book) => { 
            
            console.log(`https://books.google.com/books/content/images/frontcover/${book.id}}?fife=w400-h600`);
            
              return(
                <SplideSlide key={book.id}>
                  <Link to={'/book/' + book.id}>
                    <Card > 
                      <p>{book.volumeInfo.title}</p>
                      <Gradient />
                      <img src={`https://books.google.com/books/content/images/frontcover/${book.id}?fife=w400-h600`} alt=""/>
                    </Card>
                  </Link>
                </SplideSlide>
  
              )
          })}
        </Splide>
  
      </Wrapper>
    )
  }

 
}

export default Popular

const Wrapper = styled.div`
  margin: auto;
  width: 50%;
  text-align: center;
  @media (max-width: 1300px) {
    width: 95%;
    img{
      width:500px
    }
  }
`

const Card = styled.div`
    min-height:15rem;
    overflow: hidden;
    position: relative;
    border-radius:2rem;
    img{
        border-radius:2rem;
        position: absolute;
        left:0;
        width:100%;
        object-fit:cover;
    }
    p{
        position:absolute;
        z-index:10;
        padding-left:1rem;
        padding-right:1rem;
        bottom:0%;
        color:white;
        font-weight:600;
        font-size:1rem;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    `

    

const Gradient = styled.div`
        z-index:3;
        position:absolute;
        width:100%;
        height:100%;
        background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5))
`