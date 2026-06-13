import { useState, useEffect, useRef } from 'react';
import api from './api';

/**
 * Shows a toast notification when the backend (hosted on Render free tier) is waking up.
 * Pings the backend on mount — if it takes more than 3s, shows a "waking up" message.
 */
export default function BackendStatus() {
    const [status, setStatus] = useState('idle'); // idle | waking | ready
    const shownWaking = useRef(false);

    useEffect(() => {
        let timeout;
        let retryInterval;
        const controller = new AbortController();

        // If the response takes > 3s, show the waking notification
        timeout = setTimeout(() => {
            shownWaking.current = true;
            setStatus('waking');
        }, 3000);

        const onServerReady = () => {
            clearTimeout(timeout);
            clearInterval(retryInterval);
            if (shownWaking.current) {
                setStatus('ready');
                setTimeout(() => setStatus('idle'), 3500);
            } else {
                setStatus('idle');
            }
        };

        const onServerError = (err) => {
            clearTimeout(timeout);
            if (err.name === 'CanceledError' || err.name === 'AbortError') return;
            // If we got an HTTP response (even 404/500), backend is alive
            if (err.response) {
                onServerReady();
                return;
            }
            // Network error — backend is truly sleeping
            shownWaking.current = true;
            setStatus('waking');
            // Retry every 5s
            retryInterval = setInterval(() => {
                api.get('/', { timeout: 15000 })
                    .then(onServerReady)
                    .catch((retryErr) => {
                        if (retryErr.response) onServerReady();
                    });
            }, 5000);
        };

        api.get('/', { signal: controller.signal, timeout: 60000 })
            .then(onServerReady)
            .catch(onServerError);

        return () => {
            clearTimeout(timeout);
            clearInterval(retryInterval);
            controller.abort();
        };
    }, []);

    if (status === 'idle') return null;

    return (
        <div className="backend-toast" data-status={status}>
            <div className="backend-toast-inner">
                {status === 'waking' && (
                    <>
                        <div className="backend-toast-spinner" />
                        <div>
                            <div className="backend-toast-title">Backend is waking up...</div>
                            <div className="backend-toast-desc">
                                Our server sleeps when inactive. It'll be ready in ~30 seconds. Hang tight!
                            </div>
                        </div>
                    </>
                )}
                {status === 'ready' && (
                    <>
                        <div className="backend-toast-check">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div>
                            <div className="backend-toast-title">Backend is ready!</div>
                            <div className="backend-toast-desc">You're all set. Enjoy using Mini ERP.</div>
                        </div>
                    </>
                )}
            </div>

            <style>{`
                .backend-toast {
                    position: fixed;
                    bottom: 1.5rem;
                    right: 1.5rem;
                    z-index: 9999;
                    animation: toastSlideIn 0.4s ease-out forwards;
                }
                @keyframes toastSlideIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                .backend-toast-inner {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.875rem;
                    background: #0f172a;
                    color: white;
                    padding: 1rem 1.25rem;
                    border-radius: 14px;
                    box-shadow: 0 20px 50px -10px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06);
                    max-width: 340px;
                }
                .backend-toast-spinner {
                    width: 20px; height: 20px;
                    border: 2.5px solid rgba(255,255,255,0.15);
                    border-top-color: #818cf8;
                    border-radius: 50%;
                    animation: toastSpin 0.8s linear infinite;
                    flex-shrink: 0;
                    margin-top: 2px;
                }
                @keyframes toastSpin { to { transform: rotate(360deg); } }
                .backend-toast-check {
                    color: #34d399;
                    flex-shrink: 0;
                    margin-top: 1px;
                }
                .backend-toast-title {
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 0.2rem;
                    font-family: 'Inter', system-ui, sans-serif;
                }
                .backend-toast-desc {
                    font-size: 0.8125rem;
                    color: #94a3b8;
                    line-height: 1.45;
                    font-family: 'Inter', system-ui, sans-serif;
                }
            `}</style>
        </div>
    );
}
