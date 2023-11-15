import './App.css'
import Header from './components/Header'
import { Series } from './components/Series/Series'
import { Sets } from './components/Sets/Sets'
import { Cards } from './components/Cards/Cards'
import { LoginForm } from './components/LoginForm'
import { SignUpForm } from './components/SignUpForm'
import { ProtectedRoutes } from './auth/ProtectedRoutes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CardCollectionProvider } from './context/cardCollection'
import { AuthProvider } from './context/auth'
import { Collection } from './components/Collection'

function App () {
  return (
    <AuthProvider>
      <CardCollectionProvider>
        <Router>
          <div className='page'>
            <Header />
            <main>
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route path='/' element={<Series />} />
                  <Route path='series' element={<Series />} />
                  <Route path='series/:serieId/sets' element={<Sets />} />
                  <Route path='series/:serieId/sets/:setId/cards' element={<Cards />} />
                </Route>
                <Route path='collection/:userId' element={<Collection />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/signup' element={<SignUpForm />} />
                <Route path='/collection/:userId/series/:serieId/sets' element={<Sets />} />
                <Route path='/collection/:userId/series/:serieId/sets/:setId/cards' element={<Cards />} />
              </Routes>
            </main>
            <footer>
              <p>Vicio TCG</p>
            </footer>
          </div>
        </Router>
      </CardCollectionProvider>
    </AuthProvider>
  )
}

export default App
