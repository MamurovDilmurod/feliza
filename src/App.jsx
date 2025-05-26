import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import { Suspense } from "react";
import { routes } from "./routes/routes";
import Loader from "./components/loaders/loader";
import NotFound from "./components/not-found/not-found";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<MainLayout />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
