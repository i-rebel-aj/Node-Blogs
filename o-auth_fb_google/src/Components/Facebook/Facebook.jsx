import { Button } from "@mui/material"
import React from "react"
import * as queryString from 'query-string';
const Facebook=()=>{
    const stringifiedParams = queryString.stringify({
        client_id: "651799279582135",
        redirect_uri: 'http://localhost:3001/',
        scope: ['email', 'user_friends'].join(','), // comma seperated string
        response_type: 'code',
        auth_type: 'rerequest',
        display: 'popup',
    });

    const facebookLoginUrl = `https://www.facebook.com/v13.0/dialog/oauth?${stringifiedParams}`;
    return(
        <>
            <Button variant="contained" href={facebookLoginUrl}>Signup With Facebook</Button>
        </>
    )
}
export default Facebook