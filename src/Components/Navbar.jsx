import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Axios from 'axios';
import Gravatar from 'react-gravatar';
import {Link}  from 'react-router-dom'

function Navbar() {

    
    const [userLogged, setUserLogged] = useState(false);
    const [activeTab, setActiveTab] = useState("");

    const [loginUser, setLoginUser] = useState("");
    const [loginPwd, setLoginPwd] = useState("");
    const [registerUser, setRegisterUser] = useState("");
    const [registerMail, setRegisterMail] = useState("");
    const [registerPwd, setRegisterPwd] = useState("");

    const getUser = ()=>{
        const check = localStorage.getItem('user');

        if(check && userLogged !== true){
            setLoginUser(check)
            setUserLogged(true);
        }

    }

    function LoginUser(){

        console.log("a");

        const getLogin = {
            method: "GET",
            url: "http://localhost:3001/login",
            params:{username:loginUser, password:loginPwd}
        }
        Axios.request(getLogin).then((response) => {
            console.log(response.data);
            if(response.data){
                localStorage.setItem('user', loginUser)
                getUser()
                setActiveTab("")
            }
        })
    }
    
    function RegisterUser() {
        
        console.log({username:registerUser,mail:registerMail,password:registerPwd});

        Axios.post("http://localhost:3001/createUser", {username:registerUser,mail:registerMail,password:registerPwd}).then((response) => {
            console.log(response);
            localStorage.setItem('user', registerUser)
            getUser()
            setActiveTab("")
        })
        
    }
    useEffect(()=>{
        getUser()
    },(userLogged))

  return (
    <Wrapper>

    <Link to={'/'}><h1>Tr⚛ver</h1></Link>

    {userLogged === true && (
        <UserNav>

        <ul>
            <li>Biblioteca</li>
            <li>Añadir Libro</li>
            <li>Log Out</li>
            <li>{loginUser}</li>
        </ul>

        <Gravatar email={loginUser + "@blah.com"} size={150} rating="pg" default="robohash" className="CustomAvatar-image" />
        </UserNav>
        )}

    {userLogged === false && (
        <LRbuttons>
        <button className={activeTab === 'login' ? 'active' : ''} onClick={()=>setActiveTab("login")}>Login</button>
        <button className={activeTab === 'register' ? 'active' : ''} onClick={()=>setActiveTab("register")}>Register</button>    
        </LRbuttons>
        )}
      
    {activeTab === "login" && (
        <Login>
            <h1>LogIn</h1>
            <input placeholder='username...' onChange={(event) => {setLoginUser(event.target.value)}}></input>
            <input placeholder='password...' onChange={(event) => {setLoginPwd(event.target.value)}}></input>
            <div>
                <button onClick={()=>LoginUser()}> Log in </button>
                <button className={activeTab === 'register' ? 'active' : ''} onClick={()=>setActiveTab("register")}>Register</button>
                <button onClick={()=>setActiveTab("")}>Cancel</button>
            </div>
        </Login>
        )}
    {activeTab === "register" && (
        <Register>
        <h1>Registration</h1>
        <input placeholder='email...' onChange={(event) => {setRegisterMail(event.target.value)}}></input>
        <input placeholder='username...' onChange={(event) => {setRegisterUser(event.target.value)}}></input>
        <input placeholder='password...' onChange={(event) => {setRegisterPwd(event.target.value)}}></input>
        <div>
            <button onClick={()=>RegisterUser()}>Register</button>
            <button className={activeTab === 'login' ? 'active' : ''} onClick={()=>setActiveTab("login")}> Log in </button>
            <button onClick={()=>setActiveTab("")}>Cancel</button>
        </div>
        </Register>
        )}
    </Wrapper>
    
  )
}

export default Navbar

const Login = styled.div`
    z-index: 99;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    left: 0;
    right: 0;
    display:flex;
    flex-direction:column;
    position:absolute;
    top:0%;
    background:white;
    width:50vh;
    text-align:center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    input {
        margin-left:2rem;
        margin-right:2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        padding:1rem;
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
        background-color:#3369ff;
        box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
        text-align:center;
        position:relative;
    }
    button:active{
        top:0.1em;
    }
    @media all and (max-width:30em){
        a.button2{
        display:block;
        margin:0.4em auto;
    }
}
    
`

const Register = styled.div`
    z-index: 99;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    left: 0;
    right: 0;
    display:flex;
    flex-direction:column;
    position:absolute;
    top:0%;
    background:white;
    width:50vh;
    text-align:center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    input {
        margin-left:2rem;
        margin-right:2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        padding:1rem;
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
        background-color:#3369ff;
        box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
        text-align:center;
        position:relative;
    }
    button:active{
        top:0.1em;
    }
    @media all and (max-width:30em){
        a.button2{
        display:block;
        margin:0.4em auto;
    }
}
`

const UserNav = styled.div`

    display:flex;
    flex-direction:row;
    justify-content: flex-end;
    align-items:center;

    img{
        width:50px;
        height:50px;
        border: 1px solid black;
        border-radius: 50px;
    }
    ul{
        display:flex;
        flex-direction:row;
        justify-content: flex-end;
        align-items:center;
    }
    li{
        list-style-type: none;
        margin-right:1rem;
    }

`

const Wrapper = styled.div`
    display:flex;
    width:50%;
    margin:auto;
    justify-content:space-between;
    padding:0.5rem;
    
`

const LRbuttons = styled.div`
    button{
  appearance: none;
  background-color: #000000;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  padding:1rem;
  
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin-left:1rem;
  min-width: 0;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

button:disabled {
  pointer-events: none;
}

button:hover {
  transform: translateY(-0.45px);
}

button:active {
  box-shadow: none;
  transform: translateY(0);
}
`