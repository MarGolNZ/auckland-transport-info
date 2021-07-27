import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet';
import { usePosition } from 'use-position'
import { getScheduledWorks } from '../api'

export default function Header() {
    const watch = true
    const { latitude, longitude } = usePosition(watch)
    const [position, setPosition] = useState([174.7645, 36.8509])

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
    //                 console.log(works)
    //                 return null
    //             })
    //     }
    // }, [latitude, longitude])

    // if (latitude === undefined && longitude === undefined) {
    //     return null
    // }

    return (
        <div className='scheduled-works'>
            <h2>Hello from map</h2>
            <div className='map' style={{ height: '400px', width: '400px' }}>
                <MapContainer className='map-container' center={position} zoom={10} scrollWheelZoom={true} style={{ height: '400px', width: '400px' }}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}></Marker>
                </MapContainer>
            </div>
        </div>
    )
}