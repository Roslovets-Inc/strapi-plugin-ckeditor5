import React from "react";
import PropTypes from "prop-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-strapi-wysiwyg";
import styled from "styled-components";

const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }

    /* Fixes https://github.com/strapi/strapi/issues/11849 */
    /* Fix line height */
    .ck-editor__editable {
      line-height: initial;
    }
    /* Revert font styling */
    div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
      font: revert;
    }
    /* Revert list styling */
    ul, ol {
      list-style: initial;
      margin-left: 16px;
    }
  }
`;

const Editor = ({ onChange, name, value, config }) => {
  return (
    <Wrapper>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onReady={(editor) => {
          editor.setData(value);
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
