import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../utils/api';
import { FiShoppingCart, FiStar, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { defaultProducts } from '../../utils/defaultProducts';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

useEffect(() => {
  setLoading(true);

  // 🔹 First check inbuilt products
  const localProduct = defaultProducts.find(p => p._id === id);

  if (localProduct) {
    setProduct(localProduct);
    setLoading(false);
  } else {
    // 🔹 Else fetch from backend
    API.get(`/products/${id}`)
      .then(({ data }) => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
        setProduct(null);
        setLoading(false);
      });
  }
}, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i._id === product._id);
    const updated = existing ? cart.map(i => i._id === product._id ? { ...i, qty: i.qty + qty } : i) : [...cart, { ...product, qty }];
    localStorage.setItem('cart', JSON.stringify(updated));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"/></div>;
  if (!product) return <div className="empty-state">Product not found</div>;

  const specs = product.specifications ? Object.entries(product.specifications) : [];

  return (
    <div style={{maxWidth:1000}}>
      <Link to="/products" className="btn btn-outline btn-sm" style={{marginBottom:20}}><FiArrowLeft/> Back to Products</Link>

      <div className="grid-2">
        <div>
          <div className="card" style={{padding:0,overflow:'hidden',marginBottom:16}}>
            {product.images?.[0] ? <img src={product.images[0]} alt={product.name} style={{width:'100%',height:340,objectFit:'cover'}}/> :
              <div style={{height:340,display:'flex',alignItems:'center',justifyContent:'center',fontSize:80,background:'#f8fafc'}}>📦</div>}
          </div>
        </div>

        <div>
          <div style={{display:'flex',gap:8,marginBottom:12}}>
            <span className="badge badge-blue">{product.category}</span>
            {product.isRestricted && <span className="badge badge-red">🛡️ Defence Grade</span>}
            {product.supplier?.supplierInfo?.verified && <span className="badge badge-green">✓ Verified Supplier</span>}
          </div>

          <h1 style={{fontSize:28,marginBottom:8}}>{product.name}</h1>

          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
            <div style={{display:'flex',gap:4,color:'var(--accent)'}}>
              {[...Array(5)].map((_,i)=><FiStar key={i} style={{fill: i < Math.round(product.rating) ? 'currentColor' : 'none'}}/>)}
            </div>
            <span style={{fontSize:13,color:'var(--muted)'}}>{product.reviewCount} reviews</span>
            <span style={{fontSize:13,color:'var(--muted)'}}>• {product.views} views</span>
          </div>

          <div style={{fontSize:36,fontFamily:'Syne',fontWeight:800,color:'var(--primary)',marginBottom:8}}>
            ₹{product.price?.toLocaleString()} <span style={{fontSize:16,fontWeight:400,color:'var(--muted)'}}>per {product.unit}</span>
          </div>

          <div style={{fontSize:13,color:'var(--muted)',marginBottom:20}}>
            Min. Order: {product.minOrderQty} {product.unit} &nbsp;|&nbsp;
            Stock: <span style={{color: product.stock < 10 ? 'var(--danger)' : 'var(--success)', fontWeight:600}}>{product.stock} available</span>
          </div>

          <div style={{background:'#f8fafc',borderRadius:8,padding:16,marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:6}}>Supplier</div>
            <div style={{fontWeight:700}}>{product.supplier?.company || product.supplier?.name}</div>
            {product.supplier?.phone && <div style={{fontSize:13,color:'var(--muted)'}}>{product.supplier.phone}</div>}
          </div>

          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
            <div style={{display:'flex',alignItems:'center',border:'1.5px solid var(--border)',borderRadius:8,overflow:'hidden'}}>
              <button className="btn btn-outline btn-sm" style={{border:'none',borderRadius:0}} onClick={()=>setQty(q=>Math.max(product.minOrderQty,q-1))}>−</button>
              <span style={{padding:'0 16px',fontWeight:700}}>{qty}</span>
              <button className="btn btn-outline btn-sm" style={{border:'none',borderRadius:0}} onClick={()=>setQty(q=>q+1)}>+</button>
            </div>
            <button className="btn btn-primary" style={{flex:1,justifyContent:'center'}} onClick={addToCart}>
              {added ? <><FiCheck/> Added!</> : <><FiShoppingCart/> Add to Cart</>}
            </button>
          </div>

          <div style={{fontSize:13,color:'var(--muted)'}}>Total: <strong style={{fontSize:16,color:'var(--primary)'}}>₹{(product.price * qty).toLocaleString()}</strong></div>
        </div>
      </div>

      {/* Description */}
      <div className="card" style={{padding:24,marginTop:24}}>
        <h3 style={{fontFamily:'Syne',marginBottom:12}}>Description</h3>
        <p style={{color:'var(--muted)',lineHeight:1.8}}>{product.description}</p>
      </div>

      {/* Specs */}
      {specs.length > 0 && (
        <div className="card" style={{padding:24,marginTop:16}}>
          <h3 style={{fontFamily:'Syne',marginBottom:16}}>Specifications</h3>
          <div className="grid-2">
            {specs.map(([k,v]) => (
              <div key={k} style={{display:'flex',gap:12,padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                <span style={{color:'var(--muted)',minWidth:120,fontSize:13}}>{k}</span>
                <strong style={{fontSize:13}}>{v}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {product.tags?.length > 0 && (
        <div style={{marginTop:16,display:'flex',gap:8,flexWrap:'wrap'}}>
          {product.tags.map(t=><span key={t} className="badge badge-gray">{t}</span>)}
        </div>
      )}
    </div>
  );
}
