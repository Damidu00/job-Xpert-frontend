import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cv00 from '../../../../public/cv00.png';
import cv01 from '../../../../public/cv01.png';
import cv02 from '../../../../public/cv02.png';

export default function SelectTemplate() {
  // State to track the currently hovered image
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <div className='bg-gray-200 w-full h-screen flex items-center justify-center'>
      <div className='shadow-lg w-[800px] h-[600px] bg-gray-100'>
        {/* Text Part */}
        <div className='flex flex-col items-center justify-center'>
          <div className='flex flex-col items-start justify-center mt-2'>
            <h2 className='text-4xl font-bold font-mono text-blue-500'>
              Select Your Template
            </h2>
            <h3>See templates and choose the correct template for your entered details</h3>
          </div>
        </div>

        {/* Templates */}
        <div className='w-full h-[450px] mt-5'>
          {/* Template Sets */}
          <div className='flex flex-wrap justify-center'>
            {/* Template 1 */}
            <div
              className='bg-gray-200 w-[150px] h-[200px] cursor-pointer m-5 relative'
              onMouseEnter={() => setHoveredImage(cv00)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img src={cv00} alt="cv00" className='w-full h-full object-cover' />
            </div>

            {/* Template 2 */}
            <div
              className='bg-gray-200 w-[150px] h-[200px] cursor-pointer m-5 relative'
              onMouseEnter={() => setHoveredImage(cv01)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img src={cv01} alt="cv01" className='w-full h-full object-cover' />
            </div>

            {/* Template 3 */}
            <div
              className='bg-gray-200 w-[150px] h-[200px] cursor-pointer m-5 relative'
              onMouseEnter={() => setHoveredImage(cv02)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img src={cv02} alt="cv02" className='w-full h-full object-cover' />
            </div>
          </div>

          {/* Display Hovered Image */}
          {hoveredImage && (
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
              <img
                src={hoveredImage}
                alt="hovered-template"
                className='max-w-[500px] max-h-[600px] shadow-lg border-4 border-white'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}