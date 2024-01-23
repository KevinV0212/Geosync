import React from "react";
import Level2 from "./Level2";
import { useState } from 'react';
import "./List.css";





//Passing in PMESII
function Level1 (props) {

    const ASCOPE = ["Areas", "Structure", "Capabilities", "Organization", "People", "Events"];
    const [toggled, setToggled] = useState([false, false, false, false, false, false]);

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

    return (
        <div>
                {ASCOPE.map((item, i) => (
                    <div>
                        {props.selected[(props.value * 6) + i] &&
                        <div className='item'>
                            <div className='subTitle' onClick={() => toggle(i)}>
                                <h3><b>{item}</b></h3>
                                <span>{toggled[i] === true ? '-' : '+'}</span>
                            </div>
                            <div className={toggled[i] === true ? 'content show' : 'content'}>

                                <Level2 PMESII={props.current} ASCOPE={item} />
                                
                            </div>
                        </div>
                        }   
                    </div>
                    
                )
                )}
            </div>
    )
}

export default Level1;
import React from "react";
import Level2 from "./Level2";
import { useState } from 'react';
import "./List.css";





//Passing in PMESII
function Level1 (props) {

    const ASCOPE = ["Areas", "Structure", "Capabilities", "Organization", "People", "Events"];
    const [toggled, setToggled] = useState([false, false, false, false, false, false]);

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

    return (
        <div>
                {ASCOPE.map((item, i) => (
                    <div>
                        {props.selected[(props.value * 6) + i] &&
                        <div className='item'>
                            <div className='subTitle' onClick={() => toggle(i)}>
                                <h3><b>{item}</b></h3>
                                <span>{toggled[i] === true ? '-' : '+'}</span>
                            </div>
                            <div className={toggled[i] === true ? 'content show' : 'content'}>

                                <Level2 PMESII={props.current} ASCOPE={item} />
                                
                            </div>
                        </div>
                        }   
                    </div>
                    
                )
                )}
            </div>
    )
}

export default Level1;