import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'

import { Route as rootRoute } from './routes/__root'
import { Route as TermImport } from './routes/term'
import { Route as IndexImport } from './routes'
import { Route as ProductIndexImport } from './routes/product.index'
import { Route as ManageIndexImport } from './routes/manage.index'
import { Route as UserOrderImport } from './routes/user.order'
import { Route as ProductProductIdImport } from './routes/product.$productId'
import { Route as ManageProductSchedulingdeskImport } from './routes/manage.product.scheduling_desk'
import { Route as ManageProductViewdeskIndexImport } from './routes/manage.product.view_desk.index'
import { Route as ManageProductViewdeskOrderIdImport } from './routes/manage.product.view_desk.$orderId'

const RewardComponentImport = new FileRoute('/reward').createRoute()
const DocumentComponentImport = new FileRoute('/document').createRoute()
const CartComponentImport = new FileRoute('/cart').createRoute()
const AboutComponentImport = new FileRoute('/about').createRoute()
const AuthRegisterComponentImport = new FileRoute(
  '/auth/register',
).createRoute()
const AuthLoginComponentImport = new FileRoute('/auth/login').createRoute()
const ManageProductAdddeskComponentImport = new FileRoute(
  '/manage/product/add_desk',
).createRoute()

const RewardComponentRoute = RewardComponentImport.update({
  path: '/reward',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/reward.component'),
    'component',
  ),
})

const DocumentComponentRoute = DocumentComponentImport.update({
  path: '/document',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/document.component'),
    'component',
  ),
})

const CartComponentRoute = CartComponentImport.update({
  path: '/cart',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/cart.component'),
    'component',
  ),
})

const AboutComponentRoute = AboutComponentImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/about.component'),
    'component',
  ),
})

const TermRoute = TermImport.update({
  path: '/term',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProductIndexRoute = ProductIndexImport.update({
  path: '/product/',
  getParentRoute: () => rootRoute,
} as any)

const ManageIndexRoute = ManageIndexImport.update({
  path: '/manage/',
  getParentRoute: () => rootRoute,
} as any)

const AuthRegisterComponentRoute = AuthRegisterComponentImport.update({
  path: '/auth/register',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/auth.register.component'),
    'component',
  ),
})

const AuthLoginComponentRoute = AuthLoginComponentImport.update({
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/auth.login.component'),
    'component',
  ),
})

const UserOrderRoute = UserOrderImport.update({
  path: '/user/order',
  getParentRoute: () => rootRoute,
} as any)

const ProductProductIdRoute = ProductProductIdImport.update({
  path: '/product/$productId',
  getParentRoute: () => rootRoute,
} as any)

const ManageProductAdddeskComponentRoute =
  ManageProductAdddeskComponentImport.update({
    path: '/manage/product/add_desk',
    getParentRoute: () => rootRoute,
  } as any).update({
    component: lazyRouteComponent(
      () => import('./routes/manage.product.add_desk.component'),
      'component',
    ),
  })

const ManageProductSchedulingdeskRoute =
  ManageProductSchedulingdeskImport.update({
    path: '/manage/product/scheduling_desk',
    getParentRoute: () => rootRoute,
  } as any)

const ManageProductViewdeskIndexRoute = ManageProductViewdeskIndexImport.update(
  {
    path: '/manage/product/view_desk/',
    getParentRoute: () => rootRoute,
  } as any,
)

const ManageProductViewdeskOrderIdRoute =
  ManageProductViewdeskOrderIdImport.update({
    path: '/manage/product/view_desk/$orderId',
    getParentRoute: () => rootRoute,
  } as any)
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/term': {
      preLoaderRoute: typeof TermImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutComponentImport
      parentRoute: typeof rootRoute
    }
    '/cart': {
      preLoaderRoute: typeof CartComponentImport
      parentRoute: typeof rootRoute
    }
    '/document': {
      preLoaderRoute: typeof DocumentComponentImport
      parentRoute: typeof rootRoute
    }
    '/reward': {
      preLoaderRoute: typeof RewardComponentImport
      parentRoute: typeof rootRoute
    }
    '/product/$productId': {
      preLoaderRoute: typeof ProductProductIdImport
      parentRoute: typeof rootRoute
    }
    '/user/order': {
      preLoaderRoute: typeof UserOrderImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      preLoaderRoute: typeof AuthLoginComponentImport
      parentRoute: typeof rootRoute
    }
    '/auth/register': {
      preLoaderRoute: typeof AuthRegisterComponentImport
      parentRoute: typeof rootRoute
    }
    '/manage/': {
      preLoaderRoute: typeof ManageIndexImport
      parentRoute: typeof rootRoute
    }
    '/product/': {
      preLoaderRoute: typeof ProductIndexImport
      parentRoute: typeof rootRoute
    }
    '/manage/product/scheduling_desk': {
      preLoaderRoute: typeof ManageProductSchedulingdeskImport
      parentRoute: typeof rootRoute
    }
    '/manage/product/add_desk': {
      preLoaderRoute: typeof ManageProductAdddeskComponentImport
      parentRoute: typeof rootRoute
    }
    '/manage/product/view_desk/$orderId': {
      preLoaderRoute: typeof ManageProductViewdeskOrderIdImport
      parentRoute: typeof rootRoute
    }
    '/manage/product/view_desk/': {
      preLoaderRoute: typeof ManageProductViewdeskIndexImport
      parentRoute: typeof rootRoute
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexRoute,
  TermRoute,
  AboutComponentRoute,
  CartComponentRoute,
  DocumentComponentRoute,
  RewardComponentRoute,
  ProductProductIdRoute,
  UserOrderRoute,
  AuthLoginComponentRoute,
  AuthRegisterComponentRoute,
  ManageIndexRoute,
  ProductIndexRoute,
  ManageProductSchedulingdeskRoute,
  ManageProductAdddeskComponentRoute,
  ManageProductViewdeskOrderIdRoute,
  ManageProductViewdeskIndexRoute,
])
