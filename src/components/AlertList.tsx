import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Alert } from '../types';

interface AlertListProps {
  alerts: Alert[];
}

const AlertList: React.FC<AlertListProps> = ({ alerts }) => {
  return (
    <div className="pt-6">
      <h2 className="text-lg font-medium text-gray-900">Alertas Activas</h2>
      {alerts.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">No hay alertas activas.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {alerts.map((alert) => (
            <li key={alert.id} className="bg-white shadow overflow-hidden rounded-md px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className={`h-5 w-5 ${alert.status === 'Cambio detectado' ? 'text-red-400' : 'text-yellow-400'}`} />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    Precio actual: ${alert.currentPrice.toFixed(2)}
                  </span>
                </div>
                <span className={`text-sm ${alert.status === 'Cambio detectado' ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
                  {alert.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <a href={alert.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-cyan-600">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Ver producto
                </a>
              </div>
              {alert.status === 'Cambio detectado' && (
                <div className="mt-2 text-sm text-red-500">
                  Último precio revisado: ${alert.lastCheckedPrice.toFixed(2)}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertList;