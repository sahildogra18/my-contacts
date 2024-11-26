import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  let [contact, setContact] = useState([
    { name: "sahil", phone: "8834547785" },
    { name: "sudhanshu", phone: "7508393535" },
    { name: "om", phone: "982544445" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  async function addkaro(e) {
    e.preventDefault();

    if (newName || newPhone) {
      setContact([...contact, { name: newName, phone: newPhone }]);
      let response = await fetch(
        "https://contact-new-85f22-default-rtdb.firebaseio.com/contactreact.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        }
      );
    } else {
      alert("enter valid values");
    }
  }

  //delete karo
  function deletekaro(index) {
    console.log(index);
    const updatedContacts = contact.filter((_, i) => {
      return i !== index;
    });

    setContact(updatedContacts);
  }

  const filteredContacts = contact.filter((contact) => {
    return contact.name.includes(search);
  });
  return (
    <div className="conntainer">
      <form>
        <h1>Contact list</h1>

        <div className="search">
          <input
            type="text"
            placeholder="SERACH COONTACT HERE"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <h2 className="result-list"></h2>
        {filteredContacts.map((c, index) => (
          <li key={index}>
            {c.name} -- {c.phone}
            <button onClick={() => deletekaro(index)}>Delete</button>
          </li>
        ))}
        <div>
          <div>
            <input
              type="text"
              placeholder="Enter your Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <input
            type="number"
            placeholder="Enter your Mobile Number"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
        </div>

        <button onClick={addkaro}>ADD </button>
      </form>
    </div>
  );
}

export default App;
