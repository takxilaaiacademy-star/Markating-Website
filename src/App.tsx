import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Course from './pages/Course';
import Courses from './pages/Courses';
import Home from './pages/Home';
import { About, Contact, NotFound, Policies } from './pages/Info';
import Quiz from './pages/Quiz';

export default function App() {
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
