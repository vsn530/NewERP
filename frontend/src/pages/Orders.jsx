import { useState, useEffect } from 'react';
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
        <div>
            <h2>Orders</h2>

            <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Created By</th>
                        <th>Date</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <>
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer?.name || 'N/A'}</td>
                                <td>₹{order.total_amount.toFixed(2)}</td>
                                <td>{order.creator?.email || 'N/A'}</td>
                                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => toggleExpand(order.id)}>
                                        {expandedOrder === order.id ? 'Hide' : 'View'}
                                    </button>
                                </td>
                            </tr>
                            {expandedOrder === order.id && (
                                <tr key={`${order.id}-items`}>
                                    <td colSpan="6" style={{ background: '#f5f5f5' }}>
                                        <strong>Order Items:</strong>
                                        <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%', marginTop: 5 }}>
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Quantity</th>
                                                    <th>Price at Purchase</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.order_items.map(item => (
                                                    <tr key={item.id}>
                                                        <td>{item.product?.name || 'N/A'}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>₹{item.price_at_purchase.toFixed(2)}</td>
                                                        <td>₹{(item.quantity * item.price_at_purchase).toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
            {orders.length === 0 && <p>No orders found.</p>}
        </div>
    );
}
