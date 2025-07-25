import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const bgColor =
    type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded shadow-lg text-white ${bgColor} animate-slide-up` }>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 font-bold">×</button>
      </div>
    </div>
  );
};

export default Toast;