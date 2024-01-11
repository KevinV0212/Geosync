import "./Sidebar.css";
import { useState } from 'react';
import { FaCheck } from "react-icons/fa6";
import AscopeFilter from "./AscopeFilter";

function Sidebar() {

  const PMESII = ["Political",  "Military", "Economic", "Social", "Information", "Infrastructure"];
  const [selectedPMESII, setSelectedPMESII] = useState([true, true, true, true, true, true]);

  function toggle (i){
    const updated = selectedPMESII.map((item, index) => {
      if(index === i) {
          return !item;
      } else {
          return item;
      }
    });
    setSelectedPMESII(updated);
  }

  return (
    <section className="sidebar">
      <h3 className="header"><b><u>Filters</u></b></h3>
      {PMESII.map((item, i) => (
        <div>
          <div className = "filter" key={i}>
            {item} 
            {"\t"}
            <button className="button filter" onClick={() => toggle(i)}>
              <span>{selectedPMESII[i] === true ? <FaCheck /> : ' '}</span>
            </button>
          </div>
          <div className={selectedPMESII[i] === true ? 'content show' : 'content'}>
              {selectedPMESII[i] && <AscopeFilter />}
          </div>
        </div>
      )
      )}
    </section>
  )
}

//export {currentSelected};
export default Sidebar;
