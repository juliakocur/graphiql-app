import { useState } from 'react';

const ErrorButton = () => {
  const [error, setError] = useState(false);
  if (error) {
    throw new Error('I crashed!');
  }
  return (
    <button className="crash__button" onClick={() => setError(true)}>
      Crash
    </button>
  );
};

export default ErrorButton;
