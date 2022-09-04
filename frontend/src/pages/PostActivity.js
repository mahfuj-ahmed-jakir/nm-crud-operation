import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const PostActivity = () => {
  let [name, setName] = useState("");
  let [hour, setHour] = useState("");
  let [details, setDetails] = useState("");

  let handleSubmit = () => {
    if (!name && !hour && !details) {
      alert("Fill the all details!");
    } else {
      axios.post("http://localhost:8000/postactivity", {
        name: name,
        hour: hour,
        details: details,
      });
      setName("");
      setHour("");
      setDetails("");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="margin_left">
        <div className="post_activity">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Activity Name" />
          <input value={hour} onChange={(e) => setHour(e.target.value)} type="text" placeholder="Hour take" />
          <br />
          <input value={details} onChange={(e) => setDetails(e.target.value)} type="text" placeholder="Activity Details" />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default PostActivity;
