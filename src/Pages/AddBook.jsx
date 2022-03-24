import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function AddBook() {

    let logged = false;
    let user = ""
    const [title, setTitle] =  useState("")
    const [author, setAuthor] = useState("")
    const [categorie, setCategorie] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [note, setNote] = useState(1)
    

    const getUser = async ()=>{
        const check = localStorage.getItem('user');

        if(check && logged!==true){
            logged = true;
            user = check
        }
    }

    getUser()
    
    function AddBook() {

        if(title==""){
            alert("Seleccione un libro antes de mandar nada")
        }else{

        
        axios.post("http://localhost:3001/addBook", {username:user,bookname:title,author:author,description:description, category:categorie, note:note, id:image}).then((response) => {
            console.log(response);
            alert("Libro añadido con exito a tu base de datos")
            setTitle("")
            setAuthor("")
            setCategorie("")
            setImage("")
            setNote("")
            setDescription("")
        })
    }
    }

    async function getInfo() {

        const api = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`)
        const data = await api.json();
        console.log(data);
        
        if (title !== "") {
            
            await setAuthor(data.items[0].volumeInfo.authors[0])
            await setCategorie(data.items[0].volumeInfo.categories[0])
            await setDescription(data.items[0].volumeInfo.description)
            await setImage(data.items[0].id)
            console.log(author);

        }

    }

    useEffect(() => {
        getInfo()
    }, [title])
    
    if(logged === true){
        return (
            <div>
            <br/>
            <Wrapper>
            
                <Image>
                    <img src={`https://books.google.com/books/content/images/frontcover/${image}?fife=w400-h600`} />
                </Image>
                <Inputs>
                
                <Divver>
                    <label>Titulo:</label>
                    <input onChange={(event)=>setTitle(event.target.value)} value={title}></input>
                </Divver>
                <Divver>
                    <label >Autor:</label><input value={author}></input>
                </Divver>
                <Divver>
                    <label>Temática:</label><input value={categorie}></input>
                </Divver>
                    <label>Descripción:</label>
                    
                    <textarea value={description} type="text" rows="22" cols="70"></textarea>
                    <Divver />
                <Divver>
                    <label>Nota</label><input type="number" min="1" max="5" onChange={(event)=>setNote(event.target.value)}></input>
                </Divver>
        
                <button onClick={()=>AddBook()}>Guardar</button>
                
                </Inputs>
                
            </Wrapper>
            </div>
          )}else{
              return(
                  <h1>Inicia sesión para añadir libros a tu libreria. Recarga cuando hayas iniciado sesión</h1>
              )
          }
    


}

export default AddBook

const Wrapper = styled.div`
    margin:auto;
    width:50%;

    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    align-items:flex-start;
    flex-wrap: wrap;

    input {
    height: 10%;
    width: 50%;
    }

    button{
        display:inline-block;
        padding:0.7em 1.4em;
        margin:0 0.3em 0.3em 0;
        border-radius:0.15em;
        border:none;
        box-sizing: border-box;
        text-decoration:none;
        font-family:'Roboto',sans-serif;
        text-transform:uppercase;
        font-weight:400;
        color:#FFFFFF;
        background-color:#363636;
        box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
        text-align:center;
        position:relative;
    }
    button:active{
        top:0.1em;
    }

`
const Image = styled.div`

img{
    width:300px
}
`

const Inputs = styled.div`
    display:flex;
    flex-direction:column;
`

const Divver = styled.div`

    display:flex;
    flex-direction:row;
    justify-content:space-between;
    padding-bottom:1rem;
    
    
`