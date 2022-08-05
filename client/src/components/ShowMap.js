import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXl1ZWw3ODYiLCJhIjoiY2w2ZHJ0Z3A5MDBwNzNlcHJ1c25wc2U4ZSJ9.tVGtKMVNpZNACk3JyJRy9Q';


const useStyles = makeStyles(theme => ({
    mapContainer: {
        width: '400px',
        height: '320px',
        position: 'relative',
        marginBottom: '2rem'
    },

    sidebar: {
        backgroundColor: 'rgba(35, 55, 75, 0.9)',
        color: '#fff',
        padding: '6px 12px',
        fontFamily: 'monospace',
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        margin: '12px',
        borderRadius: '4px'
    }
}));

function ShowMap({ geometry }) {
    const styles = useStyles();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, lat] = geometry.coordinates;
    const zoom = 8;

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom
        });

        new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map.current);
    });

    return (
        <div>
            <div className={styles.sidebar}>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div
                ref={mapContainer}
                className={styles.mapContainer} />
        </div>
    );
}

export default ShowMap;