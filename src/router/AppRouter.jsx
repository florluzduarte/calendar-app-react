import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
  const authStatus = "not-athenticated";

  return (
    <Routes>
      {authStatus === "not-athenticated" ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
