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
  ExternalLink,
  Database,
  Bell,
  Globe,
} from 'lucide-react';

interface TestResult {
  success: boolean;
  message: string;
  details?: Record<string, unknown>;
}

interface IntegrationTestCardProps {
  integration: {
    name: string;
    description: string;
    icon: string;
    endpoints: string[];
    config: Record<string, unknown>;
  };
  onTest?: () => Promise<void>;
  testing?: boolean;
}

export default function IntegrationTestCard({
  integration,
  onTest,
  testing = false,
}: IntegrationTestCardProps) {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'database':
        return <Database className="h-5 w-5" />;
      case 'bell':
        return <Bell className="h-5 w-5" />;
      case 'globe':
        return <Globe className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const runIntegrationTest = async () => {
    setIsRunningTest(true);
    setTestResult(null);

    try {
      if (onTest) {
        await onTest();
      }

      // Run specific tests based on integration type
      let result: TestResult;

      switch (integration.name) {
        case 'Google OAuth':
          result = await testGoogleOAuth();
          break;
        case 'OneSignal':
          result = await testOneSignal();
          break;
        case 'Web3 Provider':
          result = await testWeb3Provider();
          break;
        case 'Internal API':
          result = await testInternalAPI();
          break;
        case 'Database':
          result = await testDatabase();
          break;
        case 'Redis Cache':
          result = await testRedis();
          break;
        default:
          result = {
            success: false,
            message: 'ไม่รองรับการทดสอบสำหรับ integration นี้',
          };
      }

      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: `เกิดข้อผิดพลาดในการทดสอบ: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      });
    } finally {
      setIsRunningTest(false);
    }
  };

  // Individual test functions
  const testGoogleOAuth = async (): Promise<TestResult> => {
    try {
      const response = await fetch(
        'https://accounts.google.com/.well-known/openid_configuration'
      );
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          message: 'Google OAuth discovery endpoint ตอบสนองปกติ',
          details: {
            issuer: data.issuer,
            authorization_endpoint: data.authorization_endpoint,
            token_endpoint: data.token_endpoint,
          },
        };
      } else {
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `ไม่สามารถเชื่อมต่อกับ Google OAuth: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      };
    }
  };

  const testOneSignal = async (): Promise<TestResult> => {
    const appId = process.env.ONESIGNAL_APP_ID;
    const apiKey = process.env.ONESIGNAL_API_KEY;

    if (!appId || !apiKey) {
      return {
        success: false,
        message: 'OneSignal App ID หรือ API Key ไม่ได้ตั้งค่า',
      };
    }

    try {
      const response = await fetch(
        `https://onesignal.com/api/v1/apps/${appId}`,
        {
          headers: {
            Authorization: `Basic ${apiKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          message: 'OneSignal API ตอบสนองปกติ',
          details: {
            app_name: data.name,
            players: data.players,
            messageable_players: data.messageable_players,
          },
        };
      } else {
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `ไม่สามารถเชื่อมต่อกับ OneSignal: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      };
    }
  };

  const testWeb3Provider = async (): Promise<TestResult> => {
    const providerUrl = process.env.WEB3_PROVIDER_URL;

    if (!providerUrl) {
      return {
        success: false,
        message: 'Web3 Provider URL ไม่ได้ตั้งค่า',
      };
    }

    try {
      const response = await fetch(providerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          const blockNumber = parseInt(data.result, 16);
          return {
            success: true,
            message: 'Web3 Provider ตอบสนองปกติ',
            details: {
              latest_block: blockNumber,
              chain_id: process.env.CHAIN_ID || '1',
              provider_url: providerUrl.substring(0, 50) + '...',
            },
          };
        } else {
          return {
            success: false,
            message: `Web3 RPC Error: ${
              data.error?.message || 'Unknown error'
            }`,
          };
        }
      } else {
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `ไม่สามารถเชื่อมต่อกับ Web3 Provider: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      };
    }
  };

  const testInternalAPI = async (): Promise<TestResult> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      return {
        success: false,
        message: 'Internal API URL ไม่ได้ตั้งค่า',
      };
    }

    try {
      // Test health endpoint
      const response = await fetch(`${apiUrl}/health`);

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          message: 'Internal API ตอบสนองปกติ',
          details: {
            status: data.status || 'healthy',
            timestamp: data.timestamp || new Date().toISOString(),
            version: data.version || 'unknown',
          },
        };
      } else {
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `ไม่สามารถเชื่อมต่อกับ Internal API: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      };
    }
  };

  const testDatabase = async (): Promise<TestResult> => {
    // Since we can't directly test MongoDB from frontend, we'll test via API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      return {
        success: false,
        message: 'ไม่สามารถทดสอบ Database โดยตรงจาก Frontend',
      };
    }

    try {
      const response = await fetch(`${apiUrl}/health/db`);

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          message: 'Database connection ปกติ',
          details: {
            status: data.database?.status || 'connected',
            name: process.env.DB_NAME || 'bmt_cashback_dev',
          },
        };
      } else {
        return {
          success: false,
          message: `Database health check failed: HTTP ${response.status}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `ไม่สามารถตรวจสอบ Database: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      };
    }
  };

  const testRedis = async (): Promise<TestResult> => {
    // Since we can't directly test Redis from frontend, we'll test via API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      return {
        success: false,
        message: 'ไม่สามารถทดสอบ Redis โดยตรงจาก Frontend',
      };
    }

    try {
      const response = await fetch(`${apiUrl}/health/redis`);

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          message: 'Redis connection ปกติ',
          details: {
            status: data.redis?.status || 'connected',
            host: 'redis-dev',
            port: '6379',
          },
        };
      } else {
        return {
          success: false,
          message: `Redis health check failed: HTTP ${response.status}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `ไม่สามารถตรวจสอบ Redis: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      };
    }
  };

  const getStatusIcon = (success: boolean | null) => {
    if (success === null)
      return <AlertCircle className="h-4 w-4 text-gray-400" />;
    return success ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getStatusBadge = (success: boolean | null) => {
    if (success === null) return <Badge variant="outline">ยังไม่ทดสอบ</Badge>;
    return success ? (
      <Badge className="bg-green-100 text-green-800">ผ่าน</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">ไม่ผ่าน</Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getIcon(integration.icon)}
            <div>
              <CardTitle className="text-lg">{integration.name}</CardTitle>
              <CardDescription className="text-sm">
                {integration.description}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {testResult && getStatusBadge(testResult.success)}
            <Button
              onClick={runIntegrationTest}
              disabled={isRunningTest || testing}
              variant="outline"
              size="sm"
            >
              {isRunningTest ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ทดสอบ...
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  ทดสอบ
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Configuration */}
        <div>
          <h4 className="font-medium mb-2 text-sm">Configuration</h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(integration.config).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center p-2 bg-gray-50 rounded text-xs"
              >
                <span className="text-gray-600">{key}:</span>
                <span className="font-mono text-gray-800">
                  {typeof value === 'boolean'
                    ? value
                      ? '✓'
                      : '✗'
                    : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Endpoints */}
        {integration.endpoints.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 text-sm">Endpoints</h4>
            <div className="space-y-1">
              {integration.endpoints.map((endpoint, index) => (
                <div
                  key={index}
                  className="text-xs font-mono text-gray-600 p-2 bg-gray-50 rounded"
                >
                  {endpoint}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test Results */}
        {testResult && (
          <div>
            <h4 className="font-medium mb-2 text-sm flex items-center gap-2">
              {getStatusIcon(testResult.success)}
              Test Results
            </h4>

            <Alert
              className={
                testResult.success
                  ? 'border-green-200 bg-green-50'
                  : 'border-red-200 bg-red-50'
              }
            >
              <AlertDescription className="text-sm">
                {testResult.message}
              </AlertDescription>
            </Alert>

            {testResult.details && (
              <div className="mt-3">
                <h5 className="font-medium text-xs text-gray-600 mb-2">
                  Details
                </h5>
                <div className="space-y-1">
                  {Object.entries(testResult.details).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded text-xs"
                    >
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-mono text-gray-800">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
