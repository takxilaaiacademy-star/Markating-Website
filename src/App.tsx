import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const Courses = lazy(() => import('./pages/Courses'));
const Course = lazy(() => import('./pages/Course'));
const Quiz = lazy(() => import('./pages/Quiz'));
const About = lazy(() => import('./pages/Info').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Info').then((m) => ({ default: m.Contact })));
const Policies = lazy(() => import('./pages/Info').then((m) => ({ default: m.Policies })));
const NotFound = lazy(() => import('./pages/Info').then((m) => ({ default: m.NotFound })));

// Warm the two biggest pages while the browser is idle, so the first click feels instant.
const prefetchPages = () => {
  void import('./pages/Courses');
  void import('./pages/Course');
};

export default function App() {
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetchPages, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(prefetchPages, 2500);
    return () => clearTimeout(t);
  }, []);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="course/:id" element={<Course />} />
        <Route path="ai-course-finder" element={<Quiz />} />
        <Route path="calculator" element={<Navigate to="/ai-course-finder" replace />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="policies" element={<Policies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
