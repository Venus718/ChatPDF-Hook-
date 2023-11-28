import { useState, useMemo } from "react";

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

  const sendMessage = (message: string, chatHistory: Array<ChatMessageType>) => {
    setState("waiting");
    let chatContent = "";
    const newHistory = [
      ...chatHistory,
      { role: "user", content: message} as const,
    ];

    setChatHistory(newHistory);
  }

  return { sendMessage, currentChat, chatHistory, cancel, clear, state};
}