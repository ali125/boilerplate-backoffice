import React from 'react';
import { browserRoutes } from '@/constants/routes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from '@/components/base/PrivateRoute';
import MainLayout from '@/components/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import SignIn from '@/pages/Authentication/SignIn';
import SignUp from '@/pages/Authentication/SignUp';
import NotFound from '@/pages/NotFound';
import Posts from '@/pages/Posts';
import Forgot from '@/pages/Authentication/Forgot';
import Categories from '@/pages/Categories';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={browserRoutes.home} element={<PrivateRoute />}>
                <Route path={browserRoutes.home} element={<MainLayout />}>
                    <Route path={browserRoutes.dashboard} element={<Dashboard />} />
                    <Route path={browserRoutes.posts} element={<Posts />} />
                    <Route path={browserRoutes.categories} element={<Categories />} />
                </Route>
            </Route>
            {/* <Route path={browserRoutes.home} element={<MainLayout />}>
                <Route path={browserRoutes.dashboard} element={<Dashboard />} />
                <Route path={browserRoutes.posts} element={<Posts />} />
            </Route> */}
            <Route path={browserRoutes.signIn} element={<SignIn />} />
            <Route path={browserRoutes.signUp} element={<SignUp />} />
            <Route path={browserRoutes.forgotPassword} element={<Forgot />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Router