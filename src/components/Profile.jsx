import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


export default function Profile(){
  const {user, isAuthenticated, isLoading} = useAuth0();
  return(
    isAuthenticated && !isLoading ? (
    <div>
      
      {/* <img src={user.picture} alt={user.name} style={{ width: "150px", height: "150px", borderRadius: "50%" }}/>  */}
      <h3>{user.name}</h3>
      <h3>{user.email}</h3>


    </div>
  ) : (
    <div>
      
    </div>
  ))
}