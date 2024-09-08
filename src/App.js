import {BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import './App.css';
import Home from './home';  // Import Home component
import CreateRecipe from './create-recipe';  // Import CreateRecipe component
import Auth from './auth';  // Import Auth component
import SavedRecipes from './saved-recipes';  // Import SavedRecipes component

import {Navbar} from './navbar'



function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          
       
      </Routes>
    </Router>
    </div>
  );
}

export default App;
