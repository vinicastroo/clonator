import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }


  body{
    background: #fff;
    color:#343434;
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button{
    font-family:'Roboto', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5,h6, strong {
    font-weight: 400;
  }

  a{
    text-decoration:none;
  }

  button{
    cursor: pointer;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
`;
