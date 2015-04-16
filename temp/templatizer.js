(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root["App"] === 'undefined' || root["App"] !== Object(root["App"])) {
        throw new Error('templatizer: window["App"] does not exist or is not an object');
    } else {
        root["App"].templatizer = factory();
    }
}(this, function () {
    var jade=function(){function e(e){return null!=e&&""!==e}function n(t){return(Array.isArray(t)?t.map(n):t&&"object"==typeof t?Object.keys(t).filter(function(e){return t[e]}):[t]).filter(e).join(" ")}var t={};return t.merge=function r(n,t){if(1===arguments.length){for(var a=n[0],i=1;i<n.length;i++)a=r(a,n[i]);return a}var o=n["class"],s=t["class"];(o||s)&&(o=o||[],s=s||[],Array.isArray(o)||(o=[o]),Array.isArray(s)||(s=[s]),n["class"]=o.concat(s).filter(e));for(var l in t)"class"!=l&&(n[l]=t[l]);return n},t.joinClasses=n,t.cls=function(e,r){for(var a=[],i=0;i<e.length;i++)a.push(r&&r[i]?t.escape(n([e[i]])):n(e[i]));var o=n(a);return o.length?' class="'+o+'"':""},t.style=function(e){return e&&"object"==typeof e?Object.keys(e).map(function(n){return n+":"+e[n]}).join(";"):e},t.attr=function(e,n,r,a){return"style"===e&&(n=t.style(n)),"boolean"==typeof n||null==n?n?" "+(a?e:e+'="'+e+'"'):"":0==e.indexOf("data")&&"string"!=typeof n?(-1!==JSON.stringify(n).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),n&&"function"==typeof n.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+e+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'"):r?(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+t.escape(n)+'"'):(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+n+'"')},t.attrs=function(e,r){var a=[],i=Object.keys(e);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],l=e[s];"class"==s?(l=n(l))&&a.push(" "+s+'="'+l+'"'):a.push(t.attr(s,l,!1,r))}return a.join("")},t.escape=function(e){var n=String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+e?e:n},t.rethrow=function a(e,n,t,r){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||r))throw e.message+=" on line "+t,e;try{r=r||require("fs").readFileSync(n,"utf8")}catch(i){a(e,null,t)}var o=3,s=r.split("\n"),l=Math.max(t-o,0),f=Math.min(s.length,t+o),o=s.slice(l,f).map(function(e,n){var r=n+l+1;return(r==t?"  > ":"    ")+r+"| "+e}).join("\n");throw e.path=n,e.message=(n||"Jade")+":"+t+"\n"+o+"\n\n"+e.message,e},t}(); 

    var templatizer = {};


    // _syntax.jade compiled template
    templatizer["_syntax"] = function tmpl__syntax() {
        return "<p>yo dawg</p>";
    };

    // docs.jade compiled template
    templatizer["docs"] = function tmpl_docs(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(comments, id, ignore, title, undefined) {
            buf.push('<!DOCTYPE html><html><head><title>Connect - High quality middleware for node.js</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" href="style.css"><script src="jquery.js"></script><script src="docs.js"></script></head><body><div id="content"><h1>Connect</h1>');
            (function() {
                var $obj = comments;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var comment = $obj[$index];
                        if (!ignore(comment)) {
                            buf.push("<div" + jade.attr("id", id(comment), true, true) + ' class="comment"><h2>' + jade.escape(null == (jade_interp = title(comment)) ? "" : jade_interp) + '</h2><div class="description">' + (null == (jade_interp = comment.description.full) ? "" : jade_interp) + "</div>");
                            if (comment.tags.length) {
                                buf.push('<ul class="tags">');
                                (function() {
                                    var $obj = comment.tags;
                                    if ("number" == typeof $obj.length) {
                                        for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                            var tag = $obj[$index];
                                            if (tag.types) {
                                                if ("param" == tag.type) {
                                                    buf.push("<li><em>" + jade.escape((jade_interp = tag.types.join(" | ")) == null ? "" : jade_interp) + "</em> " + jade.escape((jade_interp = tag.name) == null ? "" : jade_interp) + " " + jade.escape((jade_interp = tag.description) == null ? "" : jade_interp) + "</li>");
                                                } else {
                                                    buf.push("<li>returns <em>" + jade.escape((jade_interp = tag.types.join(" | ")) == null ? "" : jade_interp) + "</em> " + jade.escape((jade_interp = tag.description) == null ? "" : jade_interp) + "</li>");
                                                }
                                            } else if (tag.name) {
                                                buf.push("<li>" + jade.escape((jade_interp = tag.name) == null ? "" : jade_interp) + " " + jade.escape((jade_interp = tag.description) == null ? "" : jade_interp) + "</li>");
                                            }
                                        }
                                    } else {
                                        var $l = 0;
                                        for (var $index in $obj) {
                                            $l++;
                                            var tag = $obj[$index];
                                            if (tag.types) {
                                                if ("param" == tag.type) {
                                                    buf.push("<li><em>" + jade.escape((jade_interp = tag.types.join(" | ")) == null ? "" : jade_interp) + "</em> " + jade.escape((jade_interp = tag.name) == null ? "" : jade_interp) + " " + jade.escape((jade_interp = tag.description) == null ? "" : jade_interp) + "</li>");
                                                } else {
                                                    buf.push("<li>returns <em>" + jade.escape((jade_interp = tag.types.join(" | ")) == null ? "" : jade_interp) + "</em> " + jade.escape((jade_interp = tag.description) == null ? "" : jade_interp) + "</li>");
                                                }
                                            } else if (tag.name) {
                                                buf.push("<li>" + jade.escape((jade_interp = tag.name) == null ? "" : jade_interp) + " " + jade.escape((jade_interp = tag.description) == null ? "" : jade_interp) + "</li>");
                                            }
                                        }
                                    }
                                }).call(this);
                                buf.push("</ul>");
                            }
                            if (comment.code) {
                                buf.push("<h3>Source</h3><pre><code>" + (null == (jade_interp = comment.code) ? "" : jade_interp) + "</code></pre>");
                            }
                            buf.push("</div>");
                        }
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var comment = $obj[$index];
                        if (!ignore(comment)) {
                            buf.push("<div" + jade.attr("id", id(comment), true, true) + ' class="comment"><h2>' + jade.escape(null == (jade_interp = title(comment)) ? "" : jade_interp) + '</h2><div class="description">' + (null == (jade_interp = comment.description.full) ? "" : jade_interp) + "</div>");
                            if (comment.tags.length) {
                                buf.push('<ul class="tags">');
                                (function() {
                                    var $obj = comment.tags;
                                    if ("number" == typeof $obj.length) {
                                        for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                            var tag = $obj[$index];
                                            if (tag.types) {
                                                if ("param" == tag.type) {
                                                    buf.push("<li><em>" + jade.escape((jade_interp = tag.types.join(" | ")) == null ? "" : jade_interp) + "</em> " + jade.escape((jade_interp = tag.name) == null ? "" : jade_interp) + " " + jade.escape((jade_interp = tag.description) == null ? "" : jade_interp) + "</li>");
                                                } else {
                                                    buf.push("<li>returns <em>" + jade.escape((jade_interp = tag.types.join(" | ")) == null ? "" : jade_interp) + "</em> " + jade.escape((jade_interp = tag.description) == null ? "" : jade_interp) + "</li>");
                                                }
                                            } else if (tag.name) {
                                                buf.push("<li>" + jade.escape((jade_interp = tag.name) == null ? "" : jade_interp) + " " + jade.escape((jade_interp = tag.description) == null ? "" : jade_interp) + "</li>");
                                            }
                                        }
                                    } else {
                                        var $l = 0;
                                        for (var $index in $obj) {
                                            $l++;
                                            var tag = $obj[$index];
                                            if (tag.types) {
                                                if ("param" == tag.type) {
                                                    buf.push("<li><em>" + jade.escape((jade_interp = tag.types.join(" | ")) == null ? "" : jade_interp) + "</em> " + jade.escape((jade_interp = tag.name) == null ? "" : jade_interp) + " " + jade.escape((jade_interp = tag.description) == null ? "" : jade_interp) + "</li>");
                                                } else {
                                                    buf.push("<li>returns <em>" + jade.escape((jade_interp = tag.types.join(" | ")) == null ? "" : jade_interp) + "</em> " + jade.escape((jade_interp = tag.description) == null ? "" : jade_interp) + "</li>");
                                                }
                                            } else if (tag.name) {
                                                buf.push("<li>" + jade.escape((jade_interp = tag.name) == null ? "" : jade_interp) + " " + jade.escape((jade_interp = tag.description) == null ? "" : jade_interp) + "</li>");
                                            }
                                        }
                                    }
                                }).call(this);
                                buf.push("</ul>");
                            }
                            if (comment.code) {
                                buf.push("<h3>Source</h3><pre><code>" + (null == (jade_interp = comment.code) ? "" : jade_interp) + "</code></pre>");
                            }
                            buf.push("</div>");
                        }
                    }
                }
            }).call(this);
            buf.push('</div><ul id="menu">');
            (function() {
                var $obj = comments;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var comment = $obj[$index];
                        if (!ignore(comment)) {
                            buf.push("<li><a" + jade.attr("href", "#" + id(comment), true, true) + ">" + jade.escape(null == (jade_interp = title(comment)) ? "" : jade_interp) + "</a></li>");
                        }
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var comment = $obj[$index];
                        if (!ignore(comment)) {
                            buf.push("<li><a" + jade.attr("href", "#" + id(comment), true, true) + ">" + jade.escape(null == (jade_interp = title(comment)) ? "" : jade_interp) + "</a></li>");
                        }
                    }
                }
            }).call(this);
            buf.push("</ul></body></html>");
        }).call(this, "comments" in locals_for_with ? locals_for_with.comments : typeof comments !== "undefined" ? comments : undefined, "id" in locals_for_with ? locals_for_with.id : typeof id !== "undefined" ? id : undefined, "ignore" in locals_for_with ? locals_for_with.ignore : typeof ignore !== "undefined" ? ignore : undefined, "title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // index.jade compiled template
    templatizer["index"] = function tmpl_index() {
        return '<!DOCTYPE html(lang=\'en\')><head><title>Stylus</title><meta name="viewport" content="width=device-width, initial-scale=1"/><meta http-equiv="Content-Type" content="text/html;charset=utf-8"/><link rel="stylesheet" type="text/css" href="css/main.css"/></head><body><h1>Hello World</h1><a href="#syntax">Syntax</a><pre><code class="language-stylus">body\n  background red\n</code></pre><section data-content-block="data-content-block"></section><script src="bower_components/jquery/dist/jquery.min.js" type="text/javascript"></script><script src="js/lib/prism.js" type="text/javascript"></script><script src="js/app.js" type="text/javascript"></script><script src="temp/templatizer.js" type="text/javascript"></script></body>';
    };

    return templatizer;
}));