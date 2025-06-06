import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')).render(
    <>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <App/>
    </>
)
