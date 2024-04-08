

import React from 'react'
import Signincomponent from './signinpage/Signincomponent';

export const metadata = {
  title: "Signin - Work Manager",
};


// pages/index.js
import { GoogleOAuthProvider } from '@react-oauth/google';

const Signuppage = () => {
    return (
        <GoogleOAuthProvider clientId="170944664109-8nv8qp4ha0a86tvdvkbgtf36d6qin9cq.apps.googleusercontent.com">
            <Signincomponent/>
        </GoogleOAuthProvider>
    );
};

export default Signuppage;
