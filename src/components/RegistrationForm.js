import React, { useState } from 'react';
import './RegistrationForm.css';
const RegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [branch, setBranch] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('branch', branch);
      formData.append('pdfFile', pdfFile);
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, phoneNumber, branch }),
      });
  
      if (response.ok) {
        console.log('Registration successful');
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setBranch('');
        setPdfFile(null);
      } else {
        const responseData = await response.json();
  
        if (response.status === 409) {
          setError('User with the same email already exists');
          
        } else {
          setError('Registration failed:', responseData.error || 'Unknown error');
        }
      }
    } catch (error) {
      setError('Error during registration:', error);
    }
  };
  
  
    return (
      <form onSubmit={handleSubmit}>
              {error && <div className="error-alert">{error}</div>}
        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
  
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
  
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
  
        <label>
          Branch:
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          />
        </label>
        <label>
        ID Card (PDF):
        <input
          type="file"
          accept=".pdf"
          onChange={setPdfFile , handleFileChange}
          required
        />
      </label>
  
        <button type="submit">Register</button>
    
      
    
      </form>
    );
  };

  export default RegistrationForm;