import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import '../css/CarBuilder.css'
import CarsAPI from '../services/CarsAPI.jsx'
import convertibleImg from '../assets/convertible.png'
import notConvertibleImg from '../assets/not_convertible.png'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadCar = async () => {
            try {
                const all = await CarsAPI.getAllCars()
                const found = (all || []).find((c) => String(c.id) === String(id))
                if (!found) {
                    setError('We could not find that car.')
                } else {
                    setCar(found)
                }
            } catch (err) {
                setError('Could not load that car.')
            } finally {
                setLoading(false)
            }
        }

        loadCar()
    }, [id])

    const handleDelete = async () => {
        if (!car) return
        try {
            await CarsAPI.deleteCar(car.id)
            navigate('/customcars')
        } catch (err) {
            setError('We could not delete that car right now.')
        }
    }

    if (loading) {
        return (
            <section className='car-details'>
                <p className='car-builder__info'>Loading car…</p>
            </section>
        )
    }

    if (error) {
        return (
            <section className='car-details'>
                <p className='car-builder__error'>{error}</p>
                <button type='button' onClick={() => navigate('/customcars')}>
                    Back to list
                </button>
            </section>
        )
    }

    const image = car.isconvertible || car.isConvertible ? convertibleImg : notConvertibleImg

    return (
        <section className='car-details'>
            <div className='car-details__layout'>
                <article className='car-details__panel'>
                    <h2>{car.name || `Build #${car.id}`}</h2>
                    <p className='car-builder__subtitle'>
                        Detailed breakdown of this custom Bolt build.
                    </p>

                    <div className='car-details__meta'>
                        <div className='car-details__meta-row'>
                            <span className='car-details__label'>Price</span>
                            <span className='car-details__value'>
                                ${Number(car.price || 65000).toLocaleString()}
                            </span>
                        </div>
                        <div className='car-details__meta-row'>
                            <span className='car-details__label'>Exterior</span>
                            <span className='car-details__value'>{car.exterior}</span>
                        </div>
                        <div className='car-details__meta-row'>
                            <span className='car-details__label'>Roof</span>
                            <span className='car-details__value'>{car.roof}</span>
                        </div>
                        <div className='car-details__meta-row'>
                            <span className='car-details__label'>Wheels</span>
                            <span className='car-details__value'>{car.wheels}</span>
                        </div>
                        <div className='car-details__meta-row'>
                            <span className='car-details__label'>Interior</span>
                            <span className='car-details__value'>{car.interior}</span>
                        </div>
                        <div className='car-details__meta-row'>
                            <span className='car-details__label'>Body style</span>
                            <span className='car-details__value'>
                                {car.isconvertible || car.isConvertible ? 'Convertible' : 'Coupe'}
                            </span>
                        </div>
                    </div>

                    <div className='car-details__actions'>
                        <button type='button' onClick={() => navigate('/customcars')}>
                            Back
                        </button>
                        <a href={`/edit/${car.id}`} role='button'>
                            Edit
                        </a>
                        <button type='button' onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </article>

                <article className='car-details__panel car-details__image-wrapper'>
                    <img src={image} alt='Car preview' />
                </article>
            </div>
        </section>
    )
}

export default CarDetails