import React, { useEffect, useState } from "react";
import axios from "axios";

const TodayClassCom = () => {
  // true/false state
  let [popup, setPopup] = useState(false);
  let [one, setOne] = useState(true);

  // get json data state
  let [todayClass, setTodayClass] = useState([]);

  // input variable state
  let [batch, setBatch] = useState("");
  let [time, setTime] = useState("");
  let [room, setRoom] = useState("");
  let [present, setPresent] = useState("");

  // edit input variable state
  let [batchEdit, setBatchEdit] = useState("");
  let [timeEdit, setTimeEdit] = useState("");
  let [roomEdit, setRoomEdit] = useState("");
  let [presentEdit, setPresentEdit] = useState("");
  let [id, setId] = useState("");

  // post todayclass data
  let handleSubmit = () => {
    if (!batch && !time && !room && !present) {
      alert("Fill the all details!");
    } else {
      axios.post("http://localhost:8000/todayclass", {
        batch: batch,
        time: time,
        room: room,
        present: present,
      });
      setOne(!one);
    }
  };

  // get todayclass all data
  useEffect(() => {
    async function today() {
      let { data } = await axios.get("http://localhost:8000/todayclass");
      setTodayClass(data);
    }
    today();
  }, [one]);

  // classtoday data delete with id
  let handleDelete = (id) => {
    axios.delete(`http://localhost:8000/todayclass/${id}`);
    setOne(!one);
  };

  // edit classtoday data with id
  let handleEdit = (id, batch, time, room, present) => {
    setId(id);
    setBatchEdit(batch);
    setTimeEdit(time);
    setRoomEdit(room);
    setPresentEdit(present);
    setPopup(!popup);
  };

  let handleEditSubmit = () => {
    axios.put(`http://localhost:8000/todayclass/${id}`, {
      batch: batchEdit,
      time: timeEdit,
      room: roomEdit,
      present: presentEdit,
    });
    setPopup(!popup);
    setOne(!one);
  };

  return (
    <>
      <div className="margin_left">
        <div className="employe_form">
          <input value={batch} onChange={(e) => setBatch(e.target.value)} type="text" placeholder="Batch" />
          <input value={time} onChange={(e) => setTime(e.target.value)} type="text" placeholder="Time" />
          <br />
          <input value={room} onChange={(e) => setRoom(e.target.value)} type="text" placeholder="Room" />
          <input value={present} onChange={(e) => setPresent(e.target.value)} type="text" placeholder="Present" />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div id="employe_table">
          <div className="employe_table">
            <div className="employe_table_text">Batch</div>
            <div className="employe_table_text">Time</div>
            <div className="employe_table_text">Room</div>
            <div className="employe_table_text">Present</div>
            <div className="employe_table_text">Actions</div>
          </div>
          {todayClass.map((data) => (
            <div key={data._id} className="employe_table_down">
              <div className="employe_table_text_down">{data.batch}</div>
              <div className="employe_table_text_down">{data.time}</div>
              <div className="employe_table_text_down">{data.room}</div>
              <div className="employe_table_text_down">{data.present}</div>
              <div className="employe_table_text_down">
                <button onClick={() => handleEdit(data._id, data.batch, data.time, data.room, data.present)} className="button">
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
            <div className="employe_form">
              <input onChange={(e) => setBatchEdit(e.target.value)} value={batchEdit} type="text" placeholder="Batch" />
              <input onChange={(e) => setTimeEdit(e.target.value)} value={timeEdit} type="text" placeholder="Time" />
              <br />
              <input onChange={(e) => setRoomEdit(e.target.value)} value={roomEdit} type="text" placeholder="Room" />
              <input onChange={(e) => setPresentEdit(e.target.value)} value={presentEdit} type="text" placeholder="Present" />
              <br />
              <button onClick={handleEditSubmit}>Submit</button>
              <button onClick={() => setPopup(!popup)} className="close_btn">
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

export default TodayClassCom;
