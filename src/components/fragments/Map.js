import React, {useRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';

function Map() {
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
                zoom:2,
                container: mapElem.current
            })
        })
        return()=>{
            if (!!view) {
                view.destroy();
                view = null;
            }
        }
    })

    return (
        <div style={{height:500}} ref={mapElem}>

        </div>
    )
}

export default Map
