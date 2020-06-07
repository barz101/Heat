import React from 'react'
import { CityPreview } from './CityPreview';

export default function CityList(props) {
    
    return (
        <ul className="city-list">
            {props.cities && props.cities.map((city, idx) => <CityPreview city={city} idx={idx} key={city._id}/> )}
        </ul>
    )
}
