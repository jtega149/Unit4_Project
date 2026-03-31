import React, { useEffect, useMemo, useState } from 'react'
import '../App.css'
import '../css/CarBuilder.css'
import CarsAPI from '../services/CarsAPI.jsx'
import CarParts from '../services/CarParts.jsx'
import convertibleImg from '../assets/convertible.png'
import notConvertibleImg from '../assets/not_convertible.png'

const BASE_PRICE = 65000

const CreateCar = () => {
    const [activeSection, setActiveSection] = useState('Exterior')
    const [convertible, setConvertible] = useState(false)

    const [exteriors, setExteriors] = useState([])
    const [roofs, setRoofs] = useState([])
    const [interiors, setInteriors] = useState([])
    const [wheels, setWheels] = useState([])

    const [selectedExterior, setSelectedExterior] = useState(null)
    const [selectedRoof, setSelectedRoof] = useState(null)
    const [selectedInterior, setSelectedInterior] = useState(null)
    const [selectedWheels, setSelectedWheels] = useState(null)

    const [carName, setCarName] = useState('')
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')
    const [info, setInfo] = useState('')
    const [popupMessage, setPopupMessage] = useState('')

    useEffect(() => {
        const loadParts = async () => {
            try {
                const [
                    exteriorData,
                    roofData,
                    interiorData,
                    wheelsData
                ] = await Promise.all([
                    CarParts.getExteriorColors(),
                    CarParts.getRoofs(),
                    CarParts.getInteriors(),
                    CarParts.getWheels()
                ])

                setExteriors(exteriorData || [])
                setRoofs(roofData || [])
                setInteriors(interiorData || [])
                setWheels(wheelsData || [])
            } catch (err) {
                setError('Could not load customization options. Please refresh.')
            }
        }

        loadParts()
    }, [])

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

        setError('')
        return true
    }

    const handleSelectExterior = (option) => {
        setSelectedExterior(option)
        setError('')
        setInfo(`Exterior set to ${option.name}.`)
    }

    const handleSelectRoof = (option) => {
        const roofConvertibleOnly = option.isconvertible === true || option.isConvertible === true

        if (convertible && !roofConvertibleOnly) {
            setPopupMessage('This roof is not available for convertible builds. Please choose a convertible-only roof option.')
            setError('')
            setInfo('')
            return
        }

        if (!convertible && roofConvertibleOnly) {
            setPopupMessage('This roof is convertible-only. Turn on Convertible or choose a non-convertible roof option.')
            setError('')
            setInfo('')
            return
        }

        setSelectedRoof(option)
        setError('')
        setInfo(`Roof set to ${option.name}.`)
    }

    const handleSelectInterior = (option) => {
        setSelectedInterior(option)
        setError('')
        setInfo(`Interior set to ${option.name}.`)
    }

    const handleSelectWheels = (option) => {
        setSelectedWheels(option)
        setError('')
        setInfo(`Wheels set to ${option.name}.`)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setInfo('')

        if (!validateSelections()) {
            return
        }

        setBusy(true)
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

            await CarsAPI.createCar(payload)
            setInfo('Your custom car was saved to the garage.')

            setCarName('')
            setSelectedExterior(null)
            setSelectedRoof(null)
            setSelectedInterior(null)
            setSelectedWheels(null)
            setConvertible(false)
        } catch (err) {
            setError('We could not save this build right now. Please try again.')
        } finally {
            setBusy(false)
        }
    }

    const renderOptions = () => {
        const commonProps = {
            label: activeSection,
        }

        if (activeSection === 'Exterior') {
            return (
                <OptionsGrid
                    {...commonProps}
                    options={exteriors}
                    selected={selectedExterior}
                    onSelect={handleSelectExterior}
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
                    onSelect={handleSelectWheels}
                />
            )
        }
        if (activeSection === 'Interior') {
            return (
                <OptionsGrid
                    {...commonProps}
                    options={interiors}
                    selected={selectedInterior}
                    onSelect={handleSelectInterior}
                />
            )
        }

        return null
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
                        <span>current build</span>
                    </div>

                    <div className='car-builder__summary'>
                        <SummaryItem
                            label='Exterior'
                            value={selectedExterior?.name || 'Not selected'}
                        />
                        <SummaryItem label='Roof' value={selectedRoof?.name || 'Not selected'} />
                        <SummaryItem
                            label='Wheels'
                            value={selectedWheels?.name || 'Not selected'}
                        />
                        <SummaryItem
                            label='Interior'
                            value={selectedInterior?.name || 'Not selected'}
                        />
                    </div>

                    <div className='car-builder__image-wrapper'>
                        <img src={currentImage} alt={convertible ? 'Convertible build' : 'Fixed roof build'} />
                    </div>
                </div>

                <div className='car-builder__preview-card'>
                    <h3>Build summary</h3>
                    <p className='car-builder__subtitle'>
                        Give your build a name and save it to your custom garage.
                    </p>

                    <label>
                        <span className='car-builder__summary-label'>Build name</span>
                        <input
                            className='car-builder__name-input'
                            type='text'
                            placeholder='e.g. Track Day Spec'
                            value={carName}
                            onChange={(e) => setCarName(e.target.value)}
                        />
                    </label>

                    <div className='car-builder__submit-row'>
                        <div>
                            {error && <p className='car-builder__error'>{error}</p>}
                            {!error && info && <p className='car-builder__info'>{info}</p>}
                        </div>
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            disabled={busy}
                        >
                            {busy ? 'Saving…' : 'Save build'}
                        </button>
                    </div>
                </div>
            </section>

            <section className='car-builder__panel'>
                <header>
                    <h2>Choose your parts</h2>
                    <p className='car-builder__subtitle'>
                        Toggle between Exterior, Roof, Wheels, and Interior to see available options.
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
                        onChange={(e) => {
                            setConvertible(e.target.checked)
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

export default CreateCar