import React from "react";
import { Button } from "reactstrap";
import { useAuth0 } from '@auth0/auth0-react';

export default function LogoutButton(){

  const {logout} = useAuth0();

  return (
    <Button className="second-button w-100 my-4"  onClick={() => logout({returnTo: window.location.origin})}>logout</Button>
  )
}