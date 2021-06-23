import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Logo from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";

import { useAuth } from "../hooks/useAuth";

import { database } from "../services/firebase";

import "../styles/room.scss";

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
}>;

type Questions = {
  id: string,
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
}

type RoomParams = {
  id: string;
}

export function Room(){
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const [ questions, setQuestions ] = useState<Questions[]>([]);
  const [ title, setTittle ] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${params.id}`);

    roomRef.on('value', room => {
      const firebaseQuestions: FirebaseQuestions = room.val().questions;

      const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
        }
      });

      setTittle(room.val().title);
      setQuestions(parsedQuestions);
    });
  }, [params.id]);

  async function handleSendQuestion(event: FormEvent){
    event.preventDefault();
    
    if(newQuestion.trim() === ''){

    }

    if(!user){
      throw new Error('You must be logged in'); 
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${params.id}/questions`).push(question);

    setNewQuestion(' ');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img alt="Logo.svg" src={Logo}/>
          <RoomCode code={params.id} />

        </div>
      </header>

      <main className="content">
        <div className="room-title"> 
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button></span>
            ) }
            <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
          </div>
        </form>

        {JSON.stringify(questions)}
      </main>
    </div>
  );
}