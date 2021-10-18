import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from "./auth/AuthProvider.js";
import AppRouter from "./routers/AppRouter";
import Layout from './components/layouts/Layout'

function App() {
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
