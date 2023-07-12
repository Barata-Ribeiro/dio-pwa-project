import React from 'react';
import 'the-new-css-reset/css/reset.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Post from './routes/Post';

const MemoHome = React.memo(Home);
const MemoPost = React.memo(Post);

function App() {
  return (
    <main>
      <section>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MemoHome />} />
            <Route path="/:subject/:id" element={<MemoPost />} />
          </Routes>
        </BrowserRouter>
      </section>
    </main>
  );
}

export default App;
