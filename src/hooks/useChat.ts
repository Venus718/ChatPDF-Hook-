import { useState, useMemo } from "react";
import Axios from "../util/Axios";

export interface ChatMessageType {
  role: "user" | "assistant";
  content: string
}

export function useChat() {
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const [state, setState] = useState<"idle" | "waiting" | "loading">("idle");

  const abortController = useMemo(() => new AbortController(), []);

  function cancel() {
    setState("idle");
    abortController.abort();
    if (currentChat) {
      const newHistory = [
        ...chatHistory,
        { role: "user", content: currentChat } as const,
      ];

      setChatHistory(newHistory);
      setCurrentChat("");
    }
  }

  function clear() {
    setChatHistory([]);
  }

  const sendMessage = async (message: string, chatHistory: Array<ChatMessageType>) => {
    setState("waiting");
    const newHistory = [
      ...chatHistory,
      { role: "user", content: message} as const,
    ];

    setChatHistory(newHistory);

    const data_pdf = {
      url: "https://thejino.com/wp-content/uploads/2023/11/Reference_Ecommerce_Site.pdf",
    };
    
    const response = await Axios
      .post("https://api.chatpdf.com/v1/sources/add-url", data_pdf)

    const data = {
      sourceId: response.data.sourceId,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    };

    Axios.post("https://api.chatpdf.com/v1/chats/message", data)
         .then((res) => {
            setState("loading");
            if(res.data) {
              setChatHistory((curr) => [
                ...curr,
                { role: "assistant", content: res.data.content } as const,
              ]);
              setCurrentChat(null);
              setState("idle");
            }
            
         })
         .catch((err) => {
            console.log(err);
            
         })


    
  }

  return { sendMessage, currentChat, chatHistory, cancel, clear, state};
}