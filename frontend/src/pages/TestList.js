import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";

const TestList = () => {
  let [name, setName] = useState("");
  let [officeTime, setOfficeTime] = useState("");
  let [desgnation, setDesgnation] = useState("");
  let [dayOff, setDayOff] = useState("");
  let [employe, setEmploye] = useState([]);

  let handleSubmit = async () => {
    let { data } = await axios.post("http://localhost:8000/testlist", {
      name: name,
      officeTime: officeTime,
      desgnation: desgnation,
      dayOff: dayOff,
      details: content,
    });
    console.log(data);
  };

  useEffect(() => {
    async function employe() {
      let { data } = await axios.get("http://localhost:8000/testlist");
      setEmploye(data);
    }
    employe();
  }, []);

  // Jodit
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <>
      <div style={{ marginLeft: "250px" }}>
        <div className="employe_form">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
          <input value={officeTime} onChange={(e) => setOfficeTime(e.target.value)} type="text" placeholder="Office Time" />
          <br />
          <input value={desgnation} onChange={(e) => setDesgnation(e.target.value)} type="text" placeholder="Desgnation" />
          <input value={dayOff} onChange={(e) => setDayOff(e.target.value)} type="text" placeholder="Day Off" />
          <br />

          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div style={{ width: "980px" }}>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
        </div>
        <div id="employe_table">
          <div className="employe_table">
            <div className="employe_table_text">Name</div>
            <div className="employe_table_text">Department</div>
            <div className="employe_table_text">Office Time</div>
            <div className="employe_table_text">Day Off</div>
            <div className="employe_table_text">Details</div>
          </div>
          {employe.map((data) => (
            <div key={data._id} className="employe_table_down">
              <div className="employe_table_text_down">{data.name}</div>
              <div className="employe_table_text_down">{data.desgnation}</div>
              <div className="employe_table_text_down">{data.officeTime}</div>
              <div className="employe_table_text_down">{data.dayOff}</div>
              <div className="employe_table_text_down" dangerouslySetInnerHTML={{ __html: data.details }}></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TestList;
