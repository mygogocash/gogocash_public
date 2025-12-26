'use client';

const CrossmintStatus = () => {
  const clientId = process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_SECRET;

  const getKeyType = (key: string | undefined) => {
    if (!key) return 'Not set';
    if (key.startsWith('ck_')) return 'Client-side API Key ✅';
    if (key.startsWith('sk_')) return 'Server-side API Key ⚠️';
    if (key.length > 30) return 'Project ID (UUID) ⚠️';
    return 'Unknown format ❌';
  };

  const getRecommendation = () => {
    if (clientSecret?.startsWith('ck_')) {
      return '✅ Perfect! Using Client-side API Key from CLIENT_SECRET';
    }
    if (clientId?.startsWith('ck_')) {
      return '✅ Good! Using Client-side API Key from CLIENT_ID';
    }
    return '❌ Need Client-side API Key (starts with "ck_")';
  };

  return (
    <div className="p-4 border border-blue-300 rounded-lg m-4 bg-blue-50">
      <h3 className="text-blue-800 font-bold mb-4">
        🔐 Crossmint Configuration Status
      </h3>

      <div className="space-y-3 text-sm">
        <div>
          <strong>CLIENT_ID:</strong>{' '}
          {clientId ? `${clientId.substring(0, 15)}...` : 'Not set'}
          <br />
          <span className="text-gray-600">Type: {getKeyType(clientId)}</span>
        </div>

        <div>
          <strong>CLIENT_SECRET:</strong>{' '}
          {clientSecret ? `${clientSecret.substring(0, 15)}...` : 'Not set'}
          <br />
          <span className="text-gray-600">
            Type: {getKeyType(clientSecret)}
          </span>
        </div>

        <div className="pt-2 border-t border-blue-200">
          <strong>Recommendation:</strong>
          <br />
          <span
            className={
              getRecommendation().startsWith('✅')
                ? 'text-green-600'
                : 'text-red-600'
            }
          >
            {getRecommendation()}
          </span>
        </div>

        {!clientSecret?.startsWith('ck_') && !clientId?.startsWith('ck_') && (
          <div className="pt-2 border-t border-blue-200 bg-yellow-50 p-3 rounded">
            <strong className="text-yellow-800">Setup Required:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-yellow-700">
              <li>
                Go to{' '}
                <a
                  href="https://staging.crossmint.com/console/api-keys"
                  target="_blank"
                  className="underline"
                >
                  Crossmint Console
                </a>
              </li>
              <li>Create Client-side API key (starts with &quot;ck_&quot;)</li>
              <li>Add authorized origin: http://localhost:3000</li>
              <li>Update .env.development file</li>
              <li>Restart development server</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrossmintStatus;
