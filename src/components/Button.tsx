import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 ease-in-out border border-[var(--champagne)]";
  
  const variants = {
    primary: "bg-[var(--champagne)] text-[var(--background)] hover:bg-transparent hover:text-[var(--champagne)]",
    outline: "bg-transparent text-[var(--champagne)] hover:bg-[var(--champagne)] hover:text-[var(--background)]"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
