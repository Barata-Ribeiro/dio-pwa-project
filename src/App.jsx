import React from 'react';
import 'the-new-css-reset/css/reset.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';

const MemoHome = React.memo(Home);

function App() {
  return (
    <main>
      <section>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MemoHome />} />
          </Routes>
        </BrowserRouter>
      </section>
    </main>
  );
}

export default App;
