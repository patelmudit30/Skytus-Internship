import './grid.css';

import l1 from "./l1.webp";
import hp1 from "./hp1.webp";
import p1 from "./p1.webp";
import p2 from "./p2.jpeg";
import m1 from "./m1.jpeg";
import sw1 from "./sw1.jpeg";
import b1 from "./b1.jpg";
import eb1 from "./eb1.jpeg";
import mb1 from "./mb1.jpg";
import cw1 from "./cw1.jpg";
import cl1 from "./cl1.jpg";
import cl2 from "./cl2.jpg";

const PRODUCTS = [
  { id: "1", n: "Galaxy Laptop", p: 50000, image: l1, category: "electronics" },
  { id: "2", n: "HeadPhone", p: 2999, image: hp1, category: "electronics" },
  { id: "3", n: "Google Pixel", p: 42000, image: p1, category: "electronics" },
  { id: "4", n: "Galaxy Fold", p: 80999, image: p2, category: "electronics" },
  { id: "5", n: "Wireless Mouse", p: 999, image: m1, category: "electronics" },
  { id: "6", n: "Smart Watch", p: 8999, image: sw1, category: "electronics" },
  { id: "7", n: "HP Laptop Bag", p: 899, image: b1, category: "accessories" },
  { id: "8", n: "Noise EarBird", p: 3999, image: eb1, category: "electronics" },
  { id: "9", n: "Apple MacBook M5", p: 80999, image: mb1, category: "electronics" },
  { id: "10", n: "Men Classical Watch", p: 12999, image: cw1, category: "accessories" },
  { id: "11", n: "Women Dress 1", p: 999, image: cl1, category: "clothing" },
  { id: "12", n: "Women Dress 2", p: 999, image: cl2, category: "clothing" }
];

const formatPrice = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

function ProductCard({ p }) {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={p.image} alt={p.n} loading="lazy" />
        <span className="card-category-badge">{p.category}</span>
      </div>
      <div className="card-info">
        <h3 className="card-title">{p.n}</h3>
        <div className="card-price">{formatPrice(p.p)}</div>
      </div>
    </div>
  );
}

export default function ProductGrid({ searchQuery, selectedCategory, sortBy }) {
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.n.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.p - b.p;
    } else if (sortBy === "price-desc") {
      return b.p - a.p;
    }
    return 0;
  });

  return (
    <div className="grid-container-wrapper">
      <div className="grid-container">
        {sortedProducts.length > 0 ? (
          <div className="product-grid">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} p={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="no-products-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <h3>No products found</h3>
            <p>Try checking your spelling or selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
}