import { FormEvent, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Illustration from "../assets/images/illustration.svg";
import Logo from "../assets/images/logo.svg";
import GoogleImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import { AuthContext } from "../contexts/AuthContext";

import { database } from "../services/firebase";

import '../styles/auth.scss';

export function Home(){
  const history = useHistory();
  const { user, signInWithGoogle } = useContext(AuthContext);
  const [ roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle();
    }

    history.push('rooms/new');
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if(roomCode.trim() === ' '){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert('Room does not exist.');
      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={Illustration} alt="Illustration.svg" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={Logo} alt="Logo.svg"/>
          <button onClick={handleCreateRoom} className="create-room">
            <img src={GoogleImg} alt="google-icon.svg"/>
            Crie sua sala com o Google.
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}