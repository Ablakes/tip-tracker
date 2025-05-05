export default function Modal({ onClose, children }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-xl text-gray-600 hover:text-black"
          >
            ×
          </button>
          {children}
        </div>
      </div>
    );
  }
  