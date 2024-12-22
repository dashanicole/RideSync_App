import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder';
import DestMarker from '../../../assets/location.png'
import Driver from '../../../assets/driver2.png'
import Location from '../../../assets/startLocation.png'
import otwIcon from '../../../assets/MotorCycle.png'

const Components = ({
  selectedPositionDest,
  mapRef,
  selectedPosition,
  customIcon,
  height,
  borderRadius,
  driverCoordinates,
  isDriverHasArrive,

}) => {
  return (
    <div className='flex flex-col  w-full    '>

      <div className='ml-3 mr-3 mt-3 '>
        <MapContainer
          center={selectedPosition ? [selectedPosition?.lat, selectedPosition?.lon] : [10.3157, 123.8854]} // Default center
          zoom={15}
          scrollWheelZoom={true}
          style={{ height, borderRadius }}
          ref={mapRef}
        >
<TileLayer
  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
/>

 
          {selectedPosition && (
            <Marker
              position={[selectedPosition?.lat, selectedPosition?.lon]}
              icon={isDriverHasArrive ? customIcon(otwIcon) : customIcon(Location)}
            >
              <Popup>{selectedPosition?.display_name}</Popup>
            </Marker>
          )}
          {selectedPositionDest && (
            <Marker
              position={[selectedPositionDest?.lat, selectedPositionDest?.lon]}
              icon={customIcon(DestMarker)}
            >
              <Popup>Your Location</Popup>
            </Marker>
          )}
          {
            driverCoordinates &&
             (
              !isDriverHasArrive && (
                <Marker
                  position={[driverCoordinates?.lat, driverCoordinates?.lon]}
                  icon={customIcon(Driver)}
                >
                  <Popup>Driver Location</Popup>
                </Marker>
              )
            )
          }
        </MapContainer>
      </div>
    </div>
  )
}

export default Components