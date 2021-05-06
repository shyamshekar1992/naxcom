
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from "./Components/List";
import Add from "./Components/Add";
import Preview from "./Components/Preview";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <List />
            </Route>
            <Route path="/Add">
              <Add />
            </Route>
            <Route path="/Edit">
              <Preview />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
