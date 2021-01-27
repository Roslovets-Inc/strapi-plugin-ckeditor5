import React from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-strapi-wysiwyg';
import styled from 'styled-components';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/ar';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/cs';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/de';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/es';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/fr';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/id';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/it';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/ko';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/nl';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/pl';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/pt';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/pt-br';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/ru';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/sk';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/th';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/tr';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/uk';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/vi';
import 'ckeditor5-build-strapi-wysiwyg/build/translations/zh';


const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    max-height: 400px;
    > div {
      min-height: 200px;
      max-height: 400px;
    }
  }
`;

const Editor = ({ onChange, name, value, setEditor, config }) => {
  return (
    <Wrapper>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onReady={editor => {
          setEditor(editor);
          if (value) {
            editor.setData(value);
          }
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
        config={config}
      />
    </Wrapper>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;