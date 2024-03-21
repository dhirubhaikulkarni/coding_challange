import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarDisplay from './Navbar/NavBar';
import rootReducers from './Store/rootReducers';
import { Provider } from 'react-redux';
import ListData from './Components/ListData';



function App() {
  return (
      <Provider store={rootReducers}>
        <BrowserRouter>
          <NavbarDisplay />
          <Routes>
            <Route path="/" element={<ListData />} />
          </Routes>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
