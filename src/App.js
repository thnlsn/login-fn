import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './css/style.css';

function App() {
  return (
    <div className='App'>
      <Route path='/' exact component={ExercisesList} />
      <Route path='/edit/:id' component={EditExercise} />
      <Route path='/create' component={CreateExercise} />
      <Route path='/user' component={CreateUser} />
    </div>
  );
}

export default App;
