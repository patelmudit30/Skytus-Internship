import { useState } from 'react';
import Nav from "./nav";
import ProductGrid from "./grid";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Modern Essentials</h1>
          <p>Curated tech, clothing, and accessories designed for daily utility.</p>
        </div>
      </div>

      <div className="control-bar-wrapper">
        <div className="control-bar">
          <div className="categories-pills">
            {["all", "electronics", "clothing", "accessories"].map((cat) => (
              <button
                key={cat}
                className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="sort-wrapper">
            <label htmlFor="sort-select">Sort by</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="none">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <main style={{ flex: 1 }}>
        <ProductGrid
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
        />
      </main>

      <footer className="eshop-footer">
        <p>&copy; {new Date().getFullYear()} Eshop. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
