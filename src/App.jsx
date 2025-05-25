import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import PlayGame from './pages/PlayGame'
import TriviaPage from './pages/TriviaPage'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/play" element={<PlayGame />} />
      <Route path="/trivia" element={<TriviaPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App