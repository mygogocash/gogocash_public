# 🚀 GogoCash Demo Features

## ภาพรวม

หน้า Demo Features นี้แสดงฟีเจอร์ต่างๆ ของแพลตฟอร์ม GogoCash ในรูปแบบ interactive cards พร้อมการทดสอบ Crossmint integration

## ฟีเจอร์หลัก

### 1. 💳 Cashback System

- ระบบคืนเงินอัตโนมัติสำหรับการซื้อสินค้า
- สถิติ: 12.5K users, ฿2.3M revenue, +15% growth
- สถานะ: **Active**

### 2. 💰 Digital Wallet

- กระเป๋าเงินดิจิทัลที่ปลอดภัยและใช้งานง่าย
- สถิติ: 8.2K users, ฿1.8M revenue, +22% growth
- สถานะ: **Active**

### 3. 🎁 Reward Points

- ระบบแต้มสะสมและแลกของรางวัล
- สถิติ: 5.7K users, ฿890K revenue, +8% growth
- สถานะ: **Beta**

### 4. 📊 Analytics Dashboard

- แดชบอร์ดวิเคราะห์ข้อมูลแบบเรียลไทม์
- สถิติ: 3.1K users, ฿650K revenue, +31% growth
- สถานะ: **Active**

### 5. 👥 Social Features

- ฟีเจอร์โซเชียลและการแชร์
- สถิติ: 1.2K users, ฿120K revenue, +5% growth
- สถานะ: **Coming Soon**

### 6. ⚙️ Admin Panel

- ระบบจัดการแอดมินที่ครบครัน
- สถิติ: 45 users, ฿0 revenue, 0% growth
- สถานะ: **Active**

## 🔐 Crossmint Integration

### การทดสอบ Crossmint

Demo page มีเครื่องมือทดสอบ Crossmint integration ที่ตรวจสอบ:

1. **Web3 Authentication** - ทดสอบการเข้าสู่ระบบด้วย Crossmint
2. **Create Wallet** - ทดสอบการสร้าง wallet ใหม่
3. **NFT Minting** - ทดสอบการสร้าง NFT

### การตั้งค่า Crossmint

#### 1. สร้าง Client-side API Key

```bash
# ไปที่ Crossmint Console
https://staging.crossmint.com/console/api-keys

# สร้าง Client-side key ที่ขึ้นต้นด้วย 'ck_staging_'
# เพิ่ม authorized origin: http://localhost:3000
# เลือก scopes: users.create, wallets.create, auth.login
# เปิดใช้งาน JWT Authentication
```

#### 2. อัปเดต Environment Variables

```bash
# ใน .env.local
NEXT_PUBLIC_CROSSMINT_CLIENT_ID="ck_staging_xxxxxxxxxx"
NEXT_PUBLIC_CROSSMINT_CLIENT_SECRET="sk_staging_xxxxxxxxxx"
NEXT_PUBLIC_CROSSMINT_TOKEN_URL="https://www.crossmint.com/api/v1-alpha2/session/auth/token"
NEXT_PUBLIC_CROSSMINT_VERIFICATION_URL="https://www.crossmint.com/api/v1-alpha2/users"
```

#### 3. รีสตาร์ท Development Server

```bash
make restart-web
```

## 📱 การใช้งาน

### เข้าถึง Demo Page

```
http://localhost:3000/demo
```

### Tabs ที่มีให้ใช้งาน

#### 🎯 Features Tab

- แสดง feature cards ทั้งหมด
- คลิกที่ card เพื่อดูรายละเอียด
- แสดงสถิติและสถานะของแต่ละฟีเจอร์

#### 📈 Analytics Tab

- ภาพรวมของแพลตฟอร์ม
- สถิติรวม: users, revenue, active features
- Quick actions สำหรับการทดสอบ

#### ⚙️ Settings Tab

- การตั้งค่า demo configuration
- เปิด/ปิด debug mode
- จัดการ mock data
- รีเซ็ต demo

## 🔧 การ Debug

### Crossmint Debug Information

เมื่อคลิก "Test" ใน Crossmint section จะแสดง:

- ✅ Configuration status
- 🔍 Environment variables check
- 🌐 API connectivity test
- ⚠️ Error messages และคำแนะนำ

### Console Logs

เปิด Browser DevTools เพื่อดู:

```javascript
// Crossmint configuration debug
🔍 Crossmint Config Debug:
Client ID: ck_staging...
Client Secret: sk_staging...
Is Valid Client ID: true

// API test results
✅ Crossmint configuration is working!
❌ Crossmint Error: [error details]
```

## 🚨 การแก้ไขปัญหา

### Error: "Invalid API key"

```bash
# ตรวจสอบว่าใช้ Client-side API Key (ck_)
# ไม่ใช่ Project ID หรือ Server-side key
```

### Error: "Failed to validate signature"

```bash
# ตรวจสอบ authorized origins ใน Crossmint Console
# ต้องมี http://localhost:3000 สำหรับ development
```

### Modal ไม่แสดง

```bash
# ตรวจสอบ browser console สำหรับ errors
# ตรวจสอบ network tab สำหรับ API calls
# ตรวจสอบ Crossmint SDK version
```

## 📚 เอกสารเพิ่มเติม

- [Crossmint Documentation](https://docs.crossmint.com/)
- [API Keys Guide](https://docs.crossmint.com/introduction/platform/api-keys/overview)
- [Client-side Keys](https://docs.crossmint.com/introduction/platform/api-keys/client-side)
- [Staging Console](https://staging.crossmint.com/console)

## 🎨 UI Components

Demo page ใช้ UI components ที่สร้างขึ้นเอง:

- `Card` - สำหรับแสดง feature cards
- `Button` - ปุ่มต่างๆ
- `Badge` - แสดงสถานะ
- `Tabs` - การแบ่งหมวดหมู่
- `Toast` - การแจ้งเตือน

## 🔄 การอัปเดต

เมื่อเพิ่มฟีเจอร์ใหม่:

1. เพิ่มข้อมูลใน `demoFeatures` array
2. เพิ่ม icon จาก `lucide-react`
3. กำหนดสี และสถานะ
4. อัปเดต README นี้
