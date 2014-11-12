// RequireJS lodash template plugin
// http://github.com/etlgfx/requirejs-tpl
//
// An alternative to http://github.com/ZeeAgency/requirejs-tpl
//
// Using lodash micro-templates at http://lodash.com/docs#template
// Using and RequireJS text.js at http://requirejs.org/docs/api.html#text
// @author JF Paradis, etlgfx
// @version 0.1.0
//
// Released under the MIT license
//
// Usage:
//   require(['backbone', 'tpl!mytemplate'], function (Backbone, mytemplate) {
//     return Backbone.View.extend({
//       initialize: function(){
//         this.render();
//       },
//       render: function(){
//         this.$el.html(mytemplate({message: 'hello'}));
//     });
//   });
//
// Configuration: (optional)
//   require.config({
//     tpl: {
//       extension: '.tpl' // default = '.html'
//     }
//   });

/*jslint nomen: true */
/*global define: false */

define(['text', 'lodash'], function (text, _) {

    'use strict';

    var buildMap = {},
        buildTemplateSource = "define('{pluginName}!{moduleName}', ['lodash'], function (_) { return {source}; });\n";

    return {
        version: '0.0.2',

        load: function (moduleName, parentRequire, onload, config) {
            if (buildMap[moduleName]) {
                onload(buildMap[moduleName]);
            }
            else {
                var ext = (config.tpl && config.tpl.extension) || '.html',
                    path = (config.tpl && config.tpl.path) || '',
                    filename = path + moduleName + (moduleName.indexOf(ext, moduleName.length - ext.length) !== -1 ? '' : ext);

                text.load(filename, parentRequire, function (source) {
                    buildMap[moduleName] = _.template(source);
                    onload(buildMap[moduleName]);
                }, config);
            }
        },

        write: function (pluginName, moduleName, write) {
            var build = buildMap[moduleName],
                source = build && build.source;

            if (source) {
                write.asModule(
                    pluginName + '!' + moduleName,
                    buildTemplateSource
                        .replace('{pluginName}', pluginName)
                        .replace('{moduleName}', moduleName)
                        .replace('{source}', source)
                );
            }
        }
    };
});
