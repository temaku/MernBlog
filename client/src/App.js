import Home from "./pages/home"
import About from "./pages/about"
import Article from "./pages/article"
import ArticleList  from "./pages/ariticleList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar  from "./components/navbar";
import NotFound from "./pages/NotFound"
function App() {
  return (
    <Router>
      <Navbar/>
      <div className='max-w-screen-md mx-auto pt-20'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/article/:name" element={<Article/>}/>
          <Route path="/article-list" element={<ArticleList/>}/>
          <Route path="*" element={<NotFound/>} />

        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
