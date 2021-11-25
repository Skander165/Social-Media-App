import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({conversation}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const friendId = conversation.member.find(m => m) 
    })
    return (
        <div className="conversation">
            <img className="conversationImg" src="" alt="" />
            <span className="conversationText">John Doe</span>
        </div>
    )
}
