import {useParams, Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GrAmazon , GrTwitter, GrMail} from 'react-icons/gr'

function Book() {

    let params = useParams();
    const [book, setBook] = useState([""]);
    const [author, setAuthor] = useState("");
    let imag = "";

    const getBook = async(id) => {
        const api = await fetch(`https://openlibrary.org/books/${id}.json`)
        const data = await api.json();

        imag = await 'http://covers.openlibrary.org/b/id/' + data.covers[0] + '-L.jpg'
        
        const apiauth = await fetch(`https://openlibrary.org${data.authors[0].key}.json`)
        const authdata = await apiauth.json()
        
        setBook(data)
        setAuthor(authdata.name)
    }


    useEffect(() => {
        getBook(params.id);
        setAuthor();
      },[params.id])
    
      try {
        console.log(book.covers[0]);
    } catch (e) {
    }
    
    const getInfo = book.description
    
    try {
        console.log(getInfo);
    } catch (error) {
        getInfo = book.description.value
    }


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
                
                <img src={'http://covers.openlibrary.org/b/id/' + book.covers[0] + '-L.jpg'} alt="" srcSet="" />
                
                <Data>
                    <h1>{book.title}</h1>
                    <h2>{author}</h2>
                    <p>{getInfo}</p>

                    <BtnsDiv>
                        <Button><GrAmazon /></Button>
                        <Button><GrTwitter /></Button>
                        <Button><GrMail /></Button>
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
    flex-direction:row;
    justify-content: center;

    p{
        padding:1rem;
        text-align:justify;
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