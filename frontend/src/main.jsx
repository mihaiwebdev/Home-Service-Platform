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
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import PrivateRoute from './components/PrivateRoute'
import ProfilePage from './pages/ProfilePage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import SchedulePage from './pages/SchedulePage.jsx'
import WorkersResult from './pages/WorkersResult'
import './index.css'
import ChangePw from './components/ChangePw'

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
        <Route path='/services' element={<ServicesPage/>}/>
        <Route path='/schedule' element={<SchedulePage/>}/>
        <Route path='/available-workers' element={<WorkersResult/>}/>

        {/* Worker Private Routes */}

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
