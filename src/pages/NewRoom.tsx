import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Illustration from "../assets/images/illustration.svg";
import Logo from "../assets/images/logo.svg";

import { Button } from "../components/Button";

import { database } from "../services/firebase";

import '../styles/auth.scss';

import { useAuth } from '../hooks/useAuth';

export function NewRoom(){
  const { user } = useAuth();
  const [ newRoom, setNewRoom ] = useState('');
  const history = useHistory();

  async function handleCreateNewRoom(event: FormEvent){
    event.preventDefault();

    if(newRoom.trim() === ' '){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateNewRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}