import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import ThemeToggle from "./ThemeToggle";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  // Fetch notes
  async function fetchNotes() {
    let query = supabase.from("notes").select("*").order("created_at", { ascending: false });

    if (search.trim() !== "") {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error } = await query;
    if (!error) setNotes(data);
  }

  useEffect(() => {
    fetchNotes();
  }, [search]);

  // Create note
  async function createNote() {
    if (!title.trim()) return;

    await supabase.from("notes").insert([{ title, content }]);
    setTitle("");
    setContent("");
    fetchNotes();
  }

  // Delete note
  async function deleteNote(id) {
    await supabase.from("notes").delete().eq("id", id);
    fetchNotes();
  }

  // Start editing a note
  function startEdit(note) {
    setEditingNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
  }

  // Update note
  async function updateNote() {
    if (!title.trim()) return;

    await supabase.from("notes").update({ title, content }).eq("id", editingNoteId);
    setTitle("");
    setContent("");
    setEditingNoteId(null);
    fetchNotes();
  }

  return (
    <div className="container" style={{
  maxWidth: "600px",
  margin: "2rem auto",
  fontFamily: "'Share Tech Mono', monospace",
  backgroundColor: "#111",
  color: "#0ff",
}}
>
      <h1 style={{ textAlign: "center" }}><b><i>My Notes</i></b></h1>

      {/* Theme toggle */}
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Search */}
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setSearch(searchQuery);
          }}
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "5px 0 0 5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => setSearch(searchQuery)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0 5px 5px 0",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          🔍 Search
        </button>
      </div>

      {/* New / Edit note */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "5px" }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem", borderRadius: "5px" }}
      />
      <button
        onClick={editingNoteId ? updateNote : createNote}
        style={{ width: "100%", padding: "0.7rem", borderRadius: "5px", marginBottom: "2rem" }}
      >
        {editingNoteId ? "Update Note" : "Add Note"}
      </button>

      {/* Notes list */}
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "1px solid",
            borderColor: darkMode ? "#00ff40ff" : "#111",
            background: darkMode ? "#111" : "#eee",
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => startEdit(note)}
              style={{ padding: "0.3rem 0.5rem", cursor: "pointer" }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => deleteNote(note.id)}
              style={{ padding: "0.3rem 0.5rem", cursor: "pointer" }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
