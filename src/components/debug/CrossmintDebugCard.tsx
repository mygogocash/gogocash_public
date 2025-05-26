'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Copy,
  Eye,
  EyeOff,
} from 'lucide-react';

interface CrossmintDebugCardProps {
  onTest?: () => Promise<void>;
  testing?: boolean;
}

export default function CrossmintDebugCard({
  onTest,
  testing = false,
}: CrossmintDebugCardProps) {
  const [showSecrets, setShowSecrets] = useState(false);
  const [testResults, setTestResults] = useState<{
    configCheck: boolean | null;
    apiConnectivity: boolean | null;
    authMethods: Record<string, boolean>;
  }>({
    configCheck: null,
    apiConnectivity: null,
    authMethods: {},
  });

  // Environment variables
  const clientId = process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_SECRET;
  const tokenUrl = process.env.NEXT_PUBLIC_CROSSMINT_TOKEN_URL;
  const verificationUrl = process.env.NEXT_PUBLIC_CROSSMINT_VERIFICATION_URL;

  // Configuration validation
  const isClientIdValid = Boolean(clientId && clientId.startsWith('ck_'));
  const isClientSecretValid = Boolean(
    clientSecret && clientSecret.startsWith('sk_')
  );
  const isConfigValid = Boolean(
    isClientIdValid && isClientSecretValid && tokenUrl && verificationUrl
  );

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Mask sensitive data
  const maskSecret = (secret: string | undefined, show: boolean) => {
    if (!secret) return 'Not set';
    if (show) return secret;
    return (
      secret.substring(0, 10) + '...' + secret.substring(secret.length - 4)
    );
  };

  // Test individual authentication methods
  const testAuthMethod = async (method: string) => {
    try {
      switch (method) {
        case 'email_otp':
          // Test email OTP endpoint
          const emailResponse = await fetch(
            'https://www.crossmint.com/api/auth/email/request-otp',
            {
              method: 'OPTIONS',
            }
          );
          return emailResponse.status < 400;

        case 'social_google':
          // Test social Google endpoint
          const googleResponse = await fetch(
            'https://www.crossmint.com/api/auth/social/google',
            {
              method: 'OPTIONS',
            }
          );
          return googleResponse.status < 400;

        case 'farcaster':
          // Test Farcaster endpoint
          const farcasterResponse = await fetch(
            'https://www.crossmint.com/api/auth/farcaster',
            {
              method: 'OPTIONS',
            }
          );
          return farcasterResponse.status < 400;

        case 'wallet':
          // Test wallet endpoint
          const walletResponse = await fetch(
            'https://www.crossmint.com/api/auth/wallet',
            {
              method: 'OPTIONS',
            }
          );
          return walletResponse.status < 400;

        default:
          return false;
      }
    } catch (error) {
      console.error(`Error testing ${method}:`, error);
      return false;
    }
  };

  // Run comprehensive tests
  const runTests = async () => {
    if (onTest) {
      await onTest();
    }

    // Test configuration
    const configCheck = isConfigValid;

    // Test API connectivity
    let apiConnectivity = false;
    try {
      if (tokenUrl) {
        const response = await fetch(tokenUrl, { method: 'HEAD' });
        apiConnectivity = response.status < 400;
      }
    } catch (error) {
      console.error('API connectivity test failed:', error);
    }

    // Test authentication methods
    const authMethods = {
      email_otp: await testAuthMethod('email_otp'),
      social_google: await testAuthMethod('social_google'),
      farcaster: await testAuthMethod('farcaster'),
      wallet: await testAuthMethod('wallet'),
    };

    setTestResults({
      configCheck,
      apiConnectivity,
      authMethods,
    });
  };

  const getStatusIcon = (status: boolean | null) => {
    if (status === null)
      return <AlertCircle className="h-4 w-4 text-gray-400" />;
    return status ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getStatusBadge = (status: boolean | null) => {
    if (status === null) return <Badge variant="outline">ยังไม่ทดสอบ</Badge>;
    return status ? (
      <Badge className="bg-green-100 text-green-800">ผ่าน</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">ไม่ผ่าน</Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              🔐 Crossmint Integration Debug
            </CardTitle>
            <CardDescription>
              ทดสอบและตรวจสอบ Crossmint Web3 Authentication
            </CardDescription>
          </div>
          <Button
            onClick={runTests}
            disabled={testing}
            variant="outline"
            size="sm"
          >
            {testing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                กำลังทดสอบ...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                ทดสอบทั้งหมด
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration Status */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            {getStatusIcon(isConfigValid)}
            Configuration Status
          </h4>

          {!isConfigValid && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                การตั้งค่า Crossmint ไม่ถูกต้อง กรุณาตรวจสอบ environment
                variables
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            {/* Client ID */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <div className="font-medium text-sm">Client ID</div>
                <div className="text-xs text-gray-500 font-mono">
                  {maskSecret(clientId, showSecrets)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(isClientIdValid)}
                {clientId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(clientId)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Client Secret */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <div className="font-medium text-sm">Client Secret</div>
                <div className="text-xs text-gray-500 font-mono">
                  {maskSecret(clientSecret, showSecrets)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(isClientSecretValid)}
                {clientSecret && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(clientSecret)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="font-medium text-sm">Token URL</div>
                <div className="text-xs text-gray-500 font-mono break-all">
                  {tokenUrl || 'Not set'}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="font-medium text-sm">Verification URL</div>
                <div className="text-xs text-gray-500 font-mono break-all">
                  {verificationUrl || 'Not set'}
                </div>
              </div>
            </div>

            {/* Show/Hide Secrets Toggle */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSecrets(!showSecrets)}
              >
                {showSecrets ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    ซ่อน Secrets
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    แสดง Secrets
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* API Connectivity */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            {getStatusIcon(testResults.apiConnectivity)}
            API Connectivity
          </h4>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div>
              <div className="font-medium text-sm">Crossmint API</div>
              <div className="text-xs text-gray-500">
                ทดสอบการเชื่อมต่อกับ Crossmint API endpoints
              </div>
            </div>
            {getStatusBadge(testResults.apiConnectivity)}
          </div>
        </div>

        {/* Authentication Methods */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-blue-500" />
            Authentication Methods
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries({
              email_otp: 'Email OTP',
              social_google: 'Google Social',
              farcaster: 'Farcaster',
              wallet: 'External Wallet',
            }).map(([key, label]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <div className="font-medium text-sm">{label}</div>
                  <div className="text-xs text-gray-500">
                    /{key.replace('_', '/')}
                  </div>
                </div>
                {getStatusBadge(testResults.authMethods[key])}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Setup Guide */}
        {!isConfigValid && (
          <div>
            <h4 className="font-medium mb-3">🚀 Quick Setup Guide</h4>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-blue-50 rounded-md">
                <div className="font-medium text-blue-800 mb-1">
                  1. สร้าง Client-side API Key
                </div>
                <div className="text-blue-700">
                  ไปที่{' '}
                  <a
                    href="https://staging.crossmint.com/console/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Crossmint Console
                  </a>{' '}
                  และสร้าง Client-side key (ขึ้นต้นด้วย ck_)
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-md">
                <div className="font-medium text-blue-800 mb-1">
                  2. ตั้งค่า Environment Variables
                </div>
                <div className="text-blue-700 font-mono text-xs">
                  NEXT_PUBLIC_CROSSMINT_CLIENT_ID=&quot;ck_staging_xxx&quot;
                  <br />
                  NEXT_PUBLIC_CROSSMINT_CLIENT_SECRET=&quot;sk_staging_xxx&quot;
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-md">
                <div className="font-medium text-blue-800 mb-1">
                  3. รีสตาร์ท Development Server
                </div>
                <div className="text-blue-700 font-mono text-xs">
                  make restart-web
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
