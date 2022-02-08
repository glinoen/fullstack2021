import React from 'react';

type HeaderProps = {
  courseName: string;
};

const Header = ({ courseName }: HeaderProps) => {
  return (
    <div className="header">
      <h1>{courseName}</h1>
    </div>
  );
};

export default Header;
