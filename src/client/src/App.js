import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFavorites } from "./actions/favorites.js";
import AuthProvider from "./auth/AuthProvider.js";
import AppRouter from "./routers/AppRouter";
import Layout from './components/layouts/Layout'

function App() {

  // const [currentId, setCurrentId] = useState(0); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  return (
    <div >
      <Router>
        <AuthProvider> {/* provide context to children */}
          <Layout>
            <AppRouter />
          </Layout>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
