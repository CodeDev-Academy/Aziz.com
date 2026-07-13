import { useState } from 'react';

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  inquiryType: 'general',
  message: '',
  furnitureType: '',
  woodType: '',
  dimensions: ''
};

export function useContactForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      
      // If changing away from custom quote, clear the quote-specific fields
      if (name === 'inquiryType' && value !== 'quote') {
        updatedData.furnitureType = '';
        updatedData.woodType = '';
        updatedData.dimensions = '';
      }
      
      return updatedData;
    });
    
    // Clear error for this field on edit
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    // Also clear quote-related errors if we switched away from quote
    if (name === 'inquiryType' && value !== 'quote') {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.furnitureType;
        delete next.woodType;
        return next;
      });
    }
  };

  // Validate Form Data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    // Dynamic field validation for custom furniture quote
    if (formData.inquiryType === 'quote') {
      if (!formData.furnitureType) {
        newErrors.furnitureType = 'Please select a furniture type';
      }
      if (!formData.woodType) {
        newErrors.woodType = 'Please select a preferred wood type';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit Simulation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call with 1.5 seconds delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData(INITIAL_STATE);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form status (to go back to empty form from success screen)
  const handleReset = () => {
    setIsSuccess(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    handleReset
  };
}
