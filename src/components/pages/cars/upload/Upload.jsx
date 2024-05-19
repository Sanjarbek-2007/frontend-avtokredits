import React, { useState } from 'react';
import './Upload.css';

const Upload = () => {
    const [formData, setFormData] = useState({
        postTitle: '',
        carContent: '',
        carImages: [],
        carBrand: '',
        carModel: '',
        carYear: '',
        carColor: '',
        carEngine: '',
        carGear: '',
        carFuelType: '',
        creditTarifs: '',
        creditMonthCount: 0,
        amount: 0,
        procents: 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const data = new FormData();
        data.append('postTitle', formData.postTitle);
        data.append('carContent', formData.carContent);
        formData.carImages.forEach((image, index) => {
            data.append('carImages', image);
        });
        data.append('carBrand', formData.carBrand);
        data.append('carModel', formData.carModel);
        data.append('carYear', formData.carYear);
        data.append('carColor', formData.carColor);
        data.append('carEngine', formData.carEngine);
        data.append('carGear', formData.carGear);
        data.append('carFuelType', formData.carFuelType);
        data.append('creditTarifs', formData.creditTarifs);
        data.append('creditMonthCount', formData.creditMonthCount);
        data.append('amount', formData.amount);
        data.append('procents', formData.procents);

        try {
            // const token = localStorage.getItem('accessToken'); // Retrieve the JWT token from localStorage
            // if (!token) {
            //     throw new Error('No JWT token found');
            // }

            const response = await fetch('http://localhost:8080/posts/add', {
                method: 'POST',
                // headers: {
                //     'Authorization': `Bearer ${token}` ,// Include this if authentication is required
                //     // 'Content-Type': 'multipart/form-data',
                // },
                body: data // Send FormData object directly
            });

            const result = await response.json();
            if (!response.ok) {
                alert(`Yuklashda xatolik yuz berdi: ${result.message}`);
                console.error('Server error response:', result);
            } else {
                alert('Mashina muvaffaqiyatli yuklandi!');
                console.log('Server response:', result);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Yuklashda xatolik yuz berdi.');
        }
    };


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'carImages') {
            const selectedFiles = Array.from(files);
            setFormData({
                ...formData,
                [name]: [...formData.carImages, ...selectedFiles],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = formData.carImages.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            carImages: updatedImages,
        });
    };

    return (
        <div className="container">
            <h1>Mashina Yuklash</h1>
            <form onSubmit={handleSubmit}>
                {renderInput('postTitle', 'Postning Sarlavhasi', 'text')}
                {renderTextarea('carContent', "Mashina Haqida Ma'lumot")}
                {renderFileInput('carImages', 'Mashina Rasmlari', true)}
                <div className="image-preview-container">
                    {formData.carImages.map((image, index) => (
                        <div key={index} className="image-preview">
                            <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                            <div className="remove-button" onClick={() => handleRemoveImage(index)} />
                        </div>
                    ))}
                </div>
                {renderInput('carBrand', 'Mashina Markasi', 'text')}
                {renderInput('carModel', 'Mashina Modeli', 'text')}
                {renderInput('carYear', 'Mashina Yili', 'text')}
                {renderInput('carColor', 'Mashina Rangi', 'text')}
                {renderInput('carEngine', 'Mashina Motori', 'text')}
                {renderSelect('carGear', 'Mashina Korobkasi', ['AT', 'GT', 'none'])}
                {renderSelect('carFuelType', "Yoqilg'i Turi", ['Benzin', 'Dizel', 'Elektr', 'Gaz'])}
                {renderInput('creditTarifs', 'Kredit Tarifi', 'text')}
                {renderInput('creditMonthCount', 'Kredit Muddati (oy)', 'number')}
                {renderInput('amount', 'Summasi (SUM)', 'number')}
                {renderInput('procents', 'Foizlar (%)', 'number')}
                <button onClick={handleSubmit}>Mashinani Yuklash</button>
            </form>
        </div>
    );

    function renderInput(name, label, type) {
        return (
            <div key={name}>
                <label htmlFor={name}>{label}</label>
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                />
            </div>
        );
    }

    function renderTextarea(name, label) {
        return (
            <div key={name}>
                <label htmlFor={name}>{label}</label>
                <textarea
                    id={name}
                    name={name}
                    rows="4"
                    value={formData[name]}
                    onChange={handleChange}
                    required
                />
            </div>
        );
    }

    function renderFileInput(name, label, multiple = false) {
        return (
            <div key={name}>
                <label htmlFor={name}>{label}</label>
                <input
                    type="file"
                    id={name}
                    name={name}
                    accept="image/*"
                    onChange={handleChange}
                    multiple={multiple}
                    required
                />
            </div>
        );
    }

    function renderSelect(name, label, options) {
        return (
            <div key={name}>
                <label htmlFor={name}>{label}</label>
                <select id={name} name={name} value={formData[name]} onChange={handleChange} required>
                    <option value="" disabled>Tanlang</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        );
    }
};

export default Upload;




