import './App.css';
import SkillsList from './components/SkillsList';
import SkillDetails from './components/SkillDetails';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () =>{
  return (

    <Router>
    <Routes>
      <Route path="/" element={<SkillsList username="angelmoralesb" />} />
      <Route path="/:skillName" element={<SkillDetails />} />
    </Routes>
  </Router>

   
      
   
  );
}

export default App;
