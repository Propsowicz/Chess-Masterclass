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
import EditProfile from './pages/profile_edit/EditProfile';
import EditProfileEmail from './pages/profile_edit/EditProfileEmail';
import EditProfileName from './pages/profile_edit/EditProfileName';
import EditProfilePass from './pages/profile_edit/EditProfilePass';
import ForgotPass from './pages/profile_edit/ForgotPass';
import PremiumPlans from './pages/PremiumPlans';


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
              <Route path='/profile/:username/edit/pass' element={<EditProfilePass />}/>
              <Route path='/forgot-pass' element={<ForgotPass />}/>
              <Route path='/premium-plans' element={<PremiumPlans />}/>

          </Routes>      
        </UserContextProvider>  
    </BrowserRouter>  

    

    </div>
  );
}

export default App;
