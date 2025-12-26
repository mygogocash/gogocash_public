import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
  try {
    // ตรวจสอบ environment variables
    const clientId = process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_SECRET;
    const tokenUrl = process.env.NEXT_PUBLIC_CROSSMINT_TOKEN_URL;
    const verificationUrl = process.env.NEXT_PUBLIC_CROSSMINT_VERIFICATION_URL;

    // ตรวจสอบว่ามี credentials ครบถ้วน
    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing Crossmint credentials',
          details: {
            hasClientId: !!clientId,
            hasClientSecret: !!clientSecret,
            hasTokenUrl: !!tokenUrl,
            hasVerificationUrl: !!verificationUrl,
          },
        },
        { status: 400 }
      );
    }

    // ตรวจสอบรูปแบบ Client ID
    if (!clientId.startsWith('ck_')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid Client ID format. Should start with "ck_"',
          details: {
            clientIdFormat: clientId.substring(0, 10) + '...',
            expectedFormat: 'ck_staging_xxx or ck_production_xxx',
          },
        },
        { status: 400 }
      );
    }

    // ทดสอบการเชื่อมต่อ Crossmint API (ถ้ามี URL)
    let apiTestResult = null;
    if (tokenUrl) {
      try {
        const response = await fetch(tokenUrl, {
          method: 'HEAD', // ใช้ HEAD เพื่อไม่ส่งข้อมูล
          headers: {
            'User-Agent': 'GogoCash-Test/1.0',
          },
        });

        apiTestResult = {
          status: response.status,
          statusText: response.statusText,
          reachable: response.status < 500,
        };
      } catch (error) {
        apiTestResult = {
          error: error instanceof Error ? error.message : 'Unknown error',
          reachable: false,
        };
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Crossmint configuration is valid',
      config: {
        clientIdFormat: clientId.startsWith('ck_staging_')
          ? 'staging'
          : clientId.startsWith('ck_production_')
          ? 'production'
          : 'unknown',
        hasRequiredCredentials: true,
        environment: process.env.NODE_ENV,
        apiTest: apiTestResult,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Crossmint test error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
