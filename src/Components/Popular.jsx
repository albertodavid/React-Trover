import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css"
import {Link}  from 'react-router-dom'


function Popular() {
  
  const listaTemas = ["", "art", "architecture", "awards", "biography", 'business', 'computers', 'cookbooks', 'crafts', 'politics', 'education', 'fiction', 'comics', 'history', 'humor', 'kids', 'law', 'literature', 'medicine', 'music', 'mystery', 'crime', 'nature', 'family', 'pets', 'philosophy', 'poetry', 'preschool', 'psychology', "puzzles", "reference", "religion", "romance", "science", "technology", "fantasy", "social", "sports", "transportation", "travel"]
  const books = [] 

  const [popular, setPopular] = useState(['','','','','',"","","","",""])

  const getPopular = async () => {
    let i =0;
    while (i < 10 ) {

      i++;
      const api = await fetch(`https://openlibrary.org/subjects/${listaTemas[Math.floor(Math.random() * 39) + 1]}.json?limit=10&offset=${Math.round(Math.random() * 100)}`)
      const data = await api.json();
  
      books.push(data.works[Math.round(Math.random() * 9)])  
    }
    setPopular(books)
  }
  useEffect(() => {
    getPopular();
  },[]);
  

  if(popular[0]===""){
    return(
      <Wrapper>
        <h1>Loading</h1>
        <img src="https://i.imgur.com/vQCfLOT.gif" />
      </Wrapper>
    )
  }else{
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
          {popular.map((book) => {
  
  
            let cover;
  
            if (book.cover_id != null) {
              cover = 'http://covers.openlibrary.org/b/id/' + book.cover_id + '-L.jpg';
            }else{
              cover = 'https://i.imgur.com/wTcLPLO.jpg'
            }
  
              return(
                <SplideSlide key={book.title}>
                  <Link to={'/book/' + book.cover_edition_key}>
                    <Card > 
                      <p>{book.title}</p>
                      <Gradient />
                      <img src={cover} alt=""/>
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

    @media (max-width: 1300px) {
    width: 95%;
    img{
      width:500px
    }
  }

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
