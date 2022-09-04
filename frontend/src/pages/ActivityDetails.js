import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const ActivityDetails = () => {
  let [popup, setPopup] = useState(false);
  let [one, setOne] = useState(false);
  let [data, setData] = useState([]);
  let [name, setName] = useState([]);
  let [hour, setHour] = useState([]);
  let [details, setDetails] = useState([]);
  let [id, setId] = useState([]);

  useEffect(() => {
    async function postActivity() {
      const data = await axios.get("http://localhost:8000/postactivity");
      setData(data.data);
    }
    postActivity();
  }, [one]);

  let handleDelete = (id) => {
    axios.delete(`http://localhost:8000/postactivity/${id}`);
    setOne(!one);
  };

  let handleEdit = (id, name, hour, details) => {
    setId(id);
    setName(name);
    setHour(hour);
    setDetails(details);
    setPopup(!popup);
  };

  let handleEditSubmit = () => {
    axios.put(`http://localhost:8000/postactivity/${id}`, {
      name: name,
      hour: hour,
      details: details,
    });
    setOne(!one);
    setPopup(!popup);
  };

  return (
    <>
      <Sidebar />
      <div className="margin_left">
        <div id="employe_table_list">
          <div className="employe_table_list">
            <div className="employe_table_text_list">Name</div>
            <div className="employe_table_text_list">Time</div>
            <div className="employe_table_text_list">Details</div>
            <div className="employe_table_text_list">Actions</div>
          </div>
          {data.map((data) => (
            <div key={data._id} className="employe_table_down_list">
              <div className="employe_table_text_down_list">{data.name}</div>
              <div className="employe_table_text_down_list">{data.hour}</div>
              <div className="employe_table_text_down_list">{data.details}</div>
              <div className="employe_table_text_down_list">
                <button onClick={() => handleEdit(data._id, data.name, data.hour, data.details)} className="button">
                  Edit
                </button>
                <button onClick={() => handleDelete(data._id)} className="button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {popup ? (
        <div id="edit_popup">
          <div className="edit_popup">
            <div className="post_activity post_activity_list">
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Activity Name" />
              <input value={hour} onChange={(e) => setHour(e.target.value)} type="text" placeholder="Hour take" />
              <br />
              <input value={details} onChange={(e) => setDetails(e.target.value)} type="text" placeholder="Activity Details" />
              <br />
              <button onClick={handleEditSubmit}>Submit</button>
              <button onClick={() => setPopup(!popup)} className="close_btn_list">
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ActivityDetails;
