import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    contact_number: '',
    email: '',
    day: '',
    month: '',
    year: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Form validation logic
      if (!validateForm()) return;

      const response = await axios.post('https://fullstack-test-navy.vercel.app/api/users/create', formData);
      setSubmitStatus(response.data.title);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: '',
      contact_number: '',
      email: '',
      day: '',
      month: '',
      year: '',
      password: '',
      confirm_password: ''
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validation rules
    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name is required';
      isValid = false;
    }

    // Validation rules for contact_number
    if (!formData.contact_number.trim()) {
    errors.contact_number = 'Contact number is required';
    isValid = false;
    } else if (!/^\d{10}$/.test(formData.contact_number)) {
    errors.contact_number = 'Please enter a valid Canadian phone number';
    isValid = false;
  }

  // Validation rules for email
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  // Validation rules for day
  if (!formData.day.trim()) {
    errors.day = 'Day is required';
    isValid = false;
  } else if (!/^\d{1,2}$/.test(formData.day) || parseInt(formData.day) < 1 || parseInt(formData.day) > 31) {
    errors.day = 'Please enter a valid day between 1 and 31';
    isValid = false;
  }

  // Validation rules for month
    if (!formData.month) {
    errors.month = 'Please select a month';
    isValid = false;
  }
  // Validation rules for year
    if (!formData.year) {
    errors.year = 'Please enter a year';
    isValid = false;
  } else if (formData.year > new Date().getFullYear()) {
    errors.year = 'Please enter a past year';
    isValid = false;
  }

  // Validation rules for password
    if (!formData.password) {
    errors.password = 'Please enter a password';
    isValid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
    errors.password = 'Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long';
    isValid = false;
    }

    // Validation rules for confirm_password
    if (!formData.confirm_password) {
    errors.confirm_password = 'Please confirm your password';
    isValid = false;
    } else if (formData.confirm_password !== formData.password) {
    errors.confirm_password = 'Passwords do not match';
    isValid = false;
    }
    // Add more validation rules for other fields

    setErrors(errors);
    return isValid;
  };

  return (
    <section class="container">
      <header>Create User Account</header>
    <form onSubmit={handleSubmit} class="form">
      {/* Full Name field with validation */}
      <div class="fields-section">
      <div class="input-box">
        <label htmlFor="full_name">Full Name</label>
        <input type="text" id="full_name" name="full_name" placeholder='Full Name *' value={formData.full_name} onChange={handleChange} className={`form-control ${errors.full_name ? 'is-invalid' : ''}`} />
        {errors.full_name && <span className="invalid-feedback">{errors.full_name}</span>}
      </div>
      <div class="input-box">
        <label htmlFor="contact_number">Contact Number</label>
        <input type="text" id="contact_number" name="contact_number" placeholder='Contact Number *' value={formData.contact_number} onChange={handleChange} className={`form-control ${errors.contact_number ? 'is-invalid' : ''}`} />
        {errors.contact_number && <span className="invalid-feedback">{errors.contact_number}</span>}
     </div>
     <div class="input-box">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" placeholder='Email *' value={formData.email} onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
        {errors.email && <span className="invalid-feedback">{errors.email}</span>}
    </div>
    <br/>
    <label htmlFor="day">Birthday </label>
    <div class="column">
    <div class="input-box">
        <select id="day" name="day" value={formData.day} onChange={handleChange} className={`form-control ${errors.day ? 'is-invalid' : ''}`}>
        <option value="">Select Day</option>
        {[...Array(31).keys()].map((day) => (
        <option key={day + 1} value={day + 1}>{day + 1}</option>
        ))}
    </select>
    {errors.day && <span className="invalid-feedback">{errors.day}</span>}
    </div>
    <div class="input-box">
        <select id="month" name="month" class="form-select" aria-label="Default select example" value={formData.month} onChange={handleChange} className={`form-control ${errors.month ? 'is-invalid' : ''}`}>
        <option value="">Select Month</option>
        <option value="Jan">Jan</option>
        <option value="Feb">Feb</option>
        <option value="Mar">Mar</option>
        <option value="Apr">Apr</option>
        <option value="May">May</option>
        <option value="Jun">Jun</option>
        <option value="Jul">Jul</option>
        <option value="Aug">Aug</option>
        <option value="Sep">Sep</option>
        <option value="Oct">Oct</option>
        <option value="Nov">Nov</option>
        <option value="Dec">Dec</option>
        </select>
        {errors.month && <span className="invalid-feedback">{errors.month}</span>}
    </div>
    <div class="input-box">
        <select id="year" name="year" value={formData.year} onChange={handleChange} className={`form-control ${errors.year ? 'is-invalid' : ''}`}>
        <option value="">Select Year</option>
        {[...Array(100).keys()].map((index) => {
        const year = new Date().getFullYear() - index;
        return <option key={year} value={year}>{year}</option>;
        })}
    </select>
        {errors.year && <span className="invalid-feedback">{errors.year}</span>}
    </div>
    </div>

    <div class="input-box">
    <label htmlFor="password">Password</label>
    <input type="password" id="password" name="password" placeholder='Password *' value={formData.password} onChange={handleChange} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
    {errors.password && <span className="invalid-feedback">{errors.password}</span>}
    </div>
    <div class="input-box">
        <label htmlFor="confirm_password">Confirm Password</label>
        <input type="password" id="confirm_password" name="confirm_password" placeholder='Confirm Password *' value={formData.confirm_password} onChange={handleChange} className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`} />
        {errors.confirm_password && <span className="invalid-feedback">{errors.confirm_password}</span>}
    </div>
    </div>

      {/* Other form fields with validation */}

      {/* Submit button */}
      <div class="buttons">
      <button type="button" class="btn btn-secondary cancel-button" onClick={handleCancel}>Cancel</button>
      <button type="submit" class="btn btn-primary submit-button">Submit</button>
      </div>
      {/* Error/success messages */}
      {submitStatus === 'Success' && <div className="success-message"><i class="bi bi-check-circle"></i>User account successfully created.</div>}
      {submitStatus === 'Error' && <div className="error-message"><i class="bi bi-x-circle"></i>There was an error creating the account</div>}
    </form>
    </section>
  );
};

export default RegistrationForm;
