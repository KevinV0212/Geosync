import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

function AscopeFilter() {
  const ASCOPE = [
    "Areas",
    "Structure",
    "Capabilities",
    "Organization",
    "People",
    "Events",
  ];
  const [selectedASCOPE, setSelectedASCOPE] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  function toggle(i) {
    const updated = selectedASCOPE.map((item, index) => {
      if (index === i) {
        return !item;
      } else {
        return item;
      }
    });
    setSelectedASCOPE(updated);
  }

  return (
    <section>
      {ASCOPE.map((item, i) => (
        <div>
          <div className="filter" key={i}>
            {item}
            {"\t"}
            <button className="button filter" onClick={() => toggle(i)}>
              <span>{selectedASCOPE[i] === true ? <FaCheck /> : " "}</span>
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default AscopeFilter;
