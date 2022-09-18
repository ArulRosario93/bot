import React, { useRef, useEffect, useState } from "react";
import "./ChatRoom.css";
import { useDataLayerValue } from "../../DataLayer";
import { CircleNotificationsOutlined } from "@mui/icons-material";
import axios from "axios";
import Message from "./Message/Message";

const ChatRoom = () => {
  const [{ bitCoins, stocks }, dispatch] = useDataLayerValue();

  const btns = ["Sln Token", "Silver Line", "General"];

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello how may i help you <3", type: "received" },
  ]);

  const slnTokensRecommended = [
    "What determines SLN Token's price?",
    "Can SLN tokens be regulated?",
    "What happens when the SLN tokens are lost?",
    "Why do we need to trust SLN tokens?"
  ]

  const silverLineRecommended = [
    "How is Silver Line different from others?",
    "Who controls the Silver Line networks?",
  ]

  const generalRecommended = [
    "How to start trading?",
    "What is the best time to trade?",
    "Who is the founder of this website/Platform?",
  ]

  const Handler = (e) => {
    const text = e.target.value;
    setMessage(text);
  };

  const HandlerClick = async (e) => {

    if(message.length > 0){
      e.preventDefault();
      
      const response = await axios.post("http://localhost:3500/textQuery", {
          message,
        })
        
        setMessages((pervMessages) => [
          ...pervMessages,
          { text: message, type: "sent" },
        ]);
  
        const botText = response.data;
  
        const yup = JSON.stringify(botText);
        const jgiadg = yup.replace(/\\n/g, "\n");
        const final = yup.replace(/['"]/g, "");

        setMessages((pervMessages) => [
          ...pervMessages,
          { text: final, type: "received" },
        ]);

        console.log(yup)
        console.log(jgiadg)
        console.log(final)
  
        setMessage("");
      }
    }

  // };

  const messagesEndRef = useRef(null);

  const HandlerBtn = (event, value) => {
    
    if(value === "Sln Token"){
      setMessages(prevMessage => [
        ...prevMessage,
        { text: slnTokensRecommended.map(item => item), type: 'Recommended', value }
      ])
    }

    if (value === "Silver Line") {
      setMessages(prevMessage => [
        ...prevMessage,
        { text: silverLineRecommended.map(item => item), type: 'Recommended', value }
      ])
    }

    if (value === "General") {
      setMessages(prevMessage => [
        ...prevMessage,
        { text: generalRecommended.map(item => item), type: 'Recommended', value }
      ])
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  console.log(window.innerHeight, "height here");
  console.log(window.innerHeight / 13.79451359, "height here");

  console.log(window.innerHeight / 39, "height for greeetings here");

  let today = new Date();
  let hrs = today.getHours();
  let mins = today.getMinutes();
  let time = hrs + ":" + mins;

  useEffect(() => {
    scrollToBottom();

    console.log(messages, "message here")
  }, [messages]);

  return (
    <>
      <div
        className="chatRoom"
        style={{ height: window.innerHeight / 12.0563 + `vh` }}
      >
        <p className="timehere" style={{ margin: "1px 0px 5px" }}>
          {
            time
          }
        </p>
        {btns.length > 0 ? (
          <div className="btnsHere">
            {btns.map((item, i) => {
              return (
                <div
                  key={i}
                  className="btn"
                  onClick={(event) => HandlerBtn(event, item)}
                >
                  <p className="buttonHere">{item}</p>
                </div>
              );
            })}
          </div>
        ) : null}
        {messages.length > 0 ? (

          <div>
            {messages.map((item, i) => {
              return (
                <>
                  <Message itemHere={item}/>
                  <div style={{paddingTop: '5vh'}} ref={messagesEndRef}/>
                </>
              );
            })}
          </div>

        ) : null}
      </div>
      <form className="inputContainer" onSubmit={HandlerClick}>
        <input
          placeholder="How May I help you?"
          onChange={Handler}
          value={message}
          type="text"
          required
          autoFocus
        />
        <div className="sendBtn">
          <input type="submit" onClick={HandlerClick} value="Send" />
        </div>
      </form>
    </>
  );
};

export default ChatRoom;
