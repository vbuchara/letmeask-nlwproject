import { BrowserRouter, Route, Switch } from "react-router-dom"; 

import { AuthContextProvider } from "./contexts/AuthContext";

import { AdminRoom } from "./pages/AdminRoom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { RoomRoute } from "./routes/RoomRoute";


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
          <RoomRoute path="/rooms/:id">
            <Room />
          </RoomRoute>
          <Route path="/admin/rooms/:id" component={AdminRoom}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
