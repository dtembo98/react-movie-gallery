import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/system";

import { Home } from "./containers";
import "./App.css";
import { customTheme } from "./theme/palette";
import { FavouriteMoviesProvider, PopularMoviesProvider } from "./context";
import { SearchMoviesProvider } from "./context/search-movies/search-movies.context";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <PopularMoviesProvider>
        <FavouriteMoviesProvider>
          <SearchMoviesProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/liked" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </SearchMoviesProvider>
        </FavouriteMoviesProvider>
      </PopularMoviesProvider>
    </ThemeProvider>
  );
}

export default App;
