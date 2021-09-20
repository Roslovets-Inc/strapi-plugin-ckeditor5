import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Label, InputDescription, InputErrors, useGlobalContext, prefixFileUrlWithBackendUrl, auth } from 'strapi-helper-plugin';
import Editor from '../CKEditor';
import MediaLib from '../MediaLib';
import config from '../../config/ckeditor';

const Wysiwyg = ({
  inputDescription,
  errors,
  label,
  name,
  noErrorsDescription,
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editor, setEditor] = useState(null);
  const toggleMediaLib = (editor) => {
    if (editor) {
      setEditor(editor);
    }
    setIsOpen(prev => !prev)
  };
  let spacer = !isEmpty(inputDescription) ? <div style={{ height: '.4rem' }} /> : <div />;

  const { formatMessage, currentLocale } = useGlobalContext();
  const mediaLibTitle = formatMessage({ id: 'Media Library' });

  config.language = currentLocale;

  config.strapiMediaLib = {
    onToggle: toggleMediaLib,
    label: mediaLibTitle
  };

  config.strapiUpload = {
    uploadUrl: `${strapi.backendURL}/upload`,
    headers: {
      Authorization: 'Bearer ' + auth.getToken(),
    }
  };

  const onImageSelected = (data) => {
    if (data && data.mime.includes('image')) {
      const url = prefixFileUrlWithBackendUrl(data.url);
      editor.model.change(writer => {
        const imageAttributes = {
          src: url
        };
        if (data.formats) {
          //CKEditor5 always uses only sizes="100vw"
          const srcset = [];
          Object.values(data.formats).sort((f1, f2) => f1.width - f2.width).forEach((format, index, array) => {
            srcset.push(`${prefixFileUrlWithBackendUrl(format.url)} ${format.width}w`)
          })
          //also add the original size last
          srcset.push(`${prefixFileUrlWithBackendUrl(data.url)} ${data.width}w`)
          imageAttributes.srcset = {data: srcset.join(', '), width: data.width};
        }
        const imageElement = writer.createElement('image', imageAttributes);
        editor.model.insertContent(imageElement, editor.model.document.selection);
      });
      // Handle videos and other type of files by adding some code
    }
  };


  if (!noErrorsDescription && !isEmpty(errors)) {
    spacer = <div />;
  }


  return (
    <div
      style={{
        marginBottom: '1.6rem',
        fontSize: '1.3rem',
        fontFamily: 'Lato',
      }}
    >
      <Label htmlFor={name} message={label} style={{ marginBottom: 10 }} />
      <Editor name={name} onChange={onChange} value={value} config={config} />
      <InputDescription message={inputDescription} style={!isEmpty(inputDescription) ? { marginTop: '1.4rem' } : {}} />
      <InputErrors errors={(!noErrorsDescription && errors) || []} name={name} />
      <MediaLib isOpen={isOpen} onToggle={toggleMediaLib} onChange={onImageSelected} />
    </div>
  );
};

Wysiwyg.defaultProps = {
  errors: [],
  inputDescription: null,
  label: '',
  noErrorsDescription: false,
  value: '',
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