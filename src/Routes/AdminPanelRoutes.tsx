import React from 'react';
import Panel from '../pages/AdminPanel/Panel';
import { Route, Routes } from 'react-router-dom';
import BookingDetails from '../pages/AdminPanel/BookingDetails';
import Option2 from '../pages/AdminPanel/Option2';

function AdminPanelRoutes() {
  return (
    <div>
      <Panel>
        <Routes>
          <Route path="/bookingdetails" element={<BookingDetails />} />
          <Route path="/option2" element={<Option2 />} />
        </Routes>
      </Panel>
    </div>
  );
}

export default AdminPanelRoutes;
