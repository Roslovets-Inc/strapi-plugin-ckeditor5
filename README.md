# Strapi CKEditor5 plugin

Replace default [Strapi](https://github.com/strapi/strapi) markdown WYSIWYG editor with enhanced build of HTML [CKEditor 5](https://github.com/ckeditor/ckeditor5).

![strapi-plugin-ckeditor5](https://github.com/Roslovets-Inc/ckeditor5-build-strapi-wysiwyg/raw/main/demo/demo.png)

[👀 **Live Demo**](https://roslovets-inc.github.io/ckeditor5-build-strapi-wysiwyg/)

## Features

-   [Enhanced build of CKEditor 5](https://github.com/Roslovets-Inc/ckeditor5-build-strapi-wysiwyg) with more capabilities then Classic Editor build
-   Extensive set of features for your rich content
-   Optional editor customization
-   Automatically upload Inserted images to Media Library (thanks to [ckeditor5-strapi-upload-plugin](https://github.com/gtomato/ckeditor5-strapi-upload-plugin))
-   Media Library button to insert stored images directly to the editor 🔥
-   Automatic translation of UI into selected in Strapi language 🔥 (Strapi v3)
-   Full screen mode 🔥

## How to try

Check out [👀 **live demo**](https://roslovets-inc.github.io/ckeditor5-build-strapi-wysiwyg/) where you can test most of the features.

## How to install

### Strapi v4 (work in progress)

Go to your Strapi project folder and execute

```bash
npm i strapi-plugin-ckeditor5@latest
```

Don't forget to rebuild Strapi

```bash
npm run strapi build
```

### Strapi v3

Go to your Strapi project folder and execute

```bash
npm i strapi-plugin-ckeditor5@1.14.0
```

Don't forget to rebuild Strapi

```bash
npm run strapi build
```

## How to remove unused buttons (Strapi v3)

See [customization guide](#how-to-customize-editor-optional).

## How to customize editor (optional, Strapi v3)

If you want to change appearance of the editor or remove unused buttons you can add a custom CKEditor configuration to override default settings:

0. Go to your Strapi folder

1. Copy template config file [`node_modules/strapi-plugin-ckeditor5/admin/src/config/ckeditor.js`](admin/src/config/ckeditor.js) to `extensions/ckeditor5/admin/src/config`

2. Set up `extensions/ckeditor5/admin/src/config/ckeditor.js` (see [CKEditor configuration guide](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/configuration.html))

3. Rebuild Strapi

```bash
npm run strapi build
```

### Configuration example (Strapi v3)

```js
// ckeditor.js
module.exports = {
    // Override toolbar config to leave a few buttons
    toolbar: {
        items: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "alignment",
            "|",
            "undo",
            "redo",
        ],
    },
};
```

### Default configuration (Strapi v3)

For information and inspiration: default editor configuration defined [here](https://github.com/Roslovets-Inc/ckeditor5-build-strapi-wysiwyg/blob/e259d72cfc611a0f03aaa7686865412f421fc49c/src/ckeditor.js#L78).

## How to add more features to the editor

If you want to see more features in this plugin feel free to request it in [issues](https://github.com/Roslovets-Inc/strapi-plugin-ckeditor5/issues) or create pull request in the [ckeditor5-build-strapi-wysiwyg](https://github.com/Roslovets-Inc/ckeditor5-build-strapi-wysiwyg) repo. Together we will build a comprehensive editor for common needs.

## Acknowledgement

This plugin uses some code from [official manual](https://strapi.io/documentation/developer-docs/latest/guides/registering-a-field-in-admin.html).

## Links

-   [NPM package](https://www.npmjs.com/package/strapi-plugin-ckeditor5)
-   [GitHub repository](https://github.com/Roslovets-Inc/strapi-plugin-ckeditor5)

## ⭐️ Show your support

Give a star if this project helped you.
