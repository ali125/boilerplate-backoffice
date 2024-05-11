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
import Permissions from '@/pages/Permissons';
import Roles from '@/pages/Roles';
import Users from '@/pages/Users';
import Tags from '@/pages/Tags';
import AccessRoute from '@/components/base/AccessRoute';
import { PermissionModules } from '@/@types/permission.type';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={browserRoutes.home} element={<PrivateRoute />}>
          <Route path={browserRoutes.home} element={<MainLayout />}>
            <Route path={browserRoutes.dashboard} element={<Dashboard />} />
            <Route path={browserRoutes.posts} element={<AccessRoute Component={Posts} module={PermissionModules.Post} />}  />
            <Route path={browserRoutes.categories} element={<AccessRoute Component={Categories} module={PermissionModules.Category} />}  />
            <Route path={browserRoutes.tags} element={<AccessRoute Component={Tags} module={PermissionModules.Tag} />}  />
            <Route path={browserRoutes.users} element={<AccessRoute Component={Users} module={PermissionModules.User} />}  />
            <Route path={browserRoutes.roles} element={<AccessRoute Component={Roles} module={PermissionModules.Role} />}  />
            <Route path={browserRoutes.permissions} element={<AccessRoute Component={Permissions} module={PermissionModules.Permission} />}  />
          </Route>
        </Route>
        <Route path={browserRoutes.signIn} element={<SignIn />} />
        <Route path={browserRoutes.signUp} element={<SignUp />} />
        <Route path={browserRoutes.forgotPassword} element={<Forgot />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router