import { Routes ,Route } from 'react-router-dom';
import './App.css'
import PlayGame from './Pages/PlayGame';
import Home from './Pages/Home';
import StartGameContainer from './Pages/StartPage/StartGameContainer';
import SelectPlayerContainer from './Pages/SelectPlayer/SelectPlayerContainer';

function App() {
  return (
    <Routes>
      <Route path='/start' element={<StartGameContainer />} />
      <Route path='/play' element={<PlayGame />} />
      <Route path='/multiplayer' element={<Home/>} />
      <Route path='/' element={<SelectPlayerContainer/>} />
  </Routes>
  );
}

export default App
