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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CreditCard,
  Wallet,
  Gift,
  TrendingUp,
  Users,
  Settings,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Demo Features Data
const demoFeatures = [
  {
    id: 'cashback',
    title: 'Cashback System',
    description: 'ระบบคืนเงินอัตโนมัติสำหรับการซื้อสินค้า',
    icon: CreditCard,
    color: 'bg-green-500',
    status: 'active',
    stats: { users: '12.5K', revenue: '฿2.3M', growth: '+15%' },
  },
  {
    id: 'wallet',
    title: 'Digital Wallet',
    description: 'กระเป๋าเงินดิจิทัลที่ปลอดภัยและใช้งานง่าย',
    icon: Wallet,
    color: 'bg-blue-500',
    status: 'active',
    stats: { users: '8.2K', revenue: '฿1.8M', growth: '+22%' },
  },
  {
    id: 'rewards',
    title: 'Reward Points',
    description: 'ระบบแต้มสะสมและแลกของรางวัล',
    icon: Gift,
    color: 'bg-purple-500',
    status: 'beta',
    stats: { users: '5.7K', revenue: '฿890K', growth: '+8%' },
  },
  {
    id: 'analytics',
    title: 'Analytics Dashboard',
    description: 'แดชบอร์ดวิเคราะห์ข้อมูลแบบเรียลไทม์',
    icon: TrendingUp,
    color: 'bg-orange-500',
    status: 'active',
    stats: { users: '3.1K', revenue: '฿650K', growth: '+31%' },
  },
  {
    id: 'social',
    title: 'Social Features',
    description: 'ฟีเจอร์โซเชียลและการแชร์',
    icon: Users,
    color: 'bg-pink-500',
    status: 'coming-soon',
    stats: { users: '1.2K', revenue: '฿120K', growth: '+5%' },
  },
  {
    id: 'admin',
    title: 'Admin Panel',
    description: 'ระบบจัดการแอดมินที่ครบครัน',
    icon: Settings,
    color: 'bg-gray-500',
    status: 'active',
    stats: { users: '45', revenue: '฿0', growth: '0%' },
  },
];

const crossmintFeatures = [
  {
    id: 'auth',
    title: 'Web3 Authentication',
    description: 'เข้าสู่ระบบด้วย Crossmint Wallet',
    action: 'testCrossmintAuth',
  },
  {
    id: 'wallet-create',
    title: 'Create Wallet',
    description: 'สร้าง Wallet ใหม่ผ่าน Crossmint',
    action: 'testWalletCreation',
  },
  {
    id: 'nft',
    title: 'NFT Minting',
    description: 'สร้าง NFT ผ่าน Crossmint API',
    action: 'testNFTMinting',
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  beta: 'bg-yellow-100 text-yellow-800',
  'coming-soon': 'bg-gray-100 text-gray-800',
};

export default function DemoPage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [crossmintStatus, setCrossmintStatus] = useState<
    'idle' | 'testing' | 'success' | 'error'
  >('idle');

  const handleFeatureClick = (featureId: string) => {
    setSelectedFeature(featureId);
    const feature = demoFeatures.find((f) => f.id === featureId);
    toast.success(`เปิดฟีเจอร์: ${feature?.title}`);
  };

  const testCrossmintConfig = async () => {
    setCrossmintStatus('testing');

    try {
      // ทดสอบการเชื่อมต่อ API โดยไม่ใช้ process.env ใน client
      const response = await fetch('/api/crossmint/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: true }),
      });

      const data = await response.json();

      if (response.ok) {
        setCrossmintStatus('success');
        toast.success('✅ Crossmint configuration is working!');
        console.log('✅ Crossmint test successful:', data);
      } else {
        throw new Error(data.error || `API test failed: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Crossmint Error:', error);
      setCrossmintStatus('error');
      toast.error(
        `❌ Crossmint Error: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  };

  const handleCrossmintAction = async (action: string) => {
    switch (action) {
      case 'testCrossmintAuth':
        await testCrossmintConfig();
        break;
      case 'testWalletCreation':
        toast('🔧 Wallet creation feature coming soon!', { icon: 'ℹ️' });
        break;
      case 'testNFTMinting':
        toast('🎨 NFT minting feature coming soon!', { icon: '🎨' });
        break;
      default:
        toast.error('Unknown action');
    }
  };

  return (
    <div className="space-y-8">
      {/* Crossmint Debug Section */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Crossmint Integration Status
          </CardTitle>
          <CardDescription>
            ตรวจสอบการตั้งค่าและการเชื่อมต่อ Crossmint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {crossmintFeatures.map((feature) => (
              <Card
                key={feature.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {feature.description}
                  </p>
                  <Button
                    size="sm"
                    onClick={() => handleCrossmintAction(feature.action)}
                    disabled={crossmintStatus === 'testing'}
                  >
                    {crossmintStatus === 'testing' ? 'Testing...' : 'Test'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {crossmintStatus === 'idle' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Info className="h-3 w-3" />
                Ready to test
              </Badge>
            )}
            {crossmintStatus === 'testing' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Zap className="h-3 w-3 animate-spin" />
                Testing...
              </Badge>
            )}
            {crossmintStatus === 'success' && (
              <Badge
                variant="default"
                className="flex items-center gap-1 bg-green-500"
              >
                <CheckCircle className="h-3 w-3" />
                Configuration OK
              </Badge>
            )}
            {crossmintStatus === 'error' && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Configuration Error
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Features Grid */}
      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={feature.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                    selectedFeature === feature.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleFeatureClick(feature.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${feature.color}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <Badge
                        className={
                          statusColors[
                            feature.status as keyof typeof statusColors
                          ]
                        }
                      >
                        {feature.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">
                          {feature.stats.users}
                        </div>
                        <div className="text-gray-500">Users</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">
                          {feature.stats.revenue}
                        </div>
                        <div className="text-gray-500">Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-purple-600">
                          {feature.stats.growth}
                        </div>
                        <div className="text-gray-500">Growth</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Users</span>
                    <span className="font-bold text-blue-600">31,547</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Revenue</span>
                    <span className="font-bold text-green-600">฿5.76M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Features</span>
                    <span className="font-bold text-purple-600">4/6</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile App Demo
                </Button>
                <Button className="w-full" variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  API Documentation
                </Button>
                <Button className="w-full" variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Feature Requests
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Demo Configuration</CardTitle>
              <CardDescription>
                ตั้งค่าการแสดงผลและการทดสอบฟีเจอร์ต่างๆ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Enable Debug Mode</div>
                  <div className="text-sm text-gray-500">
                    แสดงข้อมูล debug ใน console
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Toggle
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Mock Data</div>
                  <div className="text-sm text-gray-500">
                    ใช้ข้อมูลจำลองสำหรับการทดสอบ
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Reset Demo</div>
                  <div className="text-sm text-gray-500">
                    รีเซ็ตข้อมูล demo ทั้งหมด
                  </div>
                </div>
                <Button variant="destructive" size="sm">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
