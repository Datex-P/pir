import {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

// const ws = new WebSocket('ws://machinestream.herokuapp.com/api/v1/events/websocket?vsn=2.0.0');
  
//   if (ws) {

//    ws.onopen = () => ws.send('["1", "1", "events", "phx_join", {}]');
//    let increment = {number:0}
//    setInterval(()=>{

//     ws.send(`[null, "${++increment.number}", "phoenix", "heartbeat", {}]`)
//    },5000)
//    ws.onmessage = (e) => {
//      console.log(e, 'data here')
//    }
//   }

export default function LeafletMap() {

  const [machines, setMachines] = useState(null)
  const [markerActive, setMarkerActive] = useState(false)
  const [index, setIndex] = useState(null)



  function getCurrentDate(x) {
    const t = new Date(x);
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    return `${date}/${month}/${year}`;
  }
 
   useEffect(()=>{
    
    async function getMachines() {
    
    const machines = await fetch('https://machinestream.herokuapp.com/api/v1/machines',
    {method:'GET',
    headers: {'Content-Type': 'application/json'} 
    })
    const response = await machines.json()
    setMachines(response.data)
    console.log(machines, 'machines here') //=>stale state
    }
    getMachines()
  }, [])

  useEffect(()=>{
    console.log(machines, 'machines here')
    //console.log(index, 'index')
  },[machines])

  useEffect(()=>{
    console.log(markerActive, 'marker active')
  },[markerActive])

//   const LocationFinderDummy = ({index}) => {
//     useMapEvents({
//         click(e) {
//           console.log(e, 'e here')
//            // console.log(machines[index]);
//         },
//     });
//     return null;
// };

  return (
    <div>
       {
           markerActive && 
          <div className='sidebar'>
            status: {
              machines[0]?.status
            }
            <span 
          //  className='sidebar-span'
            style={{
          
              backgroundColor: machines[0]?.status === 'running'? 'green':
              machines[0]?.status === 'repaired'? 'yellow':'red',     
            }}></span> 
          </div>
        }
    <div id='map' style={{display:'inline-block'}}>  
      <MapContainer
        className="markercluster-map"
        center={machines ? [machines[0]?.latitude, machines[0]?.longitude]:[48.095, 11.524]}
        zoom={14}
        maxZoom={18}
        style={{ height:'90vh', width:'80vw', left:'20%'}}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        //  style={{width:'100%', height:'100%'}}
        />
          { 
          machines && machines
          .map((el,index)=>(
        <Marker position={[ el.longitude,el.latitude]}
          key={index}
        >
        <Popup>
          <div className='popup-inner'>
            <span>Machine-type: {machines[index]?.machine_type || ''}</span>
            <span>Installation-date: {getCurrentDate(machines[index]?.last_maintenance).toString()}</span>
            <span>Last maintenance: {getCurrentDate(machines[index]?.last_maintenance).toString()}</span>
          </div>
        </Popup>
        </Marker>
        ))
        }  
      </MapContainer>
      </div>
     
      </div>
  );
}