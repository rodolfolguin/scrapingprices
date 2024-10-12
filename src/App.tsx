import React, { useState, useEffect } from 'react';
import { AlertTriangle, DollarSign } from 'lucide-react';
import ScrapingForm from './components/ScrapingForm';
import AlertList from './components/AlertList';
import { Alert } from './types';

function App() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const handleAddAlert = (newAlert: Alert) => {
    setAlerts([...alerts, newAlert]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(currentAlerts =>
        currentAlerts.map(alert => {
          if (Math.random() > 0.7) { // 30% chance of price change
            const newPrice = alert.currentPrice * (1 + (Math.random() - 0.5) * 0.1); // +/- 5% price change
            return {
              ...alert,
              currentPrice: newPrice,
              lastCheckedPrice: alert.currentPrice,
              status: 'Cambio detectado'
            };
          }
          return alert;
        })
      );
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <DollarSign className="h-14 w-14 text-cyan-600" />
              <h1 className="text-2xl font-semibold text-gray-900">Monitoreo de Precios</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <ScrapingForm onAddAlert={handleAddAlert} />
              <AlertList alerts={alerts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;