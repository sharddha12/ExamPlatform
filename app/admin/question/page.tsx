"use client";
import { useState } from "react";

export default function AddQuestion() {
  const [question, setQuestion] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Question saved (will connect DB later)");
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Add Question</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          placeholder="Write question here..."
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button type="submit">Save Question</button>
      </form>
    </div>
  );
}
