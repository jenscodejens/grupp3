import React from 'react';

function Swagger() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">API Documentation</h1>
      <iframe
        src="https://grupp3-rbnuy.reky.se/swagger"
        title="API Docs"
        style={{ width: '100%', height: '80vh', border: 'none' }}
      />
    </div>
  );
}

export default Swagger;