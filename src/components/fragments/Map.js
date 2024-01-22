import React, {useState, useMemo, useRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import './Map.css';

function Map() {
    // Country selector
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
  
    const changeHandler = value => {
      setValue(value)
    }

    // Map
    const mapElem = useRef(null);

    useEffect(()=>{
        let view;
        loadModules(["esri/views/MapView", "esri/WebMap"], {css:true}).then(([MapView, WebMap])=>{
            const webmap = new WebMap({
                basemap:"topo-vector"
            })
            view = new MapView({
                map: webmap,
                center: [0,0],
                zoom: 2,
                container: mapElem.current
            })
        })
        return()=>{
            if (!!view) {
                view.destroy();
                view = null;
            }
        }
    }, [])

    // PMESII-PT filters
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: true,
        checkbox2: true,
        checkbox3: true,
        checkbox4: true,
        checkbox5: true,
        checkbox6: true
      });
    
      const handleCheckboxChange = (checkboxName) => {
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          [checkboxName]: !prevCheckboxes[checkboxName],
        }));
      };


    return (
        <div className="home">
            <div className="filters-container">
                <h3>PMESII Filters</h3>
                <form className="filters-form">
                    <div className="filter">
                        <label>
                            <input
                            type="checkbox"
                            checked={checkboxes.checkbox1}
                            onChange={() => handleCheckboxChange('checkbox1')}
                            />
                            Political
                        </label>
                    </div>
                    <div className="filter">
                        <label>
                            <input
                            type="checkbox"
                            checked={checkboxes.checkbox2}
                            onChange={() => handleCheckboxChange('checkbox2')}
                            />
                            Military
                        </label>
                    </div>
                    <div className="filter">
                        <label>
                            <input
                            type="checkbox"
                            checked={checkboxes.checkbox3}
                            onChange={() => handleCheckboxChange('checkbox3')}
                            />
                            Economic
                        </label>
                    </div>
                    <div className="filter">
                        <label>
                            <input
                            type="checkbox"
                            checked={checkboxes.checkbox4}
                            onChange={() => handleCheckboxChange('checkbox4')}
                            />
                            Social
                        </label>
                    </div>
                    <div className="filter">
                        <label>
                            <input
                            type="checkbox"
                            checked={checkboxes.checkbox5}
                            onChange={() => handleCheckboxChange('checkbox5')}
                            />
                            Information
                        </label>
                    </div>
                    <div className="filter">
                        <label>
                            <input
                            type="checkbox"
                            checked={checkboxes.checkbox6}
                            onChange={() => handleCheckboxChange('checkbox6')}
                            />
                            Infrastructure
                        </label>         
                    </div>       
                </form>
            </div>
            <div className="map-container">
                <Select placeholder="Select a Country" options={options} value={value} onChange={changeHandler} />
                <div className="map" ref={mapElem}></div>
            </div>
        </div>
    )
}

export default Map