import React from 'react';


const serverURL = 'http://localhost:3000';

const getExteriorColors = async () => {
    const response = await fetch(`${serverURL}/api/exteriors`);
    const data = await response.json();
    return data;
}

const getRoofs = async () => {
    const response = await fetch(`${serverURL}/api/roofs`);
    const data = await response.json();
    return data;
}

const getInteriors = async () => {
    const response = await fetch(`${serverURL}/api/interiors`);
    const data = await response.json();
    return data;
}

const getWheels = async () => {
    const response = await fetch(`${serverURL}/api/wheels`);
    const data = await response.json();
    return data;
}

export default {
    getExteriorColors,
    getRoofs,
    getInteriors,
    getWheels,
}