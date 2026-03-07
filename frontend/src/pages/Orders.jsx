import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        api.get('/orders').then(res => setOrders(res.data)).catch(() => { });
    }, []);

    const toggleExpand = (id) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Order History</h1>
                    <p style={{ color: 'var(--text-muted)' }}>View and manage all customer orders</p>
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total Amount</th>
                            <th>Created By</th>
                            <th>Date</th>
                            <th style={{ textAlign: 'right' }}>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 1rem' }}>No orders found.</td></tr>
                        ) : (
                            orders.map(order => (
                                <React.Fragment key={order.id}>
                                    <tr style={{ cursor: 'pointer', background: expandedOrder === order.id ? '#f8fafc' : 'transparent' }} onClick={() => toggleExpand(order.id)}>
                                        <td style={{ fontWeight: 500, color: 'var(--text-main)' }}>#{order.id}</td>
                                        <td style={{ fontWeight: 500 }}>{order.customer?.name || 'N/A'}</td>
                                        <td style={{ fontWeight: 600, color: 'var(--primary)' }}>₹{order.total_amount.toFixed(2)}</td>
                                        <td style={{ color: 'var(--text-muted)' }}>{order.creator?.email || 'N/A'}</td>
                                        <td style={{ color: 'var(--text-muted)' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button
                                                className="outline"
                                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: expandedOrder === order.id ? 'var(--primary)' : 'transparent', color: expandedOrder === order.id ? 'white' : 'var(--text-main)' }}
                                            >
                                                {expandedOrder === order.id ? 'Hide' : 'View'}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedOrder === order.id && (
                                        <tr key={`${order.id}-items`}>
                                            <td colSpan="6" style={{ padding: 0, borderBottom: '1px solid var(--border)' }}>
                                                <div style={{ padding: '1.5rem', background: '#f8fafc', borderTop: '1px solid var(--border)' }}>
                                                    <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                                        Order Items Breakdown
                                                    </h4>
                                                    <div className="card" style={{ padding: 0, overflow: 'hidden', boxShadow: 'none' }}>
                                                        <table style={{ margin: 0 }}>
                                                            <thead style={{ background: 'var(--bg-color)' }}>
                                                                <tr>
                                                                    <th style={{ padding: '0.75rem 1rem' }}>Product</th>
                                                                    <th style={{ padding: '0.75rem 1rem' }}>Quantity</th>
                                                                    <th style={{ padding: '0.75rem 1rem' }}>Price at Purchase</th>
                                                                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Subtotal</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {order.order_items.map(item => (
                                                                    <tr key={item.id}>
                                                                        <td style={{ padding: '0.75rem 1rem' }}>{item.product?.name || 'N/A'}</td>
                                                                        <td style={{ padding: '0.75rem 1rem' }}>{item.quantity}</td>
                                                                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>₹{item.price_at_purchase.toFixed(2)}</td>
                                                                        <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 500 }}>₹{(item.quantity * item.price_at_purchase).toFixed(2)}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
