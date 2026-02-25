import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { FiSearch, FiFilter, FiStar, FiShoppingCart } from 'react-icons/fi';
import './ProductList.css';
import { defaultProducts } from '../../utils/defaultProducts';

const CATEGORIES = ['','motors','semiconductors','defence','electronics','mechanical','other'];

export default function ProductList() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(params.get('category') || '');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; } });

  const fetchProducts = () => {
  setLoading(true);
  const q = new URLSearchParams({ page, limit: 12 });
  if (search) q.append('search', search);
  if (category) q.append('category', category);
  if (sort) q.append('sort', sort);

  API.get(`/products?${q}`)
    .then(({ data }) => {
      const apiProducts = Array.isArray(data.products) ? data.products : [];

      // ✅ Merge inbuilt + API products
      const mergedProducts = [...defaultProducts, ...apiProducts];

      setProducts(mergedProducts);
      setTotal(mergedProducts.length);
      setLoading(false);

      // Track search
      if (search && user) {
        API.post('/suggestions/track-search', { query: search }).catch(() => {});
      }
    })
    .catch((err) => {
      console.error("API failed, showing default products only:", err);

      // ✅ If API fails, still show inbuilt products
      setProducts(defaultProducts);
      setTotal(defaultProducts.length);
      setLoading(false);
    });
};

  useEffect(() => { fetchProducts(); }, [page, category, sort]);

  const addToCart = (product) => {
    const existing = cart.find(i => i._id === product._id);
    const updated = existing
      ? cart.map(i => i._id === product._id ? { ...i, qty: i.qty + 1 } : i)
      : [...cart, { ...product, qty: 1 }];
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    // Track view
    if (user) API.post('/suggestions/track-view', { productId: product._id }).catch(() => {});
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;right:20px;background:#10b981;color:#fff;padding:12px 20px;border-radius:8px;font-size:14px;z-index:9999;font-family:DM Sans';
    toast.textContent = '✓ Added to cart';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  return (
    <div style={{maxWidth:1200}}>
      <div className="page-header">
        <h1>Products</h1>
        <p>Showing {total} industrial products</p>
      </div>

      {/* Filters */}
      <div className="card" style={{padding:16,marginBottom:24,display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
        <div style={{position:'relative',flex:1,minWidth:200}}>
          <FiSearch style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--muted)'}}/>
          <input className="input" style={{paddingLeft:36}} placeholder="Search products..." value={search}
            onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(setPage(1),fetchProducts())} />
        </div>
        <select className="input" style={{width:160}} value={category} onChange={e=>{setCategory(e.target.value);setPage(1);}}>
          {CATEGORIES.map(c=><option key={c} value={c}>{c||'All Categories'}</option>)}
        </select>
        <select className="input" style={{width:160}} value={sort} onChange={e=>{setSort(e.target.value);setPage(1);}}>
          <option value="">Latest First</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
        <button className="btn btn-primary" onClick={()=>{setPage(1);fetchProducts();}}>
          <FiFilter/> Filter
        </button>
      </div>

      {loading ? <div className="loading-spinner"><div className="spinner"/></div> :
        products.length === 0 ? <div className="empty-state"><p>No products found.</p></div> : (
          <div className="product-grid">
            {products.map(p => (
              <div key={p._id} className="product-card card">
                <Link to={`/products/${p._id}`}>
                  <div className="product-img">
                    {p.images?.[0] ? <img src={p.images[0]} alt={p.name}/> : <div className="img-placeholder">📦</div>}
                    <span className={`badge badge-blue product-cat`}>{p.category}</span>
                    {p.isRestricted && <span className="badge badge-red product-restricted">🛡️ Defence</span>}
                  </div>
                  <div className="product-body">
                    <div className="product-name">{p.name}</div>
                    <div className="product-supplier">{p.supplier?.company || p.supplier?.name}</div>
                    <div className="product-meta">
                      <div className="product-price">₹{p.price?.toLocaleString()}<span>/{p.unit}</span></div>
                      <div className="product-rating">
                        <FiStar/>{p.rating?.toFixed(1) || '—'}
                      </div>
                    </div>
                    <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>Stock: {p.stock} | Min: {p.minOrderQty}</div>
                  </div>
                </Link>
                <div style={{padding:'12px 16px',borderTop:'1px solid var(--border)'}}>
                  <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={()=>addToCart(p)}>
                    <FiShoppingCart/> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      }

      <div style={{display:'flex',gap:10,marginTop:28,justifyContent:'center'}}>
        <button className="btn btn-outline btn-sm" disabled={page===1} onClick={()=>setPage(p=>p-1)}>← Prev</button>
        <span style={{fontSize:14,alignSelf:'center'}}>Page {page} of {Math.ceil(total/12)||1}</span>
        <button className="btn btn-outline btn-sm" disabled={products.length<12} onClick={()=>setPage(p=>p+1)}>Next →</button>
      </div>
    </div>
  );
}
