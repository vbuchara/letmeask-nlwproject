import { ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type RoomRouteProps = {
  children: ReactNode;
  path: string;
};

export function RoomRoute({ children, ...props}: RoomRouteProps){
  const { user } = useAuth();
  
  return (
    <Route 
      {...props}
      render={({ location }) => 
            user ? (children) : (<Redirect to={{ pathname: "/", state: { from: location } }}/>)
      }
    />
  );
}