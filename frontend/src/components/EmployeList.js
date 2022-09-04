import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeList = () => {
  // return true/false variable
  let [one, setOne] = useState(true);
  let [popup, setPopup] = useState(false);

  // State update variable
  let [name, setName] = useState("");
  let [officeTime, setOfficeTime] = useState("");
  let [desgnation, setDesgnation] = useState("");
  let [dayOff, setDayOff] = useState("");

  // API data get variable
  let [employe, setEmploye] = useState([]);

  // Edit variable
  let [eName, setEname] = useState("");
  let [eOfficeTime, setEofficeTime] = useState("");
  let [eDesgnation, setEdesgnation] = useState("");
  let [eDayOff, setEdayOff] = useState("");
  let [eId, setEid] = useState("");

  // Handle added data
  let handleSubmit = () => {
    if (!name && !officeTime && !desgnation && !dayOff) {
      alert("Fill the all details");
    } else {
      axios.post("http://localhost:8000/employelist", {
        name: name,
        officeTime: officeTime,
        desgnation: desgnation,
        dayOff: dayOff,
      });
      setName("");
      setDayOff("");
      setDesgnation("");
      setOfficeTime("");
      setOne(!one);
    }
  };

  // Handle get all employe data
  useEffect(() => {
    async function employe() {
      const { data } = await axios.get("http://localhost:8000/employelist");
      setEmploye(data);
    }
    employe();
  }, [one]);

  // Handle delete employe data
  let handleDelete = (id) => {
    axios.delete(`http://localhost:8000/employelist/${id}`);
    setOne(!one);
  };

  // Handle get employe single data for edit
  let handleEdit = async (id) => {
    async function employe() {
      const { data } = await axios.get(`http://localhost:8000/employelist/${id}`);
      setEname(data.name);
      setEdayOff(data.dayOff);
      setEdesgnation(data.desgnation);
      setEofficeTime(data.officeTime);
      setEid(data._id);
    }
    employe();
    setPopup(!popup);
  };

  // Handle edit employe data with put
  let handleEditSubmit = (id) => {
    axios.put(`http://localhost:8000/employelist/${id}`, {
      name: eName,
      officeTime: eOfficeTime,
      desgnation: eDesgnation,
      dayOff: eDayOff,
    });
    setOne(!one);
    setPopup(!popup);
  };

  return (
    <>
      <div className="margin_left">
        <div className="employe_form">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
          <input value={officeTime} onChange={(e) => setOfficeTime(e.target.value)} type="text" placeholder="Office Time" />
          <br />
          <input value={desgnation} onChange={(e) => setDesgnation(e.target.value)} type="text" placeholder="Desgnation" />
          <input value={dayOff} onChange={(e) => setDayOff(e.target.value)} type="text" placeholder="Day Off" />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div id="employe_table">
          <div className="employe_table">
            <div className="employe_table_text">Name</div>
            <div className="employe_table_text">Desgnation</div>
            <div className="employe_table_text">Office Time</div>
            <div className="employe_table_text">Day Off</div>
            <div className="employe_table_text">Actions</div>
          </div>
          {employe.map((data) => (
            <div key={data._id} className="employe_table_down">
              <div className="employe_table_text_down">{data.name}</div>
              <div className="employe_table_text_down">{data.desgnation}</div>
              <div className="employe_table_text_down">{data.officeTime}</div>
              <div className="employe_table_text_down">{data.dayOff}</div>
              <div className="employe_table_text_down">
                <button onClick={() => handleEdit(data._id)} className="button">
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
              <input onChange={(e) => setEname(e.target.value)} value={eName} type="text" placeholder="Name" />
              <input onChange={(e) => setEofficeTime(e.target.value)} value={eOfficeTime} type="text" placeholder="Office Time" />
              <br />
              <input onChange={(e) => setEdesgnation(e.target.value)} value={eDesgnation} type="text" placeholder="Desgnation" />
              <input onChange={(e) => setEdayOff(e.target.value)} value={eDayOff} type="text" placeholder="Day Off" />
              <br />
              <button onClick={() => handleEditSubmit(eId)}>Submit</button>
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

export default EmployeList;
