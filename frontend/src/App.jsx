import { Outlet } from 'react-router-dom'
import Navigation from './components/Navigation'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    
    <div className='min-h-screen overflow-hidden relative 3xl:container 2xl:mx-auto'>
      <ToastContainer />
      
      <Navbar />

      <Outlet />
      
      {/* <Navigation/> */}
    </div>
  )
}

export default App
