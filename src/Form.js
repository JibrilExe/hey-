import React, { useState } from 'react';
const logos = Array.from({ length: 14 }, (_, index) => require(`./heylogo${index + 1}.png`));

const Form = ({ onSubmit }) => {
    const keys = ['environment', 'position', 'stance']; // Form keys for prompt
    const [formValues, setFormValues] = useState({
        optional_prompt: '',
        environment: '',
        position: '',
        stance: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formValues);
        }
        try {
            const response = await fetch('http://localhost:5000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
                credentials: 'include'
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', response.status, errorText);
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [showGrid, setShowGrid] = useState(false);

    return (
        <div style={{ fontSize: '2em' }}>
            <h1>Image query</h1>
            <input
                type="text"
                id="titleInput"
                name="optional_prompt"
                placeholder="Optional prompt"
                value={formValues.title || ''}
                onChange={handleChange}
                style={{ fontSize: '1em', padding: '10px', width: '100%' }}
            />
            {keys.map((key, index) => (
                <div key={index}>
                    <label htmlFor={key}>{key}</label>
                    <input
                        type="text"
                        id={key}
                        name={key}
                        value={formValues[key]}
                        onChange={handleChange}
                        style={{ fontSize: '1em', padding: '10px', width: '100%' }}
                    />
                </div>
            ))}

            {formValues.title && (
                <div>
                    <h2>Form Values</h2>
                    <p>Title: {formValues.title}</p>
                    {keys.map((key, index) => (
                        <p key={index}>
                            {key}: {formValues[key]}
                        </p>
                    ))}
                </div>
            )}

            <div>
                <button onClick={() => setShowGrid(!showGrid)} style={{ fontSize: '1em', padding: '10px' }}>
                    {showGrid ? 'Hide Images' : 'Show Optional positions'}
                </button>
                {showGrid && (
                    <div className="image-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                        {logos.map((logo, index) => (
                            <img
                                key={index}
                                src={logo}
                                alt={`heylogo${index + 1}`}
                                onClick={() => setFormValues({
                                    ...formValues,
                                    image: formValues.image === `heylogo${index + 1}.png` ? '' : `heylogo${index + 1}.png`
                                })}
                                style={{
                                    cursor: 'pointer',
                                    margin: '5px',
                                    border: formValues.image === `heylogo${index + 1}.png` ? '2px solid black' : 'none'
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <button onClick={handleSubmit} style={{ fontSize: '1em', padding: '10px' }}>Submit</button>

            {formValues.title && (
                <div>
                    <h2>Submitted Form Values</h2>
                    <p>Title: {formValues.title}</p>
                    {keys.map((key, index) => (
                        <p key={index}>
                            {key}: {formValues[key]}
                        </p>
                    ))}
                    {formValues.image && <p>Image: {formValues.image}</p>}
                </div>
            )}
        </div>
    );
};

export default Form;