import { Routes, BrowserRouter, Route as AppRoute } from "react-router-dom";

import { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ROUTES } from "./routes/constants";
import Global from "./globalStyles";

import theme from "./globalStyles/theme";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import Loader from "./components/loader";

const client = new QueryClient();

const App = () => {
  return (
    <Suspense fallback={<Loader type="bubbles" color={theme.colors.primary} />}>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <ToastContainer />
          <ThemeProvider theme={theme}>
            <Global />
            <BrowserRouter>
              <Routes>
                {ROUTES.map(
                  ({
                    route: Route,
                    component: Component,
                    path,
                    exact,
                    ...props
                  }) => (
                    <AppRoute
                      key={path}
                      path={path}
                      exact={exact}
                      element={
                        <Route>
                          <Component {...props} />
                        </Route>
                      }
                    />
                  )
                )}
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </Suspense>
  );
};

export default App;
