import {useParams} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GrAmazon , GrTwitter, GrMail} from 'react-icons/gr'

function Book() {

    let params = useParams();
    const [book, setBook] = useState([""]);

    const getBook = async(id) => {
        const api = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        const data = await api.json();
    
        setBook(data)
    }


    useEffect(() => {
        getBook(params.id);
      },[params.id])
    


    if(book[0]==""){
        return(
          <Wrapper>
            <h1>Loading</h1>
            <img src="https://i.imgur.com/vQCfLOT.gif" />
          </Wrapper>
        )
      }else{
        return (
            <Info>
                
                <img src={`https://books.google.com/books/content/images/frontcover/${params.id}?fife=w400-h600`} alt="" srcSet="" />
                
                <Data>
                    <h1>{book.volumeInfo.title}</h1>
                    <h2>{book.volumeInfo.authors[0]}</h2>
                    <p dangerouslySetInnerHTML={{__html:book.volumeInfo.description}} />

                    <BtnsDiv>
                        <Button onClick={()=>{window.open(`https://www.amazon.com/s?k=${book.volumeInfo.title}`)}}><GrAmazon /></Button>
                        <Button onClick={()=>{window.open(`https://twitter.com/intent/tweet?text=My next reading will be: ${book.volumeInfo.title}. I discovered it in rTrover`)}}><GrTwitter /></Button>
                        <Button onClick={()=>{window.open(`mailto:""?Subject=${book.volumeInfo.title}&body=I want to read: ${book.volumeInfo.title}. More info: http://localhost:3000/book/${params.id}`)}}><GrMail /></Button>
                    </BtnsDiv>

                </Data>

            </Info>
         )
        

    }
}

export default Book


const Wrapper = styled.div`
  margin: auto;
  width: 50%;
  text-align: center;
  
`

const Info = styled.div`
    margin: auto;
    width: 50%;
    text-align: center;
    display:flex;
    align-items:center;
    flex-direction:row;
    justify-content: center;
    img{
      object-fit: cover;
      width:25%;
      filter: blur(50%);
    }
    p{
        padding:1rem;
        text-align:justify;
        display: block;/* or inline-block */
        text-overflow: ellipsis;
        word-wrap: break-word;
        overflow: auto;
        max-height: 20em;
        line-height: 1.8em;
        font-family: 'Montserrat';
    }
    @media (max-width: 1300px) {
    width: 95%;
    img{
      width:250px
    }
  }
    
    @media (max-width: 1300px) {
    width: 95%;
    flex-direction:column
        }    `

const Data = styled.div`
    padding:2rem;
    margin: auto;
    width: 50%;
    text-align: center;
    display:flex;
    flex-direction:column;
    justify-content: space-between
    
`

const Button = styled.button`
    padding:1.2rem 1rem 1rem 1rem;
    text-align:center;
    justify-content:center;
    font-size: 1.2rem;
    border-radius: 0px;
    border: 3px solid black;
    background-color: white;
    cursor: pointer;
    &:hover{
        background-color: #343434;
        color:white;
    }
`
const BtnsDiv = styled.div`
        padding:1rem;
        width:50%;
        margin:auto;
        display:flex;
        justify-content: space-around;
`