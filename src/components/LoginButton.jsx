import React from "react";
import { Button } from "reactstrap";
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton(){

    const { loginWithRedirect } = useAuth0();
  
  return (
    <Button className="first-button mt-4" size="lg" 
            onClick={() => loginWithRedirect()}>
              login
    </Button>
  )
}