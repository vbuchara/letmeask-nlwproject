import className from 'classnames';
import { ReactNode } from 'react';

import "../styles/question.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function Question({
    content, 
    author, 
    isHighLighted = false,
    isAnswered = false,
    children
  }: QuestionProps){
  return (
    <div 
      className={className(
        'question', 
        { answered: isAnswered }, 
        { highlighted: isHighLighted && !isAnswered })
      }
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name}/>
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}