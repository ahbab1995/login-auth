
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Signup from './Components/Signup';


function App() {
  return (
    <div className="App">
    <h1 className='text-center' >Home page</h1>
    <Header></Header>
    <Routes>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
    </Routes>
    </div>
  );
}

export default App;
