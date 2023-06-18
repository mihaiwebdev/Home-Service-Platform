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
import PrivateRoute from './components/shared/PrivateRoute'
import PrivateClientRoute from './components/client/PrivateClientRoute'
import ProfilePage from './pages/client/ProfilePage.jsx'
import ServicesPage from './pages/client/ServicesPage.jsx'
import SchedulePage from './pages/client/SchedulePage.jsx'
import WorkersResult from './pages/client/WorkersResult'
import WorkerInfo from './pages/client/WorkerInfo'
import PrivateWorkerRoute from './components/worker/PrivateWorkerRoute'
import WorkerProfilePage from './pages/worker/WorkerProfilePage'
import WorkerEditPage from './pages/worker/WorkerEditPage'
import WorkerOrdersPage from './pages/worker/WorkerOrdersPage'
import WorkerHomePage from './pages/worker/WorkerHomePage'
import ProgramPage from './pages/worker/ProgramPage'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index={true} path='/' element={<HomePage />}/>

        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>

        {/* Private users Routes */}
        <Route path='' element={<PrivateRoute />}>
          
        </Route>
        
        {/* Client Private Routes */}
        <Route path='' element={<PrivateClientRoute />} >
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/services' element={<ServicesPage/>}/>
          <Route path='/schedule' element={<SchedulePage/>}/>
          <Route path='/workers' element={<WorkersResult/>}/>
          <Route path='/workers/:id' element={<WorkerInfo/>}/>
        </Route>

        {/* Worker Private Routes */}
        <Route path='/worker' element={<PrivateWorkerRoute />}>
          <Route path='' element={<WorkerHomePage />}/>
          <Route path='orders' element={<WorkerOrdersPage />}/>
          <Route path='profile' element={<WorkerProfilePage />}/>
          <Route path='profile/edit' element={<WorkerEditPage />}/>
          <Route path='program' element={<ProgramPage />}/>
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
