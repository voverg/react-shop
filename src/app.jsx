import { Header } from './layouts/header.jsx';
import { Main } from './layouts/main.jsx';
import { Footer } from './layouts/footer.jsx';

import './app.css';

export function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}