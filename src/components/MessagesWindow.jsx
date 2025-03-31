import React from "react";

export default function MessagesWindow() {
  const messages = [
    { id: 1, text: "Hello! How are you? Hello! How are you? Hello! How are you?", sender: "bot" },
    { id: 2, text: "I'm good, thanks! How about you?", sender: "user" },
    { id: 3, text: "I'm doing well. What are you up to?", sender: "bot" },
    { id: 4, text: "Just working on a project.", sender: "user" },
    { id: 5, text: "That sounds great! Need any help?", sender: "bot" },
    { id: 6, text: "Maybe later. Thanks for asking!", sender: "user" },
    { id: 7, text: "No problem! What is the project about?", sender: "bot" },
    { id: 8, text: "It's a chat application like this one!", sender: "user" },
    { id: 9, text: "Wow, that's awesome!", sender: "bot" },
    { id: 10, text: "Thanks! I'm learning a lot.", sender: "user" },
    { id: 11, text: "Keep going! You're doing great.", sender: "bot" },
    { id: 12, text: "I appreciate the support!", sender: "user" },
    { id: 13, text: "You're welcome!", sender: "bot" },
    { id: 14, text: "What's your favorite part so far?", sender: "bot" },
    { id: 15, text: "The real-time interactions!", sender: "user" },
    { id: 16, text: "That's often the most exciting part!", sender: "bot" },
    { id: 17, text: "Yes, it's really engaging.", sender: "user" },
    { id: 18, text: "Have you faced any challenges?", sender: "bot" },
    { id: 19, text: "State management was tricky at first.", sender: "user" },
    { id: 20, text: "That's common, but you'll master it!", sender: "bot" },
    { id: 21, text: "I'm getting better each day.", sender: "user" },
    { id: 22, text: "Practice makes perfect!", sender: "bot" },
    { id: 23, text: "Absolutely right!", sender: "user" },
    { id: 24, text: "Keep up the great work!", sender: "bot" },
    { id: 25, text: "Will do, thank you!", sender: "user" }
  ];

  return (
    <div className="h-full overflow-auto p-4 bg-gray-100">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-2 rounded-md mb-2 max-w-xs ${
            message.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-white text-black"
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}
