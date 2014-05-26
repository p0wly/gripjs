/*!
 * Spark.js v0.1.0
 *
 * Copyright (c) Paul Solbach
 * Available under the BSD and MIT licenses
 */

/*
 * Spark.js is a lightweight (1kb) dependency
 * insertion switch for Javascript modules.
 * Load an array of unpacked Javascript modules
 * for development or a pretailored minified script
 * without overhead. Documentation on Github.
 */

"use strict";

var target = document.body.lastChild,
    head = document.getElementsByTagName('head')[0],
    body = document.getElementsByTagName('body')[0];


window.Spark = {

    init: function() {
        // Load Options from .js
        var script = document.scripts[0];
        var src = script.getAttribute('data-options');

        // Options
        this.get(src)
    },

    get: function(url) {
        // Get options from modules.js
        this.append(url, head, this.options);
    },

    append: function(els,t,c) {
        // Create script element w/ src
        (typeof(els) === "string") && (els = [els])
        var randQS = Math.random().toString(36).substring(7),
            i = 0, len = els.length,
            
            createEls = function self() {
                // Bind event to callback function.
                // Debug Mode => Deterministic Loading
                var s = document.createElement('script'); 
                if (len>i+1) s.onload = s.onreadystatechange = self;
                else s.onload = s.onreadystatechange = c;

                s.src = els[i] + "?"+ randQS;
                s.type = "text/javascript"; 
                s.charset = "utf-8";

                // Append
                (!t) && (t = target);
                t.appendChild(s);
                i++;
            }

        // Append
        createEls()

    },

    options: function() {

        // Use defaults?
        var opt = window.opt || {
                devel: false,
                modules: [],
                src: ""
            };

        // Generate full paths
        var moduleList = function(l,b) {
            l.forEach(function(e,i,a) {
                a[i] = "/" + b + e
            })

            return l
        }

        opt.modules = opt.modules
            ? moduleList(opt.modules, opt.baseUrl)
            : [opt.baseUrl + "main.js"];

        Spark.out(opt)
    },

    out: function(opt) {

        // Use minified?
        if (!opt.debug) Spark.append(opt.min, body);
        else Spark.append(opt.modules);
    }

}

Spark.init()

