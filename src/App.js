import "./App.css";
import Navbar from "./components/navbar";
import Master from "./components/master";
import Dashboard from "./components/dashboard";
import Tasks from "./components/tasks";
import Calendar from "./components/calendar";
import Analytics from "./components/analytics";
import Setting from "./components/setting";
import Login from "./components/login";
import Signup from "./components/signup";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import TaskProvider from "./context/taskContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
function AppContent() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Master />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <Tasks />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <Calendar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/setting"
                element={
                  <ProtectedRoute>
                    <Setting />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />

<Route path="/signup" element={<Signup />} />
            </Route>
      </Routes>
    </>
  );
}
function App() {
  return (
    <>
      <TaskProvider>

        <BrowserRouter>
          <AppContent />
        </BrowserRouter>

      </TaskProvider>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
      />
    </>
  );
}
export default App;
