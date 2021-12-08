import React, { useEffect, useState } from "react";
import { useLibrary } from "@strapi/helper-plugin";
import PropTypes from "prop-types";

const MediaLib = ({ isOpen, onChange, onToggle }) => {
  const { components } = useLibrary();
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    setIsDisplayed(isOpen);
  }, [isOpen]);

  const Component = components["media-library"];

  const handleInputChange = (data) => {
    if (data) {
      onChange(data);
      onToggle();
    }
  };

  const handleClosed = () => {
    onToggle();
  };

  if (Component && isDisplayed) {
    return (
      <Component
        allowedTypes={["images", "videos", "files"]}
        isMultiple={false}
        onClose={handleClosed}
        onSelectAssets={handleInputChange}
      />
    );
  }

  return null;
};

MediaLib.defaultProps = {
  isOpen: false,
  onChange: () => {},
  onToggle: () => {},
};

MediaLib.propTypes = {
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
};

export default MediaLib;
