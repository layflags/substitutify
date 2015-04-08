# substitutify

Browserify transform to replace placeholders with infos from `package.json`.

Inspired by [browserify-versionify](https://github.com/webpro/versionify).

## Usage

From package.json:

    {
      ...
      "browserify": {
        "transform": [
          ["sustitutify", {
            "__VERSION__": "version",
            "__NAME__": "name"
          }],
          ...
        ],
        ...
      },
      ...
    }

From Node.js:

    browserify().transform('substitutify', {
      '__VERSION__': 'version',
      '__NAME__': 'name'
    });

You can also provide a `filter` property to whitelist files to apply the transform to (e.g. `filter: /\.js$/`).

