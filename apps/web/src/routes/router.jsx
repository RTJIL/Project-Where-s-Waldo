import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout/Layout'
import Home from '../pages/Home/Home'
import NotFound from '../pages/404/404'
import Scene from '../pages/SceneCard/Scene'
import LeaderBoard from '../pages/LeaderBoard/LeaderBoard'
import ErrorBoundary from '../pages/Error/ErrorBoundary'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/scene/:id',
        element: <Scene />,
      },
      {
        path: '/leaderboard',
        element: <LeaderBoard />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
