/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { CustomerDashboard } from './components/CustomerDashboard';
import { WalletScreen } from './components/WalletScreen';
import { AIMirrorScreen } from './components/AIMirrorScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { ProfileScreen } from './components/ProfileScreen';
import { GmailScreen } from './components/GmailScreen';
import { Navigation } from './components/Navigation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [userRole, setUserRole] = useState('customer');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <SplashScreen 
            onNext={() => setCurrentScreen('auth')} 
            onAdminClick={() => setCurrentScreen('admin')} 
          />
        );
      case 'auth':
        return (
          <AuthScreen 
            onLogin={(role) => { 
              setUserRole(role); 
              if (role === 'admin') {
                setCurrentScreen('admin');
              } else {
                setCurrentScreen('dashboard'); 
              }
            }} 
          />
        );
      case 'dashboard':
        return <CustomerDashboard />;
      case 'wallet':
        return <WalletScreen />;
      case 'aimirror':
        return <AIMirrorScreen />;
      case 'gmail':
        return <GmailScreen />;
      case 'profile':
        return (
          <ProfileScreen 
            onLogout={() => {
              localStorage.removeItem('su_salon_current_user');
              setCurrentScreen('splash');
            }}
          />
        );
      case 'admin':
        return <AdminDashboard onBack={() => setCurrentScreen('splash')} />;
      default:
        return <CustomerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex justify-center" dir="rtl">
      <div className="w-full bg-white min-h-screen shadow-2xl relative flex flex-col">
        <div className="flex-1 relative">
          {renderScreen()}
        </div>
        {currentScreen !== 'splash' && currentScreen !== 'auth' && currentScreen !== 'admin' && (
          <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        )}
      </div>
    </div>
  );
}

