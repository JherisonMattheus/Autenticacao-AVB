import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Recovery from './pages/Recovery';
import PrivateRouter from './components/PrivateRouter';
import Profile from './pages/Profile';
import PublicRouter from './components/PublicRouter';

export const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path='/' element= {<Home />}/>

            <Route
                path='/login'
                element= {
                    <PublicRouter>
                        <Login />
                    </PublicRouter>
                }
            />
            <Route
                path='/login/recovery'
                element= {
                    <PublicRouter>
                        <Recovery />
                    </PublicRouter>
                }
            />
            <Route
                path='/register'
                element= {
                    <PublicRouter>
                        <Register />
                    </PublicRouter>
                }
            />
            <Route
                path='/profile'
                element= {
                    <PrivateRouter>
                        <Profile />
                    </PrivateRouter>
                }
            />
        </Routes>
    )
}