import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Donate from "./pages/Donate";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Reviews from "./pages/Reviews";
import Sponsorship from "./pages/Sponsorship";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/sponsorship" element={<Sponsorship />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
