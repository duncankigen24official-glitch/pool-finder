import { useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Mic, Send, Smile } from "lucide-react";

interface Message {
  id: number;
  text: string;
  time: string;
  isSent: boolean;
}

const Chat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello, Good morning", time: "4:15 PM", isSent: false },
    { id: 2, text: "Hello, Good morning", time: "4:15 PM", isSent: true },
    { id: 3, text: "Hi jenny , what time you reach", time: "4:15 PM", isSent: false },
    { id: 4, text: "I will be around 10 :00am", time: "4:15 PM", isSent: true },
    { id: 5, text: "Okay..I will be there on time", time: "4:15 PM", isSent: false },
  ]);

  const rider = {
    name: "Cody Fisher",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rideDate: "Ride on 25 june 2022",
  };

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: message,
          time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
          isSent: true,
        },
      ]);
      setMessage("");
    }
  };

  return (
    <PageLayout hideBottomNav showBackButton>
      {/* Chat Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3">
          <img
            src={rider.image}
            alt={rider.name}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-foreground">{rider.name}</h2>
            <p className="text-sm text-muted-foreground">{rider.rideDate}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 bg-background overflow-y-auto" style={{ minHeight: "calc(100vh - 220px)" }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${msg.isSent ? "flex-row-reverse" : ""}`}
          >
            {!msg.isSent && (
              <img
                src={rider.image}
                alt={rider.name}
                className="h-8 w-8 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div className={`flex flex-col ${msg.isSent ? "items-end" : "items-start"}`}>
              <div
                className={`rounded-2xl px-4 py-3 max-w-[280px] ${
                  msg.isSent
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-card text-foreground rounded-tl-sm"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 h-12 w-12 rounded-full border-2 border-primary text-primary"
          >
            <Smile className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your text here...."
              className="pr-20 h-12 rounded-full border-2 border-primary"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mic className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          <Button
            onClick={handleSend}
            size="icon"
            className="flex-shrink-0 h-12 w-12 rounded-full bg-primary hover:bg-primary/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Chat;
