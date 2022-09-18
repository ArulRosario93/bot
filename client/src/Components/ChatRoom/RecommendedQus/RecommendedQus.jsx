import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const RecommendedQus = ({ itemHere }) => {

    const [blockHere, setBlock] = useState(true);
    const [answer, setAnswer] = useState(true);

    const messagesEndRef = useRef(null);


    const Handler = async (e, itemHere) => {
    
        const value = await axios.post("http://localhost:3500/RecommendedQuery", {
          itemHere,
        })

        setAnswer(value.data)
        
        setBlock(!blockHere);
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

    useEffect(() => {
        scrollToBottom()
      }, [itemHere]);

    return(
        <div className="QusHolder">
            <div className="RecommendedText" onClick={(e) => Handler(e, itemHere)}>
                <p>{itemHere}</p>
                <div style={{transform: `${blockHere ? "rotate(0deg)" : "rotate(180deg)"}`}}>
                    <ExpandMoreIcon />
                </div>
            </div>
        <div className="ANswerHere" style={{display: `${blockHere ? "none" : "block"}`}}><p>&emsp;{answer}</p></div>
        {/* <div style={{paddingTop: '5vh'}} ref={messagesEndRef}/> */}
      </div>
    )
}

export default RecommendedQus;