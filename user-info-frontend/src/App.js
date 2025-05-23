// src/App.js
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [fetchedName, setFetchedName] = useState("");
  const [inputId, setInputId] = useState("");

  // Handle saving a user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://testb2-1.onrender.com/add-user", {
        name,
        userId,
      });
      alert(res.data.message);
      setName("");  // Reset form fields
      setUserId("");
    } catch (err) {
      console.error(err);
      alert("Error adding user");
    }
  };

  // Handle fetching a user by ID
  const handleFetch = async () => {
    try {
      const res = await axios.get(`https://testb2-1.onrender.com/get-user/${inputId}`);
      setFetchedName(res.data.name);
    } catch (err) {
      setFetchedName("User not found");
    }
  };

  // Google Sign-In success handler
  const handleGoogleLogin = async (response) => {
    const token = response.credential;
    try {
      const res = await axios.post("https://testb2-1.onrender.com/google-auth", { token });
      alert(`Welcome ${res.data.name}`);
    } catch (err) {
      console.error(err);
      alert("Google Authentication failed");
    }
  };

  // Initialize Google Sign-In button
  React.useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual client ID
        callback: handleGoogleLogin,
      });
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  return (
    <div className="App">
      <h1>User Information</h1>

      <div>
        <h3>Add User</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <button type="submit">Add User</button>
        </form>
      </div>

      <div>
        <h3>Get User by ID</h3>
        <input
          type="text"
          placeholder="Enter User ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button onClick={handleFetch}>Fetch User</button>
        {fetchedName && <p>Name: {fetchedName}</p>}
      </div>

      <div>
        <h3>Or Login/Register with Google</h3>
        <div id="googleSignInDiv"></div>
      </div>
    </div>
  );
}

export default App;
