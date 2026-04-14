import React from 'react';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '80px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Docker App</h1>
      <p>Containerized with Docker Multi-Stage Build</p>
      <p>Served via Nginx on port 8080</p>
    </div>
  );
}

export default App;
