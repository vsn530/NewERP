import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        api.get('/orders').then(res => setOrders(res.data)).catch(() => {});
    }, []);

    const toggleExpand = (id) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    return (
        <div style={{ maxWidth: '1100px' }}>
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <h1>Order History</h1>
                    <p>View and manage all customer orders</p>
                </div>
                <Link to="/app/create-order" style={{ textDecoration: 'none' }}>
                    <button>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        New Order
                    </button>
                </Link>
            </div>

            {/* Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Created By</th>
                            <th>Date</th>
                            <th style={{ textAlign: 'center', width: '80px' }}>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={6}>
                                    <div className="empty-state">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                                        </svg>
                                        <p>No orders yet</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            orders.map(order => (
                                <React.Fragment key={order.id}>
                                    <tr
                                        style={{ cursor: 'pointer', background: expandedOrder === order.id ? '#fafbff' : undefined }}
                                        onClick={() => toggleExpand(order.id)}
                                    >
                                        <td className="td-main">#{order.id}</td>
                                        <td className="td-main">{order.customer?.name || 'N/A'}</td>
                                        <td style={{ fontWeight: 600, color: 'var(--primary)' }}>
                                            ₹{Number(order.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td style={{ color: 'var(--text-muted)' }}>{order.creator?.email || 'N/A'}</td>
                                        <td style={{ color: 'var(--text-muted)' }}>
                                            {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button
                                                className="ghost"
                                                style={{
                                                    padding: '0.3rem',
                                                    borderRadius: '6px',
                                                    color: expandedOrder === order.id ? 'var(--primary)' : 'var(--text-muted)',
                                                    transform: expandedOrder === order.id ? 'rotate(180deg)' : 'none',
                                                    transition: 'transform 0.2s ease, color 0.2s ease',
                                                }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedOrder === order.id && (
                                        <tr key={`${order.id}-details`}>
                                            <td colSpan="6" style={{ padding: 0, borderBottom: '1px solid var(--border)' }}>
                                                <div style={{ padding: '1.25rem 1.5rem', background: '#fafbff', borderTop: '1px solid var(--border)' }}>
                                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                                                        </svg>
                                                        Items in this order
                                                    </h4>
                                                    <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                                                        <table style={{ margin: 0 }}>
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ padding: '0.625rem 1rem', background: 'var(--bg)' }}>Product</th>
                                                                    <th style={{ padding: '0.625rem 1rem', background: 'var(--bg)' }}>Qty</th>
                                                                    <th style={{ padding: '0.625rem 1rem', background: 'var(--bg)' }}>Unit Price</th>
                                                                    <th style={{ padding: '0.625rem 1rem', background: 'var(--bg)', textAlign: 'right' }}>Subtotal</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {order.order_items.map(item => (
                                                                    <tr key={item.id}>
                                                                        <td style={{ padding: '0.625rem 1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{item.product?.name || 'N/A'}</td>
                                                                        <td style={{ padding: '0.625rem 1rem' }}>{item.quantity}</td>
                                                                        <td style={{ padding: '0.625rem 1rem', color: 'var(--text-muted)' }}>₹{Number(item.price_at_purchase).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                                                        <td style={{ padding: '0.625rem 1rem', textAlign: 'right', fontWeight: 600 }}>₹{(item.quantity * item.price_at_purchase).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
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
