import { Flowbite } from 'flowbite-react';
import { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LayoutWithSidebar from './components/Sidebar';
import Settings from './screen/Settings';

import { StudentsProvider } from './context/Students';
import AllStudents from './screen/AllStudents';

function App(): JSX.Element {
  useEffect(() => {
    console.log('App initialized', new Date());
  }, []);
  return (
    <Flowbite>
      <HashRouter>
        <LayoutWithSidebar>
          <StudentsProvider>
            <Routes>
              <Route path="/settings" element={<Settings />} />
              <Route path="/all-students" element={<AllStudents />} />
            </Routes>
          </StudentsProvider>
        </LayoutWithSidebar>
      </HashRouter>
    </Flowbite>
  );
}

export default App;
