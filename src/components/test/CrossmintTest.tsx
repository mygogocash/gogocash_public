'use client';

import { useAuth } from '@crossmint/client-sdk-react-ui';
import { useCrossmintLoginContext } from '@/providers/CrossmintLoginContext';

const CrossmintTest = () => {
  const crossmintAuth = useAuth();
  const context = useCrossmintLoginContext();

  const handleTestLogin = () => {
    console.log('🧪 Testing Crossmint Login...');
    console.log('Direct useAuth hook:', {
      status: crossmintAuth.status,
      hasUser: !!crossmintAuth.user,
      hasLogin: !!crossmintAuth.login,
      loginType: typeof crossmintAuth.login,
    });

    console.log('Context hook:', {
      status: context.status,
      hasUser: !!context.user,
      hasLogin: !!context.login,
      loginType: typeof context.login,
    });

    if (typeof crossmintAuth.login === 'function') {
      console.log('✅ Calling login from direct hook...');
      crossmintAuth.login();
    } else if (typeof context.login === 'function') {
      console.log('✅ Calling login from context...');
      context.login();
    } else {
      console.error('❌ No login function available');
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-4">Crossmint Test Component</h3>

      <div className="mb-4">
        <h4 className="font-semibold">Direct useAuth Hook:</h4>
        <p>Status: {crossmintAuth.status}</p>
        <p>Has User: {crossmintAuth.user ? 'Yes' : 'No'}</p>
        <p>
          Has Login: {typeof crossmintAuth.login === 'function' ? 'Yes' : 'No'}
        </p>
        <p>Login Type: {typeof crossmintAuth.login}</p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">Context Hook:</h4>
        <p>Status: {context.status}</p>
        <p>Has User: {context.user ? 'Yes' : 'No'}</p>
        <p>Has Login: {typeof context.login === 'function' ? 'Yes' : 'No'}</p>
        <p>Login Type: {typeof context.login}</p>
      </div>

      <button
        onClick={handleTestLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Test Crossmint Login
      </button>
    </div>
  );
};

export default CrossmintTest;
