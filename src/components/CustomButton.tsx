import React from 'react';

interface CustomButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  type = 'button',
  className = '',
  children,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`cursor-pointer hover:scale-110 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};
