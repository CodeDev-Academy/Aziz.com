import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';

export function useAuthForm(initialState, formType = 'signin') {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Common validations
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Sign Up specific validations
    if (formType === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Full name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        let loggedUser;
        if (formType === 'signin') {
          loggedUser = await login(formData.email, formData.password);
        } else if (formType === 'signup') {
          loggedUser = await register(formData.name, formData.email, formData.password);
        }
        setIsSubmitting(false);
        // Clear all form fields on successful login/signup
        setFormData(initialState);
        // Redirect to appropriate dashboard based on role
        if (loggedUser && loggedUser.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      } catch (err) {
        setIsSubmitting(false);
        // On failure: preserve email/name but clear password fields only
        setFormData((prev) => ({
          ...prev,
          password: '',
          ...(formType === 'signup' ? { confirmPassword: '' } : {})
        }));
        // Map backend returned validation messages to general form errors
        setErrors({ general: err.message || 'Authentication failed. Please check your credentials and try again.' });
      }
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}
