import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    {
      text: "Hii",
      user: "me",
      name: "Nitin",
      photoUrl:
        "https://imgs.search.brave.com/J37lYv5DVTiTu4271-i_zhEqp53SJks_V4MD2wgfG8M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9mcmVl/ZG9tLTExNzcxMzU2/LmpwZw",
    },
    {
      text: "Hello bhai",
      user: "other",
      name: "Preet",
      photoUrl:
        "https://imgs.search.brave.com/uEDscvT9LGdST9h4u5kwkZEerVUfxTYmr8xm5Jj-Xzs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waG90/b3NidWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNC8w/NS8xMDAwMDYwNDQ1/LmpwZw",
    },
    {
      text: "Kaha the tum itne tym se",
      user: "other",
      name: "Preet",
      photoUrl:
        "https://imgs.search.brave.com/uEDscvT9LGdST9h4u5kwkZEerVUfxTYmr8xm5Jj-Xzs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waG90/b3NidWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNC8w/NS8xMDAwMDYwNDQ1/LmpwZw",
    },
    {
      text: "bhot dino baad message kiya",
      user: "other",
      name: "Preet",
      photoUrl:
        "https://imgs.search.brave.com/uEDscvT9LGdST9h4u5kwkZEerVUfxTYmr8xm5Jj-Xzs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waG90/b3NidWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNC8w/NS8xMDAwMDYwNDQ1/LmpwZw",
    },
    {
      text: "chl abhi tym ni hai bad meh bat krte hai",
      user: "other",
      name: "Preet",
      photoUrl:
        "https://imgs.search.brave.com/uEDscvT9LGdST9h4u5kwkZEerVUfxTYmr8xm5Jj-Xzs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waG90/b3NidWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNC8w/NS8xMDAwMDYwNDQ1/LmpwZw",
    },
  ]);
  const user = useSelector((store) => store.user);

  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    socket.emit("join-chat", { userId, id });

    return () => {
      socket.disconnect();
    };
  }, [userId, id]);

  return (
    <div className="flex justify-center h-[70dvh]">
      {/* Chat container */}
      <div className="bg-base-300 p-4 w-[50vw] flex flex-col gap-2 justify-between">
        <h2>Chatting</h2>
        {/* Message continer */}
        <div className="h-[60vh] overflow-auto px-2">
          {messages &&
            messages?.map((chat, index) => (
              <div key={index} className="">
                {/* From user */}
                {chat?.user === "other" && (
                  <div className="chat chat-start">
                    {/* From user image */}
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img alt={chat.name} src={chat.photoUrl} />
                      </div>
                    </div>
                    {/* From user name */}
                    <div className="chat-header">
                      {chat.name}
                      <time className="text-xs opacity-50">12:45</time>
                    </div>
                    {/* From user text */}
                    <div className="chat-bubble">{chat.text}</div>
                    {/* From user text status */}
                    <div className="chat-footer opacity-50">Delivered</div>
                  </div>
                )}

                {/* Me */}
                {chat?.user === "me" && (
                  <div className="chat chat-end">
                    {/* Image */}
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img alt={chat.name} src={chat.photoUrl} />
                      </div>
                    </div>
                    {/* My name */}
                    <div className="chat-header">
                      {chat.name}
                      <time className="text-xs opacity-50">12:46</time>
                    </div>
                    {/* My text */}
                    <div className="chat-bubble">{chat.text}</div>
                    {/* My text status */}
                    <div className="chat-footer opacity-50">Seen at 12:46</div>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Message input & send btn */}
        <div className="">
          <div className=" w-[25vw] mx-auto flex justify-between pl-2 bg-base-100">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full"
            />
            <button type="submit" className="btn btn-primary rounded-0">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
