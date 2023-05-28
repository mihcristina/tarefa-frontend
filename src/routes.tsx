import React from 'react';

import { Routes, Route } from "react-router-dom";


import Tasks from './pages/Tasks';

const Router: React.FC = () => {
    return(
        <Routes>
            <Route path="/" Component={Tasks}>
                
            </Route>
        </Routes>
    );
}
export default Router;