import React, { useEffect, useState } from 'react'
import '../App.css'
import '../css/CarBuilder.css'
import CarsAPI from '../services/CarsAPI.jsx'
import convertibleImg from '../assets/convertible.png'
import notConvertibleImg from '../assets/not_convertible.png'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadCars = async () => {
            try {
                const data = await CarsAPI.getAllCars()
                setCars(data || [])
            } catch (err) {
                setError('Could not load saved cars.')
            } finally {
                setLoading(false)
            }
        }

        loadCars()
    }, [])

    const handleDelete = async (id) => {
        try {
            await CarsAPI.deleteCar(id)
            setCars((current) => current.filter((car) => car.id !== id))
        } catch (err) {
            setError('We could not delete that car right now.')
        }
    }

    const renderContent = () => {
        if (loading) {
            return <p className='car-builder__info'>Loading your builds…</p>
        }

        if (error) {
            return <p className='car-builder__error'>{error}</p>
        }

        if (!cars.length) {
            return (
                <p className='car-builder__info'>
                    You have not saved any custom cars yet. Head back to Customize to create your first build.
                </p>
            )
        }

        return (
            <div className='car-list__grid'>
                {cars.map((car) => {
                    const image = car.isconvertible || car.isConvertible ? convertibleImg : notConvertibleImg

                    return (
                        <article key={car.id} className='car-card'>
                            <div className='car-card__title-row'>
                                <h3 className='car-card__title'>{car.name || `Build #${car.id}`}</h3>
                                <span className='car-card__tag'>
                                    {car.isconvertible || car.isConvertible ? 'Convertible' : 'Coupe'}
                                </span>
                            </div>

                            <div className='car-card__price'>
                                ${Number(car.price || 65000).toLocaleString()}
                            </div>

                            <p className='car-card__meta'>
                                Exterior: {car.exterior} • Roof: {car.roof} • Wheels: {car.wheels} • Interior: {car.interior}
                            </p>

                            <div className='car-details__image-wrapper'>
                                <img src={image} alt='Car preview' />
                            </div>

                            <footer className='car-card__actions'>
                                <a href={`/customcars/${car.id}`} role='button'>
                                    View
                                </a>
                                <a href={`/edit/${car.id}`} role='button'>
                                    Edit
                                </a>
                                <button type='button' onClick={() => handleDelete(car.id)}>
                                    Delete
                                </button>
                            </footer>
                        </article>
                    )
                })}
            </div>
        )
    }

    return (
        <section className='car-list'>
            <header className='car-list__header'>
                <h2>Your custom cars</h2>
                <p className='car-builder__subtitle'>
                    View, edit, or delete builds you have created.
                </p>
            </header>

            {renderContent()}
        </section>
    )
}

export default ViewCars