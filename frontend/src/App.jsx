import { Outlet } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    
    <div className='min-h-100dvh bg-lightLime overflow-hidden relative 3xl:container 2xl:mx-auto'>
      <ToastContainer />
      
      <Navbar />

      <Outlet />
      
    </div>
  )
}

export default App
