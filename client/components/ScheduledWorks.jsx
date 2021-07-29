import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet';
import { usePosition } from 'use-position'
import { getScheduledWorks } from '../api'

export default function Header() {
    const watch = true
    const { latitude, longitude } = usePosition(watch)
    // const [worksPosition, setWorksPosition] = useState([])
    const [scheduledWorks, setScheduledWorks] = useState([-36.8509, 174.7645])
    const [map, setmap] = useState(null)

    // const greenIcon = new L.Icon({
    //     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    //     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    //     iconSize: [25, 41],
    //     iconAnchor: [12, 41],
    //     popupAnchor: [1, -34],
    //     shadowSize: [41, 41]
    // });

    // useEffect(() => {
    //     if (latitude !== undefined && longitude !== undefined) {
    //         return getScheduledWorks()
    //             .then(works => {
    //                 console.log('Logging useEffect', [works.response[0].latitude, works.response[0].longitude])
    //                 return null
    //             })
    //     }
    // }, [latitude, longitude])


    // if (latitude === undefined && longitude === undefined) {
    //     return null
    // }

    function displayScheduledWorks(evt) {
        evt.preventDefault()
        getScheduledWorks()

            .then(works => {
                console.log('Logging displayScheduledWorks function:', [works.response[0]])
                setScheduledWorks(works.response.map(work => <li key={work.id}>{[work.latitude, work.longitude]}</li>))
                setmap(
                    <div className='map' style={{ height: '400px', width: '100%' }}>
                        <MapContainer className='map-container' center={[-36.8509, 174.7645]} zoom={10} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {works.response.map(work => <Marker position={[work.latitude, work.longitude]} key={work.id}><Tooltip>{work.name}, {work.suburb}, {work.address}, {work.startDate},{work.lastUpdated}</Tooltip></Marker>)}
                        </MapContainer>
                    </div>
                )

                // const recentWorks = []
                // works.filter((function (position) {
                //     if (!recentWorks.includes)
                // }))

            })
        // return (
        //     <MapContainer className='map-container' center={[-36.8509, 174.7645]} zoom={10} scrollWheelZoom={true} style={{ height: '400px', width: '400px' }}>
        //         <TileLayer
        //             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //         />
        //         <Marker position={[-36.9915, 174.8734]}></Marker>
        //         {/* {works.response.map(work => <Marker position={[work.latitude, work.longitude]} key={work.id}></Marker>)} */}
        //     </MapContainer>
        // )
    }

    return (
        <div className='scheduled-works'>
            <button onClick={displayScheduledWorks}>Show scheduled works in Auckland</button>
            <div>{map}</div>
        </div>
    )
}