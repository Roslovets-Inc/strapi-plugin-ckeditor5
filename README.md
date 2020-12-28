# Strapi CKEditor5 plugin

Replace Strapi default WYSIWYG editor with enhanced build of CKEditor 5

![strapi-plugin-ckeditor5](/sample/strapi-plugin-ckeditor5.png)


## Features

- [Enhanced build of CKEditor 5](https://github.com/Roslovets-Inc/ckeditor5-build-strapi-wysiwyg) with more capabilities then Classic Editor build
- Media Library button to insert stored images directly to editor (thanks to [official guide](https://strapi.io/documentation/developer-docs/latest/guides/registering-a-field-in-admin.html))
- Inserted images automatically auploaded to Media Library (thanks to [ckeditor5-strapi-upload-plugin](https://github.com/gtomato/ckeditor5-strapi-upload-plugin))
- Works with Strapi 3.4.0+


## How to install

### Quick installation (not recommended, use for testing only)

Go to your Strapi project folder and execute

```bash
cd plugins
git clone https://github.com/Roslovets-Inc/strapi-plugin-ckeditor5.git
cd strapi-plugin-ckeditor5
npm i
```

Don't forget to rebuild Strapi.
 
 
### Install submodule (recommended for your project)

Go to your Strapi project folder and execute

```bash
git submodule add https://github.com/Roslovets-Inc/strapi-plugin-ckeditor5.git ./plugins/strapi-plugin-ckeditor5
git submodule update --init
npm ci --prefix ./plugins/strapi-plugin-ckeditor5
```

Don't forget to rebuild Strapi.


### Update submodule

Go to your Strapi project folder and execute

```bash
git submodule update --remote
npm ci --prefix ./plugins/strapi-plugin-ckeditor5
```

Don't forget to rebuild Strapi.
 

## Acknowledgement

This plugin uses code from [official manual](https://strapi.io/documentation/developer-docs/latest/guides/registering-a-field-in-admin.html).
