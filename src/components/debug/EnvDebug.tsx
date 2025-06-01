'use client';

const EnvDebug = () => {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_CROSSMINT_CLIENT_ID:
      process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_ID,
    NEXT_PUBLIC_CROSSMINT_CLIENT_SECRET:
      process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_SECRET,
    NEXT_PUBLIC_CROSSMINT_TOKEN_URL:
      process.env.NEXT_PUBLIC_CROSSMINT_TOKEN_URL,
    NEXT_PUBLIC_CROSSMINT_VERIFICATION_URL:
      process.env.NEXT_PUBLIC_CROSSMINT_VERIFICATION_URL,
  };

  return (
    <div className="p-4 border border-red-300 rounded-lg m-4 bg-red-50">
      <h3 className="text-lg font-bold mb-4 text-red-800">
        Environment Variables Debug
      </h3>
      <div className="space-y-2">
        {Object.entries(envVars).map(([key, value]) => (
          <div key={key} className="flex">
            <span className="font-semibold w-1/3">{key}:</span>
            <span className="text-gray-700">
              {value
                ? key.includes('SECRET')
                  ? `${value.substring(0, 10)}...`
                  : value
                : 'undefined'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvDebug;
