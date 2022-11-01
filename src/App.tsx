import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { ThemeProvider } from "@mui/system";

import { Home, NoInternet, ErrorBoundary } from "./containers";
import "./App.css";
import { customTheme } from "./theme/palette";
import { FavouriteMoviesProvider, PopularMoviesProvider } from "./context";
import { SearchMoviesProvider } from "./context/search-movies/search-movies.context";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={customTheme}>
        <PopularMoviesProvider>
          <FavouriteMoviesProvider>
            <SearchMoviesProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/liked" element={<Home />} />
                  <Route path="/no-connection" element={<NoInternet />} />
                </Routes>
              </BrowserRouter>
            </SearchMoviesProvider>
          </FavouriteMoviesProvider>
        </PopularMoviesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
