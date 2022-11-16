import Dashboard from '../pages/Dashboard';
import Signup from '../pages/Signup';
import { BrowserRouter, Navigate, Route, Routes as Router } from "react-router-dom";
import Layout from '../components/Layout';
import Users from '../pages/Users';
import NotFound from '../pages/NotFound';
import Trees from '../pages/Trees';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import ProtectedRoutes from './ProtectedRoutes';


function Routes() {

  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route element={<ProtectedRoutes roles={[1]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoutes roles={[1]} />}>
            <Route path="/users" element={<Users />} />
          </Route>

          <Route element={<ProtectedRoutes roles={[1, 0]} />}>
            <Route path="/trees/:userId" element={<Trees />} />
          </Route>

          <Route element={<ProtectedRoutes roles={[1, 0]} />}>
            <Route path="/settings/:userId" element={<Settings />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Router>
    </BrowserRouter>
  );
}

export default Routes;
