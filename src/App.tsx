import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from './pages/error'
import { Home } from './pages/home'
import { HomeScreen } from './pages/homescreen'
import { Admin } from './pages/admin'
import { Login } from './pages/login'
import { Networks } from './pages/networks'

import { Private } from './routes/Private'

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound/>
  },
  {
    path: '/',
    element: <HomeScreen />
  },
  {
    path: '/home',
    element: <Private> <Home /> </Private>
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <Private> <Admin /> </Private>,
  },
  {
    path: '/admin/social',
    element: <Private> <Networks /> </Private>,
  },

])

export { router };