import React, { useEffect, useState } from 'react';
import { useStrapi } from 'strapi-helper-plugin';
import PropTypes from 'prop-types';

const MediaLib = ({ isOpen, onChange, onToggle }) => {
  const {
    strapi: {
      componentApi: { getComponent },
    },
  } = useStrapi();

  const [data, setData] = useState(null);
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsDisplayed(true);
    }
  }, [isOpen]);

  const MediaLibComponent = getComponent('media-library').Component;

  const handleInputChange = data => {
    if (data) {
      setData({ ...data });
    }
  };

  const handleClosed = () => {
    if (data) {
      onChange(data);
    }
    setData(null);
    setIsDisplayed(false);
  };

  if (MediaLibComponent && isDisplayed) {
    return (
      <MediaLibComponent
        allowedTypes={['images']}
        isOpen={isOpen}
        multiple={false}
        noNavigation
        onClosed={handleClosed}
        onInputMediaChange={handleInputChange}
        onToggle={onToggle}
      />
    );
  }

  return null;
};

MediaLib.defaultProps = {
  isOpen: false,
  onChange: () => { },
  onToggle: () => { },
};

MediaLib.propTypes = {
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
};

export default MediaLib;