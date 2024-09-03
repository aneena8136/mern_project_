// import { useState } from 'react';
// import axios from 'axios';

// export default function AadhaarVerification() {
//   const [aadhaar, setAadhaar] = useState('');
//   const [result, setResult] = useState('');
//   const [error, setError] = useState('');

//   const handleVerifyAadhaar = async (e) => {
//     e.preventDefault();
//     setError('');
//     setResult('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/verify-aadhaar', { aadhaar });
//       setResult(JSON.stringify(response.data, null, 2));
//     } catch (error) {
//       console.error('Aadhaar verification error:', error.response || error);
//       setError(error.response?.data?.message || 'Failed to verify Aadhaar');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleVerifyAadhaar}>
//         <h1>Aadhaar Verification</h1>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <label htmlFor="aadhaar">Aadhaar Number:</label>
//         <input
//           type="text"
//           id="aadhaar"
//           value={aadhaar}
//           onChange={(e) => setAadhaar(e.target.value)}
//           required
//         />
//         <button type="submit">Verify Aadhaar</button>
//       </form>
//       {result && (
//         <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', marginTop: '10px' }}>
//           {result}
//         </pre>
//       )}
//     </div>
//   );
// }
import { useState } from 'react';
import axios from 'axios';
import styles from './AadhaarVerification.module.css'; // Import the CSS module

export default function AadhaarVerification() {
  const [aadhaar, setAadhaar] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleVerifyAadhaar = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');

    try {
      const response = await axios.post('http://localhost:5000/api/verify-aadhaar', { aadhaar });
      
      alert('Aadhaar verified successfully!');
      
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Aadhaar verification error:', error.response || error);
      setError(error.response?.data?.message || 'Failed to verify Aadhaar');
    }
  };

  return (
    <div className={styles.verificationContainer}>
      <form onSubmit={handleVerifyAadhaar} className={styles.verificationForm}>
        <h1>Aadhaar Verification</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <div className={styles.inputGroup}>
          <label htmlFor="aadhaar">Aadhaar Number:</label>
          <input
            type="text"
            id="aadhaar"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.btn}>Verify Aadhaar</button>
        </div>

        {result && (
          <div className={styles.result}>
            <h2>Verification Result:</h2>
            <pre>{result}</pre>
          </div>
        )}
      </form>
    </div>
  );
}

