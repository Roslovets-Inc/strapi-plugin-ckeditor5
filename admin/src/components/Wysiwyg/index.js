import React, { useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@strapi/design-system";
import { prefixFileUrlWithBackendUrl, auth } from "@strapi/helper-plugin";
import Editor from "../CKEditor";
import MediaLib from "../MediaLib";
import config from "../../config/ckeditor";

const Wysiwyg = (props) => {
  const { formatMessage } = useIntl();
  const { description, error, intlLabel, placeholder, name, onChange, value } =
    props;
  const [isOpen, setIsOpen] = useState(false);
  const [editor, setEditor] = useState(null);

  const handleChange = (data) => {
    if (data) {
      editor.model.change((writer) => {
        const divElement = writer.createElement("div");
        data.forEach((file) => {
          const url = prefixFileUrlWithBackendUrl(file.url);
          const imageElement = writer.createElement("image", {
            src: url,
          });
          divElement._appendChild(imageElement);
        });
        editor.model.insertContent(divElement, editor.model.document.selection);
      });
    }

    // Handle videos and other type of files by adding some code
  };

  const toggleMediaLib = (editor) => {
    if (editor) {
      setEditor(editor);
    }
    setIsOpen((prev) => !prev);
  };

  const errorMessage = error
    ? formatMessage({ id: error, defaultMessage: error })
    : "";

  const label = intlLabel.id
    ? formatMessage(
        { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
        { ...intlLabel.values }
      )
    : name;

  const hint = description
    ? formatMessage(
        { id: description.id, defaultMessage: description.defaultMessage },
        { ...description.values }
      )
    : "";

  config.strapiMediaLib = {
    onToggle: toggleMediaLib,
    label: label,
  };

  config.strapiUpload = {
    uploadUrl: `${strapi.backendURL}/upload`,
    headers: {
      Authorization: "Bearer " + auth.getToken(),
    },
  };

  return (
    <Stack size={1}>
      <Stack horizontal size={1}>
        <Typography variant="pi" fontWeight="bold" textColor="neutral800">
          {label}
        </Typography>
      </Stack>
      <div
        style={{
          "line-height": "normal",
        }}
      >
        <Editor
          name={name}
          onChange={onChange}
          value={value || ""}
          config={config}
        />
      </div>
      {(!hint || error) && (
        <Typography
          as="p"
          variant="pi"
          id={`${name}-hint`}
          textColor="neutral600"
        >
          {hint}
        </Typography>
      )}

      {errorMessage && (
        <Box paddingTop={1}>
          <Typography
            variant="pi"
            textColor="danger600"
            data-strapi-field-error
          >
            {errorMessage}
          </Typography>
        </Box>
      )}

      <MediaLib
        onToggle={toggleMediaLib}
        isOpen={isOpen}
        onChange={handleChange}
      />
    </Stack>
  );
};

Wysiwyg.defaultProps = {
  errors: [],
  inputDescription: null,
  label: "",
  noErrorsDescription: false,
  value: "",
};

Wysiwyg.propTypes = {
  errors: PropTypes.array,
  inputDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  name: PropTypes.string.isRequired,
  noErrorsDescription: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Wysiwyg;
