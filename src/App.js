import { Routes, Route } from "react-router-dom";
import Protected from "./protected";
import Login from "./login";
import Main from "./main";
import { AuthProvider } from "./libs/authContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Protected />}>
          <Route path="/*" element={<Main />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}
