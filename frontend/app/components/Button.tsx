'use client';
import React from 'react';

interface ButtonProps {
  action: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  type: 'primary' | 'secondary';
  text: string;
}

const Button: React.FC<ButtonProps> = ({ action, children, type, text }) => {
  return (
    <button
      onClick={action}
      className={`button-base ${
        type === 'primary' ? 'button-primary' : 'button-secondary'
      } px-4 py-2 bg-[#0ca678] hover:bg-[#099268] rounded-md text-sm cursor-pointer`}
    >
      {children ?? text}
    </button>
  );
};

export default Button;
