import React from 'react';
import './ElectricFilter.css';

const ElectricFilter = () => {
  return (
    <svg className="svg-container">
      <defs>
        <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="3" result="noise1" seed="1" />
          <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
            <animate attributeName="dy" values="200; 0; -200; 0" dur="8s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="2" result="noise2" seed="2" />
          <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
            <animate attributeName="dx" values="150; 0; -150; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feComposite in="offsetNoise1" in2="offsetNoise2" result="combinedNoise" operator="multiply" />

          <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="3" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </defs>
    </svg>
  );
};

export default ElectricFilter;