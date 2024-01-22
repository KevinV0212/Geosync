import "../App.css";
import { useState } from "react";
import Level1 from "./Level1";
import "./List.css";

function List() {
  const [toggled, setToggled] = useState([true, true, true, true, true, true]);
  const PMESII = [
    "Political",
    "Military",
    "Economic",
    "Social",
    "Information",
    "Infrastructure",
  ];

  function toggle(i) {
    const updated = toggled.map((item, index) => {
      if (index === i) {
        return !item;
      } else {
        return item;
      }
    });
    setToggled(updated);
  }

  return (
    <section className="listContainer">
      <div className="wrapper">
        <div className="accordian">
          {PMESII.map((item, i) => (
            <div>
              <div className="title" onClick={() => toggle(i)}>
                <h2>
                  <b>{item}</b>
                </h2>
                <span>{toggled[i] === true ? "-" : "+"}</span>
              </div>
              <div className={toggled[i] === true ? "content show" : "content"}>
                <Level1 current={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default List;
