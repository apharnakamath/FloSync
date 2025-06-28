// src/components/ui/card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './card.css'; // Optional: if you have specific styles for Card

const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};

export default Card;

// CardContent and CardHeader components
export const CardContent = ({ children, className }) => {
  return <div className={`card-content ${className}`}>{children}</div>;
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.defaultProps = {
  className: '',
};

export const CardHeader = ({ children, className }) => {
  return <div className={`card-header ${className}`}>{children}</div>;
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardHeader.defaultProps = {
  className: '',
};

