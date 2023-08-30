import './App.css';
import { NavBar } from './layouts/nav-bar-and-footer/nav-bar';
import { Footer } from './layouts/nav-bar-and-footer/footer';
import { HomePage } from './layouts/home-page/home-page';
import { SearchBookPage } from './layouts/search-book-page/search-book-page';

export const App = () => {
  return (
    <div>
      <NavBar />
      {/* <HomePage /> */}
      <SearchBookPage />
      <Footer />
    </div>
  );
}