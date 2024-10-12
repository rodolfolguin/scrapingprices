import React, { useState } from 'react';
import { Globe, DollarSign } from 'lucide-react';
import { Alert } from '../types';

interface ScrapingFormProps {
  onAddAlert: (alert: Alert) => void;
}

const ScrapingForm: React.FC<ScrapingFormProps> = ({ onAddAlert }) => {
  const [url, setUrl] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const newAlert: Alert = {
        id: Date.now(),
        url,
        currentPrice: parseFloat(currentPrice),
        lastCheckedPrice: parseFloat(currentPrice),
        status: 'Monitoreando',
      };
      onAddAlert(newAlert);
      setUrl('');
      setCurrentPrice('');
    } catch (err) {
      setError('Error al procesar la solicitud. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-8 space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          URL del producto
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="url"
            className="focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="https://ejemplo.com/producto"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">
          Precio actual
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            id="currentPrice"
            className="focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="99.99"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        disabled={loading}
      >
        {loading ? 'Procesando...' : 'Agregar Alerta'}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
};

export default ScrapingForm;