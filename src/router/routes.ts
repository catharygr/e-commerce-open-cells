import { RouteDefinition } from '@open-cells/core/types';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'home',
    component: 'home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/productos',
    name: 'productos',
    component: 'productos-page',
    action: async () => {
      await import('../pages/productos/productos-page.js');
    },
  },
  {
    path: '/ofertas',
    name: 'ofertas',
    component: 'ofertas-page',
    action: async () => {
      await import('../pages/ofertas/ofertas-page.js');
    },
  },
  {
    path: '/account',
    name: 'account',
    component: 'account-page',
    action: async () => {
      await import('../pages/account/account-page.js');
    },
  },
  {
    path: '/login',
    name: 'login',
    component: 'login-page',
    action: async () => {
      await import('../pages/login/login-page.js');
    },
  },
  {
    path: '/account/admin',
    name: 'admin',
    component: 'admin-page',
    action: async () => {
      await import('../pages/admin/admin-page.js');
    },
  },
];
