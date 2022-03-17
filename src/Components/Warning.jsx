import React from 'react'
import styled from 'styled-components'


function Warning() {
  return (
    <Footer>
        <p>The API is broken, expect errors and white screens, sorry for the inconvenience :(((</p>
    </Footer>
  )
}

export default Warning

const Footer = styled.div`
    position:absolute;
    bottom:0;
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    height:2rem;   /* Height of the footer */
    background:#F8EA8C;
    @media (max-width: 1300px) {
    margin-top:2rem;
    position:sticky;
    }
    

`