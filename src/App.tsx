import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const Courses = lazy(() => import('./pages/Courses'));
const Course = lazy(() => import('./pages/Course'));
const Quiz = lazy(() => import('./pages/Quiz'));
const About = lazy(() => import('./pages/Info').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Info').then((m) => ({ default: m.Contact })));
const Policies = lazy(() => import('./pages/Info').then((m) => ({ default: m.Policies })));
const NotFound = lazy(() => import('./pages/Info').then((m) => ({ default: m.NotFound })));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="course/:id" element={<Course />} />
        <Route path="ai-course-finder" element={<Quiz />} />
        <Route path="calculator" element={<Quiz />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="policies" element={<Policies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
