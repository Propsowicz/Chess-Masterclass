import './App.css';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import Header from './components/Header'
import Login from './pages/Login';
import { UserContextProvider } from './context/UserContext';


import {
  Routes,
  Route,
  BrowserRouter,

} from 'react-router-dom'
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import EditProfileEmail from './pages/EditProfileEmail';
import EditProfileName from './pages/EditProfileName';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <UserContextProvider>
          <Header />
          
          <Routes>          
              <Route path='/' element={<HomePage />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/course/:slug' element={<CoursePage />}/>
              <Route path='/profile/:username' element={<EditProfile />}/>
              <Route path='/profile/:username/edit/email' element={<EditProfileEmail />}/>
              <Route path='/profile/:username/edit/name' element={<EditProfileName />}/>
          </Routes>      
        </UserContextProvider>  
    </BrowserRouter>  

    

    </div>
  );
}

export default App;
