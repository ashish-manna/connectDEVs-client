import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Layout from './pages/Layout'
import { Provider } from 'react-redux'
import appStore from './redux/appStore'
import Feed from './pages/Feed'

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Feed />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App