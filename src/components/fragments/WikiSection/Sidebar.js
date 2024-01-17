import { useState} from 'react';
import Level1 from './Level1';
import "./List.css";
import { FaCheck } from "react-icons/fa6";
import './Sidebar.css';

function Sidebar() {    

    const [toggled, setToggled] = useState([true, true, true, true, true, true]);
    const PMESII = ["Political",  "Military", "Economic", "Social", "Information", "Infrastructure"]; 
    const [selectedPMESII, setSelectedPMESII] = useState([true, true, true, true, true, true]);
    const ASCOPE = ["Areas", "Structure", "Capabilities", "Organization", "People", "Events"];
    const [selectedASCOPE, setSelectedASCOPE] = useState([true, true, true, true, true, true, true, true, true, true, true, true,true, true, true, true, true, true,true, true, true, true, true, true,true, true, true, true, true, true,true, true, true, true, true, true,]);

    function toggle (i){
      const updated = toggled.map((item, index) => {
        if(index === i) {
            return !item;
        } else {
            return item;
        }
      });
      setToggled(updated);
    }

    function filterPMESII (i){
        const updated = selectedPMESII.map((item, index) => {
          if(index === i) {
              return !item;
          } else {
              return item;
          }
        });
        setSelectedPMESII(updated);
    }

    function filterASCOPE (i){
        const updated = selectedASCOPE.map((item, index) => {
          if(index === i) {
              return !item;
          } else {
              return item;
          }
        });
        setSelectedASCOPE(updated);
      }


    return (
        <div>
        <section className="sidebar">
            <h3 className="header"><b><u>Filters</u></b></h3>
            {PMESII.map((item, i) => (
                <div>
                <div className = "filter" key={i}>
                    {item} 
                    {"\t"}
                    <button className="button filter" onClick={() => filterPMESII(i)}>
                    <span>{selectedPMESII[i] === true ? <FaCheck /> : ' '}</span>
                    </button>
                </div>
                <div className={selectedPMESII[i] === true ? 'content show' : 'content'}>
                    {selectedPMESII[i] && 
                        <section>
                            {ASCOPE.map((item, j) => (
                            <div>
                            <div className = "filter" key={(i*6) + j}>
                                {item} 
                                {"\t"}
                                <button className="button filter" onClick={() => filterASCOPE((i*6) + j)}>
                                <span>{selectedASCOPE[(i*6) + j] === true ? <FaCheck /> : ' '}</span>
                                </button>
                            </div>
                            </div>
                    
                            )
                            )}
                  
                     </section>
                    
                    }
                </div>
                </div>
            )
            )}
        </section>
        
        <section className='listContainer'>
            <div className = 'wrapper'>
                <div className = 'accordian'>
                    {PMESII.map((item, i) => (
                        <div>
                            {selectedPMESII[i] &&
                                <div>
                                    <div className='title' onClick = {() => toggle(i)}>
                                        <h2><b>{item}</b></h2>
                                        <span>{toggled[i] === true ? '-' : '+'}</span>
                                    </div>
                                    <div className={toggled[i] === true ? 'content show' : 'content'}>
                                        <Level1 current = {item} selected = {selectedASCOPE} value = {i}/>
                                    </div>
                                    
                                </div>
                            }
                        </div>
                            
                    )
                    )}
                </div>
                
            
            </div>
        </section>
        </div>
    )

   
 
 
}



export default Sidebar;
