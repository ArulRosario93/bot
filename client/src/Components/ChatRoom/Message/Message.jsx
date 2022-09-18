import React, { useRef, useState, useEffect } from "react";
import RecommendedQus from "../RecommendedQus/RecommendedQus"

const Message = ({ itemHere }) => {

    // const [time, setTime] = useState("");

    const messagesEndRef = useRef(null);

    const today = new Date();
    const hrs = today.getHours();
    const mins = today.getMinutes();
    const time = hrs + ":" + mins;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

    useEffect(() => {
    scrollToBottom();

  }, [itemHere]);

    return(
        itemHere.type === "Recommended" ? <div
                className={itemHere.type}
                style={{ textAlign: `${itemHere.type === "sent" ? "right" : "left"}` }}
            >
                <div className="messageWidthShortened">
                <h4>{itemHere?.value} Recommended Questions</h4>
                <p style={{ margin: "0px", fontSize: "small" }}>
                    {
                    itemHere?.text?.map((item, i) => {
                        
                        return(
                        <RecommendedQus itemHere={item} />
                        )
                    })
                    }
                </p>
                <p className="timeHere" style={{fontSize: 'smaller', fontWeight: 'lighter'}}>{time}</p>
                </div>
                <div style={{paddingTop: '5vh'}} ref={messagesEndRef}/>
            </div> : <div
                className={itemHere.type}
                style={{ textAlign: `${itemHere.type === "sent" ? "right" : "left"}` }}
            >
                <div className="messageWidthShortened">
                <p style={{ margin: "0px", fontSize: "small" }}>
                    {itemHere.text}
                </p>
                <p className="timeHere" style={{fontSize: 'smaller', fontWeight: 'lighter'}}>{time}</p>
                </div>
                <div style={{paddingTop: '5vh'}} ref={messagesEndRef}/>
            </div>
    )
}

export default Message;