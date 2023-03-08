import React from "react";
import './styles/App.css';
import Header from "./components/Header";
import Content from "./components/Content";

function App() {

  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <Header/>
      <Content/>
    </div>
  );
}

export default App;
