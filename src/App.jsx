import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApiConection } from './store/ApiConection'
import { Search } from './pages/Search'
import { Discover } from './pages/Discover'
import { PlayList } from './pages/PlayList'
import { Player } from './components/Player'
import { LeftSide } from './components/LeftSide'
import {RightSide} from './components/RightSide'
import { useGlobalVariables } from './store/GlobalVariables'
import { UrlsManager } from './store/UrlsManager'
import { Login } from './pages/Login'
import { UserVariables } from './store/UserVariables'
import { SignUp } from './pages/signup'





const PrincipalPage = () => {
  const { infoButton, playlistButton } = useGlobalVariables()
  
  return (
    <div className='w-screen h-screen flex flex-col p-2 gap-2 '>
      <div className='flex flex-grow gap-2 max-h-[90%]'>
        <div>
          <LeftSide />
        </div>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/search/" element={<Search />} />
          <Route path="/playlist/:albumIdParam" element={<PlayList />} />
        </Routes>

        <div className='ml-auto'>
          <RightSide />
        </div>
      </div>

      <div className='mt-auto max-h-[10%]'>
        <Player />
      </div>
    </div>
  )
}


function App() {
    
  return (
    <Router>
      <UrlsManager />
      <ApiConection />
      <UserVariables />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up/:step" element={<SignUp />} />
        <Route path="/*" element={<PrincipalPage />} />
      </Routes>

    </Router>
  )
}

export default App
