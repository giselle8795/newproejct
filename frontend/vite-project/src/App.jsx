import { Outlet, Routes, Route , useLocation } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Footer from './layout/Footer'
import Navbar from './layout/Navbar'
import ProtectedRoutes from './components/ProtectedRoutes'
import { authUser } from './store/thunkFunctions'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import NotAuthRoutes from './components/NotAuthRoutes'

function Layout() {
  return (
    <div className='flex flex-col h-screen justify-between'>
      
      <ToastContainer
        position='bottom-right'
        theme='light'
        pauseOnHover
        autoClose={1500}
      />

      <Navbar />
      <main className='mb-auto w-10/12 max-w-4xl mx-auto'>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(authUser());
  }, [pathname, dispatch]);

  useEffect(() => {
    if(isAuth) {
      dispatch(authUser());
    }      
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route index element={<LandingPage />} />


        {/* 로그인한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth}/>}>
          <Route path="/protected" element={<ProtectedRoutes />} />
        </Route>

        {/* 로그인한 사람은 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes isAuth={isAuth}/>}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App
