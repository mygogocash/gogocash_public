'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import CrossmintDebugCard from '@/components/debug/CrossmintDebugCard';
import IntegrationTestCard from '@/components/debug/IntegrationTestCard';

// Integration Types
interface IntegrationStatus {
  name: string;
  status: 'connected' | 'disconnected' | 'error' | 'testing';
  description: string;
  lastChecked?: Date;
  error?: string;
  config?: Record<string, unknown>;
  endpoints?: string[];
}

interface DebugInfo {
  environment: string;
  timestamp: Date;
  totalIntegrations: number;
}

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize debug info
  useEffect(() => {
    loadDebugInfo();
  }, []);

  const loadDebugInfo = async () => {
    setLoading(true);
    try {
      setDebugInfo({
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date(),
        totalIntegrations: 7,
      });
    } catch (error) {
      console.error('Error loading debug info:', error);
    } finally {
      setLoading(false);
    }
  };

  // Integration configurations
  const integrations = [
    {
      name: 'Google OAuth',
      description: 'Social Authentication via Google',
      icon: 'globe',
      config: {
        clientId: process.env.GOOGLE_CLIENT_ID
          ? '✓ Configured'
          : '✗ Not configured',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
          ? '✓ Configured'
          : '✗ Not configured',
      },
      endpoints: [
        'https://accounts.google.com/o/oauth2/auth',
        'https://oauth2.googleapis.com/token',
      ],
    },
    {
      name: 'OneSignal',
      description: 'Push Notifications Service',
      icon: 'bell',
      config: {
        appId: process.env.ONESIGNAL_APP_ID
          ? '✓ Configured'
          : '✗ Not configured',
        apiKey: process.env.ONESIGNAL_API_KEY
          ? '✓ Configured'
          : '✗ Not configured',
      },
      endpoints: [
        'https://onesignal.com/api/v1/notifications',
        'https://onesignal.com/api/v1/players',
      ],
    },
    {
      name: 'Web3 Provider',
      description: 'Blockchain Network Connection',
      icon: 'globe',
      config: {
        enabled: process.env.WEB3_ENABLED === 'true',
        chainId: process.env.CHAIN_ID || '1',
        providerUrl: process.env.WEB3_PROVIDER_URL
          ? '✓ Configured'
          : '✗ Not configured',
      },
      endpoints: [process.env.WEB3_PROVIDER_URL || 'Not configured'],
    },
    {
      name: 'Internal API',
      description: 'Backend API Services',
      icon: 'globe',
      config: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'Not configured',
        environment: process.env.NODE_ENV || 'development',
      },
      endpoints: [
        '/v1/auth/login',
        '/v1/auth/signup',
        '/v1/auth/web3/login',
        '/v1/users/profile',
        '/v1/cashback/history',
      ],
    },
    {
      name: 'Database',
      description: 'MongoDB Database Connection',
      icon: 'database',
      config: {
        name: process.env.DB_NAME || 'bmt_cashback_dev',
        host: 'mongo-dev:27017',
      },
      endpoints: ['mongodb://mongo-dev:27017'],
    },
    {
      name: 'Redis Cache',
      description: 'Redis Cache & Session Store',
      icon: 'database',
      config: {
        host: 'redis-dev',
        port: '6379',
      },
      endpoints: ['redis://redis-dev:6379'],
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg">กำลังโหลดข้อมูล debug...</span>
      </div>
    );
  }

  if (!debugInfo) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>ไม่สามารถโหลดข้อมูล debug ได้</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Environment Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌍 Environment Information
          </CardTitle>
          <CardDescription>ข้อมูลสภาพแวดล้อมปัจจุบัน</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Environment
              </label>
              <p className="text-lg font-semibold">{debugInfo.environment}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Last Updated
              </label>
              <p className="text-lg font-semibold">
                {debugInfo.timestamp.toLocaleString('th-TH')}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Total Integrations
              </label>
              <p className="text-lg font-semibold">
                {debugInfo.totalIntegrations}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={loadDebugInfo} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              รีเฟรชข้อมูล
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integration Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Integration Status Overview</CardTitle>
          <CardDescription>
            สถานะการเชื่อมต่อของ integrations ทั้งหมด
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {
                  integrations.filter((i) =>
                    Object.values(i.config).some((v) =>
                      typeof v === 'string' ? v.includes('✓') : v === true
                    )
                  ).length
                }
              </div>
              <div className="text-sm text-green-700">เชื่อมต่อแล้ว</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {
                  integrations.filter((i) =>
                    Object.values(i.config).some((v) =>
                      typeof v === 'string' ? v.includes('✗') : v === false
                    )
                  ).length
                }
              </div>
              <div className="text-sm text-red-700">ไม่ได้เชื่อมต่อ</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {integrations.length}
              </div>
              <div className="text-sm text-blue-700">ทั้งหมด</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">0</div>
              <div className="text-sm text-yellow-700">มีข้อผิดพลาด</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Integration Tests */}
      <Tabs defaultValue="crossmint" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="crossmint">Crossmint</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
        </TabsList>

        <TabsContent value="crossmint" className="space-y-4">
          <CrossmintDebugCard />
        </TabsContent>

        <TabsContent value="auth" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <IntegrationTestCard
              integration={integrations.find((i) => i.name === 'Google OAuth')!}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>🔑 Authentication Configuration</CardTitle>
              <CardDescription>
                การตั้งค่าระบบ Authentication ทั้งหมด
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">JWT Configuration</h4>
                  <div className="bg-gray-50 p-3 rounded-md font-mono text-sm space-y-1">
                    <div>
                      JWT_SECRET:{' '}
                      {process.env.JWT_SECRET ? '✓ Set' : '✗ Not set'}
                    </div>
                    <div>
                      JWT_EXPIRATION: {process.env.JWT_EXPIRATION || '24h'}
                    </div>
                    <div>
                      REFRESH_TOKEN_EXPIRATION:{' '}
                      {process.env.REFRESH_TOKEN_EXPIRATION || '168h'}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Supported Methods</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline">Email/Password</Badge>
                    <Badge variant="outline">Google OAuth</Badge>
                    <Badge variant="outline">Crossmint Web3</Badge>
                    <Badge variant="outline">JWT Tokens</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <IntegrationTestCard
              integration={integrations.find((i) => i.name === 'OneSignal')!}
            />
            <IntegrationTestCard
              integration={
                integrations.find((i) => i.name === 'Web3 Provider')!
              }
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>🔔 External Services</CardTitle>
              <CardDescription>การเชื่อมต่อกับ services ภายนอก</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">OneSignal Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline">Push Notifications</Badge>
                    <Badge variant="outline">User Segmentation</Badge>
                    <Badge variant="outline">Analytics</Badge>
                    <Badge variant="outline">A/B Testing</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Web3 Networks</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline">Ethereum (1)</Badge>
                    <Badge variant="outline">Polygon (137)</Badge>
                    <Badge variant="outline">BSC (56)</Badge>
                    <Badge variant="outline">Arbitrum (42161)</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <IntegrationTestCard
              integration={integrations.find((i) => i.name === 'Internal API')!}
            />
            <IntegrationTestCard
              integration={integrations.find((i) => i.name === 'Database')!}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <IntegrationTestCard
              integration={integrations.find((i) => i.name === 'Redis Cache')!}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>🏗️ Infrastructure Status</CardTitle>
              <CardDescription>
                สถานะของ infrastructure components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Docker Services</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Badge variant="outline">API (8080)</Badge>
                    <Badge variant="outline">Web (3000)</Badge>
                    <Badge variant="outline">MongoDB (27017)</Badge>
                    <Badge variant="outline">Redis (6379)</Badge>
                    <Badge variant="outline">Nginx (80/443)</Badge>
                    <Badge variant="outline">Backoffice (3001)</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Health Endpoints</h4>
                  <div className="space-y-1 text-sm font-mono">
                    <div>/health - API Health Check</div>
                    <div>/health/db - Database Connection</div>
                    <div>/health/redis - Redis Connection</div>
                    <div>/metrics - Prometheus Metrics</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>⚡ Quick Actions</CardTitle>
          <CardDescription>
            การดำเนินการที่ใช้บ่อยสำหรับ debugging
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start"
            >
              <div className="font-medium">🔄 Restart Services</div>
              <div className="text-sm text-gray-500 mt-1">make restart-web</div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start"
            >
              <div className="font-medium">📋 View Logs</div>
              <div className="text-sm text-gray-500 mt-1">
                docker logs -f web
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start"
            >
              <div className="font-medium">🔧 Environment</div>
              <div className="text-sm text-gray-500 mt-1">Check .env files</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
