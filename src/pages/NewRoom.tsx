// import { useContext } from "react";
import { Link } from "react-router-dom";

import Illustration from "../assets/images/illustration.svg";
import Logo from "../assets/images/logo.svg";

import { Button } from "../components/Button";

import '../styles/auth.scss';

// import { AuthContext } from "../contexts/AuthContext";

export function NewRoom(){
  // const { user } = useContext(AuthContext);

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
          <form>
            <input
              type="text"
              placeholder="Nome da sala"
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