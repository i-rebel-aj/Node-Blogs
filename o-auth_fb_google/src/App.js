import './App.css';
import Facebook from './Components/Facebook/Facebook';
import * as queryString from 'query-string';
import axios from 'axios';
import React, { useEffect, useState } from "react"
async function getAccessTokenFromCode(code) {
  const data=await axios.post('http://localhost:3000/api/v1/auth/signup/facebook', {code: code})
  return data
};
function App() {
  const [accessToken, setAcessToken]=useState(null)
  const urlParams = queryString.parse(window.location.search);
  console.log('Url Params is', urlParams)
  useEffect(()=>{
    async function getFacebookToken(){
      if(urlParams?.code?.length>0){
        console.log('URL params code is', urlParams.code)
        // const token=await getAccessTokenFromCode(urlParams.code)
        await getAccessTokenFromCode(urlParams.code)
        // console.log('Acesss Token is', token)
        // setAcessToken(token)
      }
    }
    getFacebookToken()
  }, [urlParams])
  return (
    <div className="App">
      <Facebook></Facebook>
    </div>
  );
}

export default App;
