requirejs-tpl
=============

This is an AMD loader for [Lodash micro-templates](http://lodash.com/docs#template) which can be used as a (almost) drop-in replacement to [ZeeAgency/requirejs-tpl](http://github.com/ZeeAgency/requirejs-tpl)

## Overview

- Uses the ``_.template()`` engine maintained by the Lodash team.
- Uses the official ``text`` loader plugin maintained by the RequireJS team.
- You don't have to specify the template file extension (``.html is assumed``, but this is configurable).

Notes:

- Both libraries can be removed at build-time using ``r.js``.
- The extension ``.html`` is assumed, and this makes loading templates similar to loading JavaScript files with RequireJS (all extensions are assumed).

## Changelog

0.0.1 Initial version

0.0.2 Various updates:
- Add template path option to tpl.js (thanks drewrichards)
- Updated require.js to 2.1.8 , and r.js to 2.1.8
- Updated underscore.js to 1.5.2

0.1.0
- [etlgfx] moved from Underscore to Lodash
- [etlgfx] made file extensions smarter
- [etlgfx] removed extraneous files from repo


## Installation

```
bower install lodash
bower install require.js
bower install git://github.com/etlgfx/requirejs-tpl.git

require.config({
  paths: {
    lodash: 'libs/lodash',
    text: 'libs/text'
    tpl: 'libs/tpl'
  },
  shim: {
    'lodash': {
      exports: '_'
    }
  }
});
```
## Usage

Specify the plugin using ``tpl!`` followed by the template file:

```
require(['backbone', 'tpl!template'], function (Backbone, template) {
  return Backbone.View.extend({
    initialize: function(){
      this.render();
    },
    render: function(){
      this.$el.html(template({message: 'hello'}));
  });
});
```

## Customization

You can specify the template file extension in your main.js:

```
require.config({

  // some paths and shims

  tpl: {
    extension: '.tpl' // default = '.html'
  }
});
```
## Optimization

This plugin is compatible with [r.js](http://requirejs.org/docs/optimization.html).

Optimization brings three benefits to a project:

- The templates are bundled within your code and not dynamically loaded which reduces the number of HTTP requests.
- The templates are pre-compiled before being bundled which reduces the work the client has to do.
- You can use the compiled, non-minimized version of the templates to step over the code in a debugger.

The most important build options are:

```stubModules: ['lodash', 'text', 'tpl']```

The list of modules to stub out in the optimized file, i.e. the code is replaced with ``define('module',{});`` by ``r.js``

```removeCombined: true```

Removes from the output folder the files combined into a build.

## Example

### Using an existing web server

Copy the ``example`` and ``example-build`` folders to your web server (``text`` is not compatible with the ``file://`` protocol and opening ``index.hml`` directly from your browser will not work).

### Using a test server

Try using Gulp - TODO document



##
TODO improve & update this document for my stripped down version of this lib
