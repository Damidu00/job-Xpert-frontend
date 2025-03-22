import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cv00 from '../../../../public/cv00.png';
import cv01 from '../../../../public/cv01.png';
import cv02 from '../../../../public/cv02.png';

export default function SelectTemplate() {
  // State to track the currently hovered image
  const [hoveredImage, setHoveredImage] = useState(null);
  const navigate = useNavigate();

  const handleCvId = (id) => {
    navigate("/viewtemplate/" + id);
  };

  return (
    <div className='bg-gray-200 w-full h-screen flex items-center justify-center'>
      {/* Main Container */}
      <div className='shadow-lg w-[1200px] h-[600px] bg-gray-100 flex'>
        {/* Left Side: Templates */}
        <div className='w-2/3 h-full p-5 overflow-y-auto'>
          {/* Text Part */}
          <div className='flex flex-col items-center justify-center mb-5'>
            <div className='flex flex-col items-start justify-center'>
              <h2 className='text-4xl font-bold font-mono text-blue-500'>
                Select Your Template
              </h2>
              <h3>See templates and choose the correct template for your entered details</h3>
            </div>
          </div>

          {/* Templates */}
          <div className='flex flex-wrap justify-center'>
            {/* Template 1 */}
            <div
              className='bg-gray-200 w-[150px] h-[200px] cursor-pointer m-5 relative'
              onMouseEnter={() => setHoveredImage(cv00)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => handleCvId("cv00")}
            >
              <img src={cv00} alt="cv00" className='w-full h-full object-cover' />
            </div>

            {/* Template 2 */}
            <div
              className='bg-gray-200 w-[150px] h-[200px] cursor-pointer m-5 relative'
              onMouseEnter={() => setHoveredImage(cv01)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => handleCvId("cv01")}
            >
              <img src={cv01} alt="cv01" className='w-full h-full object-cover' />
            </div>

            {/* Template 3 */}
            <div
              className='bg-gray-200 w-[150px] h-[200px] cursor-pointer m-5 relative'
              onMouseEnter={() => setHoveredImage(cv02)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => handleCvId("cv02")}
            >
              <img src={cv02} alt="cv02" className='w-full h-full object-cover' />
            </div>
          </div>
        </div>

        {/* Right Side: Hovered Image Display */}
        <div className='w-1/3 h-full bg-gray-200 flex flex-col items-center justify-center'>
          <h3 className='text-xl font-bold text-blue-500 mb-5'>Preview</h3>
          {hoveredImage ? (
            <img
              src={hoveredImage}
              alt="hovered-template"
              className='max-w-[400px] max-h-[500px] shadow-lg border-4 border-white'
            />
          ) : (
            <p className='text-gray-500'>Hover over a template to preview</p>
          )}
        </div>
      </div>
    </div>
  );
}