import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";

const Home = ({ Logout }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    notesGeter();
  }, []);

  const notesGeter = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("api/notes/");
      const data = await res.data;
      setNotes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createNotes = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/api/notes/", { content, title });
      if (res.status === 201) {
        notesGeter();
        console.log("Note is Created");
      } else console.log("Note Creation Failed");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (id) => {
    setIsLoading(true);
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`);
      if (res.status === 204) {
        notesGeter();
        console.log("Note is Deleted Succesfuly");
      } else console.log("Note Deletion Failed");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="home">
        <button
          className="logout"
          onClick={() => {
            Logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
        <h1>Home</h1>
        <form onSubmit={createNotes} className="form">
          <label htmlFor="tile">Title</label>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="Content">Content</label>
          <input
            type="text"
            value={content}
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
          />
          <button>Submit</button>
        </form>
        <div className="notes-section">
          {notes.map((note) => {
            return (
              <div key={note.id}>
                {isLoading ? (
                  <LoadingIndicator />
                ) : (
                  <Note note={note} deleteNote={deleteNote} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

Home.propTypes = {
  Logout: PropTypes.func.isRequired,
};

export default Home;
