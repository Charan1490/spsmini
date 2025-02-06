import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // EmailJS service details
    const serviceID = 'your_service_id';  // Replace with your Service ID
    const templateID = 'your_template_id';  // Replace with your Template ID
    const userID = 'your_user_id';  // Replace with your User ID
    
    // Send email using EmailJS
    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert('Your message has been sent!');
        setFormData({ name: '', email: '', message: '' });  // Clear the form after submission
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('There was an error sending your message. Please try again later.');
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Contact Us</h2>
        <p style={styles.text}>
          Have questions or need assistance? Feel free to reach out to us. We’re here to help!
        </p>
        <div style={styles.contactDetails}>
          <div style={styles.contactItem}>
            <h4 style={styles.subheading}>Support</h4>
            <p>Email: <a href="mailto:bhargavreddypatil1@gmail.com" style={styles.link}>bhargavreddypatil1@gmail.com</a></p>
            <p>Phone: +91 6363787219</p>
          </div>
          <div style={styles.contactItem}>
            <h4 style={styles.subheading}>General Inquiries</h4>
            <p>Email: <a href="mailto:charannaik123@gmail.com" style={styles.link}>charannaik123@gmail.com</a></p>
            <p>Phone: +91 8310330379</p>
          </div>
          <div style={styles.contactItem}>
            <h4 style={styles.subheading}>Feedback</h4>
            <p>Email: <a href="mailto:feedback@smartparking.com" style={styles.link}>feedback@smartparking.com</a></p>
          </div>
        </div>
        <div style={styles.footer}>
          <p>We usually respond within 24-48 hours. Thank you for choosing SmartParkX!</p>
        </div>
      </div>

      <div style={styles.formContainer}>
        <h3 style={styles.formHeading}>Send Us a Query</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            style={styles.input}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>Send</button>
        </form>
      </div>
    </div>
  );
};

// Updated Styles with Responsive Design
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',  // Align elements horizontally
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: '100vh', // Full viewport height
    backgroundColor: '#121212',
    padding: '20px',
    boxSizing: 'border-box',
    flexWrap: 'wrap',  // Allow wrapping on smaller screens
  },
  card: {
    backgroundColor: '#1f1f1f',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    width: '45%',
    color: '#fff',
    textAlign: 'center',
    boxSizing: 'border-box',
    marginBottom: '20px',
    flex: '1 1 45%',  // Flexible width
  },
  formContainer: {
    backgroundColor: '#1f1f1f',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    width: '45%',
    color: '#fff',
    boxSizing: 'border-box',
    marginBottom: '20px',
    flex: '1 1 45%',  // Flexible width
  },
  formHeading: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#4caf50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #333',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: '16px',
    width: '100%',
  },
  textarea: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #333',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: '16px',
    width: '100%',
    height: '120px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '15px',
    color: '#4caf50',
  },
  text: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#aaa',
  },
  contactDetails: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  contactItem: {
    marginBottom: '15px',
  },
  subheading: {
    fontSize: '20px',
    color: '#fff',
    marginBottom: '8px',
  },
  link: {
    color: '#4caf50',
    textDecoration: 'none',
  },
  footer: {
    fontSize: '14px',
    color: '#aaa',
    marginTop: '20px',
    borderTop: '1px solid #333',
    paddingTop: '10px',
  },

  // Media Queries for Smaller Screens (Responsive Design)
  '@media (max-width: 768px)': {
    container: {
      flexDirection: 'column',  // Stack elements vertically on smaller screens
      padding: '10px',
    },
    card: {
      width: '100%',  // Full width on smaller screens
      marginBottom: '15px',
    },
    formContainer: {
      width: '100%',  // Full width on smaller screens
    },
  },
};

export default ContactUs;
