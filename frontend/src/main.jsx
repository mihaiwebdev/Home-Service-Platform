import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import App from './App.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import PrivateRoute from './components/PrivateRoute'
import PrivateClientRoute from './components/PrivateClientRoute'
import PrivateWorkerRoute from './components/PrivateWorkerRoute'
import ProfilePage from './pages/ProfilePage.jsx'
import ChangePw from './components/ChangePw'
import ServicesPage from './pages/ServicesPage.jsx'
import SchedulePage from './pages/SchedulePage.jsx'
import WorkersResult from './pages/WorkersResult'
import WorkerInfo from './pages/WorkerInfo'
import WorkerProfilePage from './pages/WorkerProfilePage'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index={true} path='/' element={<HomePage />}/>

        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>

        {/* Private Routes */}
        <Route path='' element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfilePage/>} />
          
          <Route path='/profile/changepw' element={<ChangePw />} />
          
        </Route>
        
        {/* Client Private Routes */}
        <Route path='' element={<PrivateClientRoute />} >
          <Route path='/services' element={<ServicesPage/>}/>
          <Route path='/schedule' element={<SchedulePage/>}/>
          <Route path='/workers' element={<WorkersResult/>}/>
          <Route path='/workers/:id' element={<WorkerInfo/>}/>
        </Route>

        {/* Worker Private Routes */}
        <Route path='' element={<PrivateWorkerRoute />}>
          <Route path='worker-profile' element={<WorkerProfilePage />}/>
        </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
