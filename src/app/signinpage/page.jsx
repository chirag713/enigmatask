

import React from 'react'
import Signincomponent from './Signincomponent';

export const metadata = {
  title: "Signin - Work Manager",
};


// pages/index.js
import { GoogleOAuthProvider } from '@react-oauth/google';

const Signuppage = () => {
    return (
        <GoogleOAuthProvider clientId="168708733529-2k6npsipf92j9mk7hp1tuhrs7qrfb4t2.apps.googleusercontent.com">
            <Signincomponent/>
        </GoogleOAuthProvider>
    );
};

export default Signuppage;
