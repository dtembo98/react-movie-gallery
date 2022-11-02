import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Home, NoInternet, ErrorBoundary } from "./containers";
import { customTheme } from "./theme/palette";
import { FavouriteMoviesProvider, PopularMoviesProvider } from "./context";
import { SearchMoviesProvider } from "./context/search-movies/search-movies.context";

import "./App.css";

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
