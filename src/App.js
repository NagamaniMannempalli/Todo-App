import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (newItem.trim() !== "") {
      setTodos([...todos, { text: newItem, completed: false }]);
      setNewItem("");
    }
  };

  const handleDelete = (indexDel) => {
    setTodos(todos.filter((_, index) => index !== indexDel));
  };

  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📌 Todo App</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter a new task..."
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.addButton}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo, index) => (
          <li key={index} style={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
              style={styles.checkbox}
            />

            {editIndex === index ? (
              <input
                type="text"
                defaultValue={todo.text}
                onBlur={(e) => {
                  setTodos(
                    todos.map((t, i) =>
                      i === index ? { ...t, text: e.target.value } : t
                    )
                  );
                  setEditIndex(-1);
                }}
                autoFocus
                style={styles.editInput}
              />
            ) : (
              <span
                style={{
                  ...styles.text,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#888" : "#333",
                }}
              >
                {todo.text}
              </span>
            )}

            <button style={styles.editButton} onClick={() => setEditIndex(index)}>
              ✏️
            </button>
            <button
              style={styles.deleteButton}
              onClick={() => handleDelete(index)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "12px",
    background: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginRight: "8px",
  },
  addButton: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  checkbox: {
    marginRight: "10px",
  },
  text: {
    flex: 1,
    fontSize: "16px",
  },
  editInput: {
    flex: 1,
    padding: "6px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  editButton: {
    background: "#ffc107",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "6px",
  },
  deleteButton: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default App;
