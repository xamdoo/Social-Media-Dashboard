import './App.css';
import { Route, Routes } from "react-router-dom";
import { UseStateContext } from './Context/useStateContext';
import Sidebar from './Components/Sidebar';
import Auth from './Pages/Auth';
import Navbar from './Components/Navbar';
import Schedule from './Pages/Schedule';
import Compose from './Pages/Compose';
import Platforms from './Pages/Platforms';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import Edit from './Pages/Edit';
import ProtectedRoute from './Utils/ProtectedRoute';
import LoadingSpinner from './Components/Skeleton/LoadingSpinner';
import Settings from './Components/Settings';
import Analytics from './Components/Analytics';


function App() {
  const { isMenuCollapsed, isAuthenticated, loading } = UseStateContext()

  if(loading){
    return <LoadingSpinner/>
  }
  
  return (
    <div>
      <SkeletonTheme baseColor="#515151" highlightColor="#020202">
        {!isAuthenticated ? (
          <div>
            <Routes>
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </div>
          
        ) : (
          <div className="flex relative bg-neutral-200">
            {isMenuCollapsed ? (
              <div className="w-64 fixed sidebar bg-white">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0">
                <Sidebar />
              </div>
            )}
            <div
              className={
                isMenuCollapsed
                  ? 'min-h-screen md:ml-64 w-full'
                  : 'w-full min-h-screen flex-2'
              }
            >
              <div className="fixed md:static navbar w-full">
                <Navbar />
              </div>
              <div>
                <Routes>
                  <Route path="/" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
                  <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
                  <Route path="/compose" element={<ProtectedRoute><Compose /></ProtectedRoute>} />
                  <Route path="/platforms" element={<Platforms />} />
                  <Route path="/edit/:postId" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
                  <Route path="/analytics" element={<Analytics/>}/>
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </div>
          </div>
        )}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </SkeletonTheme>
    </div>
  )
}

export default App;
