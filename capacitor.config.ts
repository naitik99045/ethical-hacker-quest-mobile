
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c414da5d74ee4bfeaa7240febd25c5e6',
  appName: 'ethical-hacker-quest-mobile',
  webDir: 'dist',
  server: {
    url: 'https://c414da5d-74ee-4bfe-aa72-40febd25c5e6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0a0a0a',
      showSpinner: false
    }
  }
};

export default config;
