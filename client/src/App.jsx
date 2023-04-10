import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Username,
  Password,
  Register,
  Profile,
  Recovery,
  Reset,
  PageNotFound,
} from './components';
import { AuthorizeUser, ProtectRoute } from './middleware/auth';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Username />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/password'
            element={
              <ProtectRoute>
                <Password />
              </ProtectRoute>
            }
          />
          <Route path='/recovery' element={<Recovery />} />
          <Route path='/reset' element={<Reset />} />
          <Route
            path='/profile'
            element={
              <AuthorizeUser>
                <Profile />
              </AuthorizeUser>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
