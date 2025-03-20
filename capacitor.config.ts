
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6d560841dc6a40b5bff257dccb0a388c',
  appName: 'arabify-funland',
  webDir: 'dist',
  server: {
    url: 'https://6d560841-dc6a-40b5-bff2-57dccb0a388c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
      signingType: 'apksigner'
    }
  }
};

export default config;
