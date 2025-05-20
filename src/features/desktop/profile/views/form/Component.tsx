import React from 'react';
import { LoginEmail } from './loginEmail';
import { TypeOpen } from './interface';
import { ForgotPassword } from './forgotPassword';
import BeforeLogin from './beforeLogin';

const Component = ({
  handleModal,
}: {
  handleModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = React.useState<TypeOpen>('default');

  return (
    <>
      {isOpen === 'login' ? (
        <LoginEmail setIsOpen={setIsOpen} _isOpen={isOpen} handleModal={handleModal} />
      ) : isOpen === 'forgot' ? (
        <ForgotPassword setIsOpen={setIsOpen} _isOpen={isOpen} />
      ) : (
        <BeforeLogin
          title={'Log In'}
          subTitle={'Enter login details to access your account'}
          isLogin={true}
          setIsOpen={setIsOpen}
          _isOpen={isOpen}
          handleModal={handleModal}
        />
      )}
    </>
  );
};

export { Component };
