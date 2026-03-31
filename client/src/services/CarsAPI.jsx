import React from 'react';

const serverURL = 'http://localhost:3000';

const getAllCars = async () => {
    const response = await fetch(`${serverURL}/api/cars`);
    const data = await response.json();
    return data;
}

const createCar = async (car) => {
    console.log("Tried to create car", car);
    const response = await fetch(`${serverURL}/api/cars`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
    });
    const data = await response.json();
    console.log("Created car", data);
    return data;
}

const updateCar = async (id, car) => {
    const response = await fetch(`${serverURL}/api/cars/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
    });
    const data = await response.json();
    return data;
}

const deleteCar = async (id) => {
    const response = await fetch(`${serverURL}/api/cars/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}

export default {
    getAllCars,
    createCar,
    updateCar,
    deleteCar,
}