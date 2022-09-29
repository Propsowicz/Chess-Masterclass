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
              <Route path='/course/:id' element={<CoursePage />}/>

          </Routes>      
        </UserContextProvider>  
    </BrowserRouter>

    </div>
  );
}

export default App;
