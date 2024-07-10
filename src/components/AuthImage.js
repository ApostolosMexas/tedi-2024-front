import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthImage = ({ src, alt, height, width }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem('tedi-token');
        const response = await axios.get(src, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          responseType: 'blob'
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Error fetching the image:', error);
      }
    };

    fetchImage();
  }, [src]);

  return <img src={imageSrc} alt={alt} height={height} width={width}/>;
};

export default AuthImage;
