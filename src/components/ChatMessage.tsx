import {
  FunctionComponent,
  DetailedHTMLProps,
  TableHTMLAttributes,
} from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import remarkGfm from "remark-gfm";
import { ChatMessageType } from "../hooks/useChat";


interface Props {
  message: ChatMessageType;
}

// This lets us style any markdown tables that are rendered
const CustomTable: FunctionComponent<
  Omit<
    DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>,
    "ref"
  > &
    ReactMarkdownProps
> = ({ children, ...props }) => {
  return (
    <div className="overflow-x-auto">
      <table {...props} className="w-full text-left border-collapse table-auto">
        {children}
      </table>
    </div>
  );
};

/**
 * This component renders a single chat message. It is rendered according to
 * whether it isa  message from the assistant or the user.
 */
const img = "https://i.pinimg.com/564x/0a/e2/ea/0ae2ea4ea9979f7cc346780b5474623a.jpg";
const img_gpt = "./gpt.png";

export const ChatMessage: React.FC<React.PropsWithChildren<Props>> = ({
  message,
}) =>
  message.role === "user" ? (
    <div className="flex items-end justify-end">
      <div className="bg-[#6ccfcf] text-white border-gray-100 border-2 rounded-lg p-2 max-w-lg">
        <p>{message.content}</p>
      </div>
      <div id="avatar">
        <img src={img} alt="logo" />
      </div>
    </div>
  ) : (
    <div className="flex items-end">
      <div id="avatar_gpt">
        <img src={img_gpt} alt="logo" />
      </div>
      <div className="bg-[#18a800] text-white border-gray-300 border-2 rounded-lg p-2 mr-20 w-full">
        <ReactMarkdown
          children={message.content}
          remarkPlugins={[remarkGfm]}
          components={{
            table: CustomTable,
          }}
        />
      </div>
    </div>
  );
