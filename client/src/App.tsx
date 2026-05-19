import {BrowserRouter,Routes,Route} from "react-router-dom"

import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
        <Route
            path="/register"
            element={<RegisterPage />}
        />
      </Routes>
    </BrowserRouter>

  )
}

export default App