import { useParams, useHistory } from "react-router-dom";

import Logo from "../assets/images/logo.svg";
import Delete from "../assets/images/delete.svg";
import { ReactComponent as Check} from "../assets/images/check.svg";
import { ReactComponent as Answer} from "../assets/images/answer.svg";

import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";

import { useRoom } from "../hooks/useRoom";

import { database } from "../services/firebase";

import "../styles/room.scss";

type RoomParams = {
  id: string;
}

export function AdminRoom(){
  const history = useHistory();
  const { id } = useParams<RoomParams>();
  const { title, questions } = useRoom(id);

  async function handleEndRoom(){
    await database.ref(`rooms/${id}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string){
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')){
      await database.ref(`rooms/${id}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string, questionIsAnswered: boolean){
    if(questionIsAnswered){
      await database.ref(`rooms/${id}/questions/${questionId}`).update({
        isAnswered: false,
      });
    } else {
      await database.ref(`rooms/${id}/questions/${questionId}`).update({
        isAnswered: true,
        isHighLighted: false,
      });
    }
  }

  async function handleHighlightQuestion(questionId: string, questionIsHighlighted: boolean){
    if(questionIsHighlighted){
      await database.ref(`rooms/${id}/questions/${questionId}`).update({
        isHighLighted: false,
      });
    } else {
      await database.ref(`rooms/${id}/questions/${questionId}`).update({
        isHighLighted: true,
      });
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={Logo} alt="Logo.svg"/>
          <div>
            <RoomCode code={id} />
            <Button 
              isOutlined
              onClick={handleEndRoom}
            >
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title"> 
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return(
              <Question 
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                <button
                  className="check-button"
                  type="button"
                  onClick={() => handleCheckQuestionAsAnswered(question.id, question.isAnswered)}
                >
                  <Check />
                </button>

                {!question.isAnswered && (
                  <button
                  className="answer-button"
                  type="button"
                  onClick={() => handleHighlightQuestion(question.id, question.isHighLighted)}
                  >
                    <Answer />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={Delete} alt="Delete.svg"/>
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}