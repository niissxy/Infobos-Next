import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const ProductForm: React.FC = () => {
  const { user, role } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!user) return <p>Silakan login untuk menambah produk.</p>;

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('infobos_token') || ''}`,
        },
        body: JSON.stringify({
        title,
        description,
          isPremium: role === 'premium',
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Gagal menambahkan produk');
      alert('Produk berhasil ditambahkan!');
    } catch (err) {
      console.error('Failed to add product to Laravel:', err);
      alert('Gagal menambahkan produk. Silakan coba lagi.');
    }
  };

  return (
    <form onSubmit={handleAddProduct} className="p-4 border rounded shadow">
      <h2 className="text-xl mb-4">Tambah Produk {role === 'premium' && '(Premium)'}</h2>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full mb-2 p-2 border" required />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full mb-2 p-2 border" required />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Product</button>
    </form>
  );
};
