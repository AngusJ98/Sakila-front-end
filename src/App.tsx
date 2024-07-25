import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import ErrorPage from './components/ErrorPage';
import HomePage from './components/HomePage';
import FilmContainer from './components/FilmContainer'
import NavBar from './components/NavBar';
import FilmDetail from './components/FilmDetail';
import ActorContainer from './components/ActorContainer';
import ActorDetail from './components/ActorDetail';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="basePage">
    
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={HomePage()} />
          <Route path="/films" element={<FilmContainer/>} />
          <Route path="/films/:filmId" element={<FilmDetail />} />
          <Route path="/actors" element={<ActorContainer />} />
          <Route path="/actors/:actorId" element={<ActorDetail />} />
          <Route path="*" element={ErrorPage()} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
