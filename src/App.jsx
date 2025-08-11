import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Layout from './pages/Layout'
import { Provider } from 'react-redux'
import appStore from './redux/appStore'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Connections from './pages/Connections'

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Feed />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/connections' element={<Connections />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App