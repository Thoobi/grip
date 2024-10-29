import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/layout/layout"
import OnboardingScreen from "../pages/OnboardingScreen"

export const Mainroute = createBrowserRouter([

  {
    element: (
      <Layout />
    ),
    children: [
      {
        path: "/",
        element: <OnboardingScreen />
      },
    ],
  },
  {
    path: "*",
  }
])
