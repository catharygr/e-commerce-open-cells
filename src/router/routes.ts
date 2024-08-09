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
    path: '/productos/:productId',
    name: 'producto',
    component: 'single-product-page',
    action: async () => {
      await import('../pages/single-product/single-product-page.js');
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
    path: '/login',
    name: 'login',
    component: 'login-page',
    action: async () => {
      await import('../pages/login/login-page.js');
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
    path: '/account/admin',
    name: 'admin',
    component: 'admin-page',
    action: async () => {
      await import('../pages/admin/admin-page.js');
    },
  },
  {
    path: '/account/edit/:productId',
    name: 'edit',
    component: 'edit-page',
    action: async () => {
      await import('../pages/edit/edit-page.js');
    },
  },
  {
    path: '/account/add',
    name: 'add',
    component: 'add-page',
    action: async () => {
      await import('../pages/add/add-page.js');
    },
  },
  {
    path: '/acount/favorites',
    name: 'favorites',
    component: 'favorites-page',
    action: async () => {
      await import('../pages/favorites/favorites-page.js');
    },
  },
  {
    path: '/cart',
    name: 'cart',
    component: 'shopping-cart-page',
    action: async () => {
      await import('../pages/shopping-cart/shopping-cart-page.js');
    },
  },
  {
    path: '/not-found',
    name: 'not-found',
    notFound: true,
    component: 'not-found-page',
    action: async () => {
      await import('../pages/not-found/not-found.js');
    },
  },
];
