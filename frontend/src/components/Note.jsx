import PropTypes from "prop-types";
import "../styles/Note.css";

const Note = ({ deleteNote, note }) => {
  return (
    <section className="note">
      <h2 className="note-title">{note.title}</h2>
      <h4 className="note-content">{note.content}</h4>
      <p className="note-date">crated at {note.created_at}</p>
      <button
        className="delete-button"
        onClick={() => {
          deleteNote(note.id);
        }}
      >
        Delete
      </button>
    </section>
  );
};

Note.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  note: PropTypes.node.isRequired,
};

export default Note;
