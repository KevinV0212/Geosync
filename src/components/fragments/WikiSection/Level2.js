import React from "react";
import testEntries from "../wikiTest";

//Passing in PMESII and ASCOPE
function Level2 (props) {

    return (
        <div>
            {testEntries.filter((element) => element[props.PMESII] === true && element[props.ASCOPE] === true).map((item, i) => (
                <div className='element'>
                    <div className='individualTitle'>
                        <h4><b>{item.Title}</b></h4>           
                    </div>
                    <div className='individualContent'>
                        <>{item.Description}</>
                    </div>
                </div>
            
            ))}
        </div>
    )
}

export default Level2