import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet';
import { usePosition } from 'use-position'
import { getFerryPositions } from '../api'

export default function FerryPositions() {
    const watch = true
    const { latitude, longitude } = usePosition(watch)
    const [ferryPosition, setFerrryPosition] = useState([])
    const [ferries, setFerries] = useState([-36.8509, 174.7645])
    const [map, setmap] = useState(null)

    function displayFerryPositions(evt) {
        evt.preventDefault()
        getFerryPositions()
            .then(ferries => {
                console.log('Logging displayFerryPositions function:', [ferries.response[0]])
                setFerrryPosition(ferries.response.map(ferry => <li key={ferry.mmsi}>{[ferry.lat, ferry.lng]}</li>))
                setmap(
                    <div className='map' style={{ height: '400px', width: '100%' }}>
                        <MapContainer className='map-container' center={[-36.8509, 174.7645]} zoom={10} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {ferries.response.map(ferry => <Marker position={[ferry.lat, ferry.lng]} key={ferry.mmsi}><Tooltip>Vessel name: {ferry.vessel}, ETA: {ferry.eta}, operator: {ferry.operator}, timestamp: {ferry.timestamp}</Tooltip></Marker>)}
                        </MapContainer>
                    </div>
                )
            })
    }

    return (
        <div className='ferry-positions'>
            <button onClick={displayFerryPositions}>Show Ferry Positions in Auckland</button>
            <div>{map}</div>
        </div>
    )
}