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
import WorkerEditPage from './pages/worker/WorkerEditPage'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index={true} path='/' element={<HomePage />}/>

        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>

        {/* Private users Routes */}
        <Route path='' element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfilePage/>} />
          
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
          {/* <Route path='/worker/edit' element={<WorkerEditPage />}/> */}
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
