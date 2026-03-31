import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import '../css/CarBuilder.css'
import CarsAPI from '../services/CarsAPI.jsx'
import CarParts from '../services/CarParts.jsx'
import convertibleImg from '../assets/convertible.png'
import notConvertibleImg from '../assets/not_convertible.png'

const BASE_PRICE = 65000

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [activeSection, setActiveSection] = useState('Exterior')
    const [carId, setCarId] = useState(null)
    const [carName, setCarName] = useState('')
    const [convertible, setConvertible] = useState(false)

    const [exteriors, setExteriors] = useState([])
    const [roofs, setRoofs] = useState([])
    const [interiors, setInteriors] = useState([])
    const [wheels, setWheels] = useState([])

    const [selectedExterior, setSelectedExterior] = useState(null)
    const [selectedRoof, setSelectedRoof] = useState(null)
    const [selectedInterior, setSelectedInterior] = useState(null)
    const [selectedWheels, setSelectedWheels] = useState(null)

    const [error, setError] = useState('')
    const [info, setInfo] = useState('')
    const [popupMessage, setPopupMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    allCars,
                    exteriorData,
                    roofData,
                    interiorData,
                    wheelsData
                ] = await Promise.all([
                    CarsAPI.getAllCars(),
                    CarParts.getExteriorColors(),
                    CarParts.getRoofs(),
                    CarParts.getInteriors(),
                    CarParts.getWheels()
                ])

                const found = (allCars || []).find((car) => String(car.id) === String(id))

                if (!found || !exteriorData || !roofData || !interiorData || !wheelsData) {
                    setError('We could not find that car.')
                    setLoading(false)
                } else {
                    setExteriors(exteriorData)
                    setRoofs(roofData)
                    setInteriors(interiorData)
                    setWheels(wheelsData)

                    setCarId(found.id)
                    setCarName(found.name || '')
                    setConvertible(Boolean(found.isconvertible ?? found.isConvertible))

                    setSelectedExterior(
                        exteriorData.find((option) => option.name === found.exterior) || null
                    )
                    setSelectedRoof(
                        roofData.find((option) => option.name === found.roof) || null
                    )
                    setSelectedInterior(
                        interiorData.find((option) => option.name === found.interior) || null
                    )
                    setSelectedWheels(
                        wheelsData.find((option) => option.name === found.wheels) || null
                    )
                    setLoading(false)
                }
            } catch (err) {
                setError('Could not load that car.')
                setLoading(false)
            }
        }

        loadData()
    }, [id])

    const normalisePrice = (value) => {
        if (value == null) return 0
        if (typeof value === 'number') return value
        const parsed = parseFloat(value)
        return Number.isNaN(parsed) ? 0 : parsed
    }

    const totalPrice = useMemo(() => {
        const partsTotal =
            normalisePrice(selectedExterior?.price) +
            normalisePrice(selectedRoof?.price) +
            normalisePrice(selectedInterior?.price) +
            normalisePrice(selectedWheels?.price)

        return BASE_PRICE + partsTotal
    }, [selectedExterior, selectedRoof, selectedInterior, selectedWheels])

    const validateSelections = () => {
        if (!selectedExterior || !selectedRoof || !selectedInterior || !selectedWheels) {
            setError('Please choose one Exterior, Roof, Wheels, and Interior before saving.')
            return false
        }

        const roofConvertibleOnly = selectedRoof.isconvertible === true || selectedRoof.isConvertible === true
        if (convertible && !roofConvertibleOnly) {
            setError('Convertible builds require a convertible-only roof option.')
            return false
        }
        if (!convertible && roofConvertibleOnly) {
            setError('Non-convertible builds cannot use a convertible-only roof option.')
            return false
        }

        setError('')
        return true
    }

    const handleSelectRoof = (option) => {
        const roofConvertibleOnly = option.isconvertible === true || option.isConvertible === true

        if (convertible && !roofConvertibleOnly) {
            setPopupMessage('This roof is not available for convertible builds. Please choose a convertible-only roof option.')
            return
        }

        if (!convertible && roofConvertibleOnly) {
            setPopupMessage('This roof is convertible-only. Turn on Convertible or choose a non-convertible roof option.')
            return
        }

        setSelectedRoof(option)
        setError('')
        setInfo(`Roof set to ${option.name}.`)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!carId) return

        if (!validateSelections()) return

        setSaving(true)
        setError('')
        setInfo('')

        try {
            const payload = {
                name: carName || 'My Bolt Build',
                exterior: selectedExterior?.name,
                roof: selectedRoof?.name,
                interior: selectedInterior?.name,
                wheels: selectedWheels?.name,
                price: totalPrice,
                isConvertible: convertible,
            }

            await CarsAPI.updateCar(carId, payload)
            navigate(`/customcars/${carId}`)
        } catch (err) {
            setError('We could not save your changes.')
        } finally {
            setSaving(false)
        }
    }

    const renderOptions = () => {
        const commonProps = { label: activeSection }
        if (activeSection === 'Exterior') {
            return (
                <OptionsGrid
                    {...commonProps}
                    options={exteriors}
                    selected={selectedExterior}
                    onSelect={(option) => {
                        setSelectedExterior(option)
                        setInfo(`Exterior set to ${option.name}.`)
                    }}
                />
            )
        }
        if (activeSection === 'Roof') {
            return (
                <OptionsGrid
                    {...commonProps}
                    options={roofs}
                    selected={selectedRoof}
                    onSelect={handleSelectRoof}
                />
            )
        }
        if (activeSection === 'Wheels') {
            return (
                <OptionsGrid
                    {...commonProps}
                    options={wheels}
                    selected={selectedWheels}
                    onSelect={(option) => {
                        setSelectedWheels(option)
                        setInfo(`Wheels set to ${option.name}.`)
                    }}
                />
            )
        }
        return (
            <OptionsGrid
                {...commonProps}
                options={interiors}
                selected={selectedInterior}
                onSelect={(option) => {
                    setSelectedInterior(option)
                    setInfo(`Interior set to ${option.name}.`)
                }}
            />
        )
    }

    if (loading && !error) {
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

    const currentImage = convertible ? convertibleImg : notConvertibleImg

    return (
        <main className='car-builder'>
            <section className='car-builder__panel car-builder__preview'>
                <div className='car-builder__preview-card'>
                    <header className='car-builder__preview-header'>
                        <div />
                        <span className='car-builder__badge'>
                            {convertible ? 'Convertible' : 'Coupe'}
                        </span>
                    </header>

                    <div className='car-builder__price'>
                        ${totalPrice.toLocaleString()}
                        <span>updated build</span>
                    </div>

                    <div className='car-builder__summary'>
                        <SummaryItem label='Exterior' value={selectedExterior?.name || 'Not selected'} />
                        <SummaryItem label='Roof' value={selectedRoof?.name || 'Not selected'} />
                        <SummaryItem label='Wheels' value={selectedWheels?.name || 'Not selected'} />
                        <SummaryItem label='Interior' value={selectedInterior?.name || 'Not selected'} />
                    </div>

                    <div className='car-builder__image-wrapper'>
                        <img src={currentImage} alt={convertible ? 'Convertible build' : 'Fixed roof build'} />
                    </div>
                </div>

                <div className='car-builder__preview-card'>
                    <h3>Edit summary</h3>
                    <p className='car-builder__subtitle'>
                        Update the build name and part selections, then save.
                    </p>

                    <label>
                        <span className='car-builder__summary-label'>Build name</span>
                        <input
                            className='car-builder__name-input'
                            type='text'
                            value={carName}
                            onChange={(event) => setCarName(event.target.value)}
                        />
                    </label>

                    <div className='car-builder__submit-row'>
                        <div>
                            {error && <p className='car-builder__error'>{error}</p>}
                            {!error && info && <p className='car-builder__info'>{info}</p>}
                        </div>
                        <button type='button' onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                        <button type='button' onClick={handleSubmit} disabled={saving}>
                            {saving ? 'Saving…' : 'Save changes'}
                        </button>
                    </div>
                </div>
            </section>

            <section className='car-builder__panel'>
                <header>
                    <h2>Update parts</h2>
                    <p className='car-builder__subtitle'>
                        Toggle sections to update your current build options.
                    </p>
                </header>

                <div className='car-builder__toggles'>
                    {['Exterior', 'Roof', 'Wheels', 'Interior'].map((section) => (
                        <button
                            key={section}
                            type='button'
                            className='car-builder__toggle-btn'
                            aria-pressed={activeSection === section}
                            onClick={() => setActiveSection(section)}
                        >
                            {section}
                        </button>
                    ))}
                </div>

                <label className='car-builder__convertible-switch'>
                    <input
                        type='checkbox'
                        checked={convertible}
                        onChange={(event) => {
                            const nextConvertible = event.target.checked
                            const roofConvertibleOnly = selectedRoof?.isconvertible === true || selectedRoof?.isConvertible === true

                            if (selectedRoof) {
                                if (nextConvertible && !roofConvertibleOnly) {
                                    setPopupMessage('Your current roof is not available for convertible builds. Please choose a convertible-only roof option.')
                                }
                                if (!nextConvertible && roofConvertibleOnly) {
                                    setPopupMessage('Your current roof is convertible-only. Please choose a non-convertible roof option.')
                                }
                            }
                            setConvertible(nextConvertible)
                            setError('')
                        }}
                    />
                    <span>Convertible</span>
                </label>

                <div style={{ marginTop: '1rem' }}>
                    {renderOptions()}
                </div>
            </section>

            {popupMessage && (
                <div className='car-builder__modal-overlay' role='dialog' aria-modal='true'>
                    <div className='car-builder__modal'>
                        <h3>Selection not allowed</h3>
                        <p>{popupMessage}</p>
                        <div className='car-builder__modal-actions'>
                            <button type='button' onClick={() => setPopupMessage('')}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

const OptionsGrid = ({ label, options, selected, onSelect }) => {
    if (!options || options.length === 0) {
        return <p className='car-builder__info'>No {label.toLowerCase()} options available yet.</p>
    }

    return (
        <div className='car-builder__options-grid'>
            {options.map((option) => {
                const isSelected = selected?.id === option.id
                const price = option.price ?? option.cost
                const imageSrc = option.image ? `http://localhost:3000${option.image}` : null
                const isConvertibleOnly = option.isconvertible === true || option.isConvertible === true

                return (
                    <button
                        key={option.id}
                        type='button'
                        className={
                            'car-builder__option-card' +
                            (isSelected ? ' car-builder__option-card--selected' : '')
                        }
                        onClick={() => onSelect(option)}
                    >
                        {imageSrc && (
                            <div className='car-builder__option-image'>
                                <img src={imageSrc} alt={option.name} />
                            </div>
                        )}
                        <div className='car-builder__option-body'>
                            <span className='car-builder__option-name'>{option.name}</span>
                            <span className='car-builder__option-price'>
                                {price ? `+ $${Number(price).toLocaleString()}` : 'Included'}
                            </span>
                            {isConvertibleOnly && (
                                <span className='car-builder__option-convertible-tag'>Convertible only</span>
                            )}
                        </div>
                    </button>
                )
            })}
        </div>
    )
}

const SummaryItem = ({ label, value }) => (
    <div className='car-builder__summary-item'>
        <span className='car-builder__summary-label'>{label}</span>
        <span className='car-builder__summary-value'>{value}</span>
    </div>
)

export default EditCar