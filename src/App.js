import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UpdateReservation from "./components/update-reservation.component";

function App() {
    return (
        <Router>
            <Route path="/update" exact component={UpdateReservation} />
        </Router>
    );
}

export default App;