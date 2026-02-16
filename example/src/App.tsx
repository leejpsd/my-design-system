import { useState } from 'react';
import { Button, ToastContainer } from '@my/design-system';
import { ThemeToggle } from './components/ThemeToggle';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import styles from './App.module.css';

type Page = 'login' | 'dashboard';

export function App() {
  const [page, setPage] = useState<Page>('login');

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <span className={styles.logo}>Example App</span>
        <nav className={styles.nav}>
          <Button
            variant={page === 'login' ? 'solid' : 'ghost'}
            size="sm"
            onClick={() => setPage('login')}
          >
            Login
          </Button>
          <Button
            variant={page === 'dashboard' ? 'solid' : 'ghost'}
            size="sm"
            onClick={() => setPage('dashboard')}
          >
            Dashboard
          </Button>
          <ThemeToggle />
        </nav>
      </header>

      <main className={styles.main}>
        {page === 'login' && <LoginPage />}
        {page === 'dashboard' && <DashboardPage />}
      </main>

      <ToastContainer />
    </div>
  );
}
