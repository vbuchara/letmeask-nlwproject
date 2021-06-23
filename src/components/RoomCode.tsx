import Copy from "../assets/images/copy.svg";

import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps){

  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code);
  }

  return(
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={Copy} alt="Copy.svg"/>
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}