define("todos/app",["exports","ember","ember/resolver","ember-data","ember/load-initializers","todos/config/environment"],function(e,t,a,n,r,d){"use strict";var i;t["default"].MODEL_FACTORY_INJECTIONS=!0,i=t["default"].Application.extend({modulePrefix:d["default"].modulePrefix,podModulePrefix:d["default"].podModulePrefix,Resolver:a["default"],ApplicationAdapter:n["default"].LSAdapter.extend({namespace:"todos"})}),r["default"](i,d["default"].modulePrefix),e["default"]=i}),define("todos/components/edit-todo",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].TextField.extend({didInsertElement:function(){this.$().focus()}})}),define("todos/controllers/array",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller}),define("todos/controllers/object",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller}),define("todos/controllers/todo-item",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({actions:{editTodo:function(){this.set("isEditing",!0)},saveChanges:function(){this.get("model.title").trim().length?(this.model.save(),this.set("isEditing",!1)):this.send("removeTodo")},removeTodo:function(){this.model.destroyRecord(),this.set("isEditing",!1)},details:function(){this.get("model.isCompleted")||this.transitionToRoute("todo",this.get("model"))},onClick:function(){var e=this.get("clickEvent");null===e?(e=t["default"].run.later(this,function(){this.send("details"),this.set("clickEvent",null)},300),this.set("clickEvent",e)):(t["default"].run.cancel(e),this.set("clickEvent",null),this.send("editTodo"))}},clickEvent:null,isEditing:!1,isCompleted:function(e,t){return arguments.length>1&&(this.set("model.isCompleted",t),this.model.save()),this.get("model.isCompleted")}.property("model.isCompleted")})}),define("todos/controllers/todo",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({actions:{editTodo:function(){this.set("isEditing",!0)},saveChanges:function(){this.get("model.title").trim().length?(this.model.save(),this.set("isEditing",!1)):this.send("removeTodo")},removeTodo:function(){this.model.destroyRecord(),this.set("isEditing",!1),this.send("back")},back:function(){window.history.back()},increase:function(){var e=parseInt(t["default"].$("textarea.details").css("font-size"));t["default"].$("textarea.details").css("font-size",e+2+"px")},decrease:function(){var e=parseInt(t["default"].$("textarea.details").css("font-size"));t["default"].$("textarea.details").css("font-size",e-2+"px")}},isEditing:!1,isCompleted:function(e,t){return arguments.length>1&&(this.set("model.isCompleted",t),this.model.save()),this.get("model.isCompleted")}.property("model.isCompleted")})}),define("todos/controllers/todos",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].ArrayController.extend({actions:{createTodo:function(){if(this.get("newTitle").trim()){var e=this.store.createRecord("todo",{title:this.get("newTitle"),isCompleted:!1});e.save(),this.set("newTitle","")}},clearCompleted:function(){this.filterBy("isCompleted",!0).forEach(function(e){e.destroyRecord()})}},remaining:function(){var e=this.filterBy("isCompleted",!1).length;return e}.property("@each.isCompleted"),completed:function(){var e=this.filterBy("isCompleted",!0).length;return e}.property("@each.isCompleted"),hasCompleted:function(){return this.get("completed")>0}.property("completed"),inflection:function(){return 1===this.get("remaining")?"item left":"items left"}.property("remaining"),areAllCompleted:function(e,t){arguments.length>1&&(this.setEach("isCompleted",t),this.invoke("save"));var a=this.filterBy("isCompleted",!1);return this.get("length")&&0===a.length}.property("@each.isCompleted")})}),define("todos/initializers/app-version",["exports","todos/config/environment","ember"],function(e,t,a){"use strict";var n=a["default"].String.classify,r=!1;e["default"]={name:"App Version",initialize:function(e,d){if(!r){var i=n(d.toString());a["default"].libraries.register(i,t["default"].APP.version),r=!0}}}}),define("todos/initializers/export-application-global",["exports","ember","todos/config/environment"],function(e,t,a){"use strict";function n(e,n){var r=t["default"].String.classify(a["default"].modulePrefix);a["default"].exportApplicationGlobal&&!window[r]&&(window[r]=n)}e.initialize=n,e["default"]={name:"export-application-global",initialize:n}}),define("todos/models/todo",["exports","ember-data"],function(e,t){"use strict";e["default"]=t["default"].Model.extend({title:t["default"].attr("string"),isCompleted:t["default"].attr("boolean"),details:t["default"].attr("string")})}),define("todos/router",["exports","ember","todos/config/environment"],function(e,t,a){"use strict";var n=t["default"].Router.extend({location:a["default"].locationType});n.map(function(){this.resource("todos",{path:"/"},function(){this.route("active"),this.route("completed")}),this.route("todo",{path:"/todo/:id"})}),e["default"]=n}),define("todos/routes/todo",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(e){return this.store.find("todo",e.id)}})}),define("todos/routes/todos/active",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(){return this.get("store").filter("todo",function(e){return!e.get("isCompleted")})},controllerName:"todos"})}),define("todos/routes/todos/completed",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(){return this.store.filter("todo",function(e){return e.get("isCompleted")})},controllerName:"todos"})}),define("todos/routes/todos/index",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(){return this.store.find("todo")},controllerName:"todos"})}),define("todos/templates/application",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("All");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom;n.detectNamespace(a);var r;return t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(r=this.build(n),this.hasRendered?this.cachedFragment=r:this.hasRendered=!0),this.cachedFragment&&(r=n.cloneNode(this.cachedFragment,!0))):r=this.build(n),r}}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("Active");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom;n.detectNamespace(a);var r;return t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(r=this.build(n),this.hasRendered?this.cachedFragment=r:this.hasRendered=!0),this.cachedFragment&&(r=n.cloneNode(this.cachedFragment,!0))):r=this.build(n),r}}}(),a=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("Completed");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom;n.detectNamespace(a);var r;return t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(r=this.build(n),this.hasRendered?this.cachedFragment=r:this.hasRendered=!0),this.cachedFragment&&(r=n.cloneNode(this.cachedFragment,!0))):r=this.build(n),r}}}(),n=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("          ");e.appendChild(t,a);var a=e.createElement("button");e.setAttribute(a,"id","clear-completed");var n=e.createTextNode("Clear completed(");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode(")");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.element,i=r.content;n.detectNamespace(a);var o;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var c=n.childAt(o,[1]),l=n.createMorphAt(c,1,1);return d(t,c,e,"action",["clearCompleted"],{}),i(t,l,e,"completed"),o}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("section");e.setAttribute(a,"id","todoapp");var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("header");e.setAttribute(n,"id","header");var r=e.createTextNode("\n        ");e.appendChild(n,r);var r=e.createElement("h2"),d=e.createTextNode("todos");e.appendChild(r,d),e.appendChild(n,r);var r=e.createTextNode("\n    ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\n    ");e.appendChild(a,n);var n=e.createElement("section");e.setAttribute(n,"id","main");var r=e.createTextNode("\n      ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\n    ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\n    ");e.appendChild(a,n);var n=e.createElement("section");e.setAttribute(n,"id","footer");var r=e.createTextNode("\n        ");e.appendChild(n,r);var r=e.createElement("span");e.setAttribute(r,"id","todo-count");var d=e.createTextNode("\n            ");e.appendChild(r,d);var d=e.createElement("strong"),i=e.createComment("");e.appendChild(d,i),e.appendChild(r,d);var d=e.createTextNode("\n          ");e.appendChild(r,d);var d=e.createComment("");e.appendChild(r,d);var d=e.createTextNode("\n        ");e.appendChild(r,d),e.appendChild(n,r);var r=e.createTextNode("\n        ");e.appendChild(n,r);var r=e.createElement("ul");e.setAttribute(r,"id","filter");var d=e.createTextNode("\n            ");e.appendChild(r,d);var d=e.createComment('<li class="active">All</li>');e.appendChild(r,d);var d=e.createTextNode("\n            ");e.appendChild(r,d);var d=e.createElement("li"),i=e.createComment("");e.appendChild(d,i),e.appendChild(r,d);var d=e.createTextNode("\n            ");e.appendChild(r,d);var d=e.createComment("<li>Active</li>");e.appendChild(r,d);var d=e.createTextNode("\n            ");e.appendChild(r,d);var d=e.createElement("li"),i=e.createComment("");e.appendChild(d,i),e.appendChild(r,d);var d=e.createTextNode("\n            ");e.appendChild(r,d);var d=e.createComment("<li>Completed</li>");e.appendChild(r,d);var d=e.createTextNode("\n            ");e.appendChild(r,d);var d=e.createElement("li"),i=e.createComment("");e.appendChild(d,i),e.appendChild(r,d);var d=e.createTextNode("\n        ");e.appendChild(r,d),e.appendChild(n,r);var r=e.createTextNode("\n\n");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("    ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("footer");e.setAttribute(a,"id","info");var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("p"),r=e.createTextNode("Double click to edit a todo");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("p"),r=e.createTextNode("Created by Yuxin Chen, last updated July 10, 2015");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");return e.appendChild(a,n),e.appendChild(t,a),t},render:function(r,d,i){var o=d.dom,c=d.hooks,l=c.content,s=c.block,h=c.get;o.detectNamespace(i);var m;d.useFragmentCache&&o.canClone?(null===this.cachedFragment&&(m=this.build(o),this.hasRendered?this.cachedFragment=m:this.hasRendered=!0),this.cachedFragment&&(m=o.cloneNode(this.cachedFragment,!0))):m=this.build(o);var u=o.childAt(m,[0]),p=o.childAt(u,[5]),v=o.childAt(p,[1]),C=o.childAt(p,[3]),f=o.createMorphAt(o.childAt(u,[3]),1,1),g=o.createMorphAt(o.childAt(v,[1]),0,0),b=o.createMorphAt(v,3,3),x=o.createMorphAt(o.childAt(C,[3]),0,0),T=o.createMorphAt(o.childAt(C,[7]),0,0),F=o.createMorphAt(o.childAt(C,[11]),0,0),N=o.createMorphAt(p,5,5);return l(d,f,r,"outlet"),l(d,g,r,"remaining"),l(d,b,r,"inflection"),s(d,x,r,"link-to",["todos.index"],{},e,null),s(d,T,r,"link-to",["todos.active"],{},t,null),s(d,F,r,"link-to",["todos.completed"],{},a,null),s(d,N,r,"if",[h(d,r,"hasCompleted")],{},n,null),m}}}())}),define("todos/templates/components/edit-todo",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.content;n.detectNamespace(a);var i;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(i=this.build(n),this.hasRendered?this.cachedFragment=i:this.hasRendered=!0),this.cachedFragment&&(i=n.cloneNode(this.cachedFragment,!0))):i=this.build(n);var o=n.createMorphAt(i,0,0,a);return n.insertBoundary(i,0),d(t,o,e,"yield"),i}}}())}),define("todos/templates/todo-item",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("    ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n      ");e.appendChild(t,a);var a=e.createComment("TWO action='' on='' ARE NOT ALLOWED ");e.appendChild(t,a);var a=e.createTextNode("\n\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.get,i=r.inline;n.detectNamespace(a);var o;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var c=n.createMorphAt(o,1,1,a);return i(t,c,e,"edit-todo",[],{type:"text","class":"todo",value:d(t,e,"model.title"),"insert-newline":"saveChanges","focus-out":"saveChanges"}),o}}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("      ");e.appendChild(t,a);var a=e.createElement("label"),n=e.createTextNode("\n        ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.element,i=r.content;n.detectNamespace(a);var o;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var c=n.childAt(o,[1]),l=n.createMorphAt(c,1,1);return d(t,c,e,"bind-attr",[],{"class":":todo model.isCompleted:completed"}),d(t,c,e,"action",["onClick"],{on:"click"}),i(t,l,e,"model.title"),o}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("li"),n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createComment('<input type="checkbox" class="toggle" />');e.appendChild(a,n);var n=e.createTextNode("\n  ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode("\n\n");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("button");e.setAttribute(n,"class","destroy"),e.appendChild(a,n);var n=e.createTextNode("\n");return e.appendChild(a,n),e.appendChild(t,a),t},render:function(a,n,r){var d=n.dom,i=n.hooks,o=i.element,c=i.get,l=i.inline,s=i.block;d.detectNamespace(r);var h;n.useFragmentCache&&d.canClone?(null===this.cachedFragment&&(h=this.build(d),this.hasRendered?this.cachedFragment=h:this.hasRendered=!0),this.cachedFragment&&(h=d.cloneNode(this.cachedFragment,!0))):h=this.build(d);var m=d.childAt(h,[0]),u=d.childAt(m,[7]),p=d.createMorphAt(m,3,3),v=d.createMorphAt(m,5,5);return o(n,m,a,"bind-attr",[],{"class":"model.isCompleted:completed"}),l(n,p,a,"input",[],{type:"checkbox","class":"toggle",checked:c(n,a,"isCompleted")}),s(n,v,a,"if",[c(n,a,"isEditing")],{},e,t),o(n,u,a,"action",["removeTodo"],{}),h}}}())}),define("todos/templates/todo",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("    ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n      ");e.appendChild(t,a);var a=e.createComment("TWO action='' on='' ARE NOT ALLOWED ");e.appendChild(t,a);var a=e.createTextNode("\n\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.get,i=r.inline;n.detectNamespace(a);var o;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var c=n.createMorphAt(o,1,1,a);return i(t,c,e,"edit-todo",[],{type:"text","class":"title",value:d(t,e,"model.title"),"insert-newline":"saveChanges","focus-out":"saveChanges"}),o}}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("      ");e.appendChild(t,a);var a=e.createElement("label"),n=e.createTextNode("\n        ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.element,i=r.content;n.detectNamespace(a);var o;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var c=n.childAt(o,[1]),l=n.createMorphAt(c,1,1);return d(t,c,e,"bind-attr",[],{"class":":title model.isCompleted:completed"}),d(t,c,e,"action",["editTodo"],{on:"doubleClick"}),i(t,l,e,"model.title"),o}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("div"),n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createComment('<input type="checkbox" class="toggle" />');e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("input");e.setAttribute(n,"type","checkbox"),e.setAttribute(n,"class","back"),e.appendChild(a,n);var n=e.createTextNode("\n\n");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("button");e.setAttribute(n,"class","destroy"),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","details");var n=e.createTextNode("\n  ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode("\n\n    ");e.appendChild(a,n);var n=e.createElement("button");e.setAttribute(n,"id","increase"),e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("button");e.setAttribute(n,"id","decrease"),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(a,n,r){var d=n.dom,i=n.hooks,o=i.element,c=i.get,l=i.block,s=i.inline;d.detectNamespace(r);var h;n.useFragmentCache&&d.canClone?(null===this.cachedFragment&&(h=this.build(d),this.hasRendered?this.cachedFragment=h:this.hasRendered=!0),this.cachedFragment&&(h=d.cloneNode(this.cachedFragment,!0))):h=this.build(d);var m=d.childAt(h,[1]),u=d.childAt(m,[3]),p=d.childAt(m,[7]),v=d.childAt(h,[3]),C=d.childAt(v,[3]),f=d.childAt(v,[5]),g=d.createMorphAt(m,5,5),b=d.createMorphAt(v,1,1);return o(n,m,a,"bind-attr",[],{"class":":detail-header model.isCompleted:completed"}),o(n,u,a,"action",["back"],{}),l(n,g,a,"if",[c(n,a,"isEditing")],{},e,t),o(n,p,a,"action",["removeTodo"],{}),s(n,b,a,"textarea",[],{"class":"details",type:"text",value:c(n,a,"model.details"),rows:"10","focus-out":"saveChanges"}),o(n,C,a,"action",["increase"],{}),o(n,f,a,"action",["decrease"],{}),h}}}())}),define("todos/templates/todos",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"id","main-header");var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createComment('<input type="checkbox" class="toggle-all" />');e.appendChild(a,n);var n=e.createTextNode("\n  ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode("\n\n  ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createComment('WHY THIS NOT WORK??? on="focusOut"');e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("ul");e.setAttribute(a,"id","todo-list");var n=e.createTextNode("\n  ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.get,i=r.inline,o=r.content;n.detectNamespace(a);var c;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(c=this.build(n),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=n.cloneNode(this.cachedFragment,!0))):c=this.build(n);var l=n.childAt(c,[1]),s=n.createMorphAt(l,3,3),h=n.createMorphAt(l,5,5),m=n.createMorphAt(n.childAt(c,[3]),1,1);return i(t,s,e,"input",[],{id:"toggle-all",type:"checkbox",classBinding:":toggle-all areAllCompleted:completed",checked:d(t,e,"areAllCompleted")}),i(t,h,e,"input",[],{id:"new-todo",type:"text",value:d(t,e,"newTitle"),placeholder:"What needs to be done",action:"createTodo"}),o(t,m,e,"outlet"),c}}}())}),define("todos/templates/todos/active",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("  ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.get,i=r.inline;n.detectNamespace(a);var o;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var c=n.createMorphAt(o,1,1,a);return i(t,c,e,"render",["todoItem",d(t,e,"todo")],{}),o}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createComment("");return e.appendChild(t,a),t},render:function(t,a,n){var r=a.dom,d=a.hooks,i=d.get,o=d.block;r.detectNamespace(n);var c;a.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(c=this.build(r),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=r.cloneNode(this.cachedFragment,!0))):c=this.build(r);var l=r.createMorphAt(c,0,0,n);return r.insertBoundary(c,null),r.insertBoundary(c,0),o(a,l,t,"each",[i(a,t,"model")],{keyword:"todo"},e,null),c}}}())}),define("todos/templates/todos/completed",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("  ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.get,i=r.inline;n.detectNamespace(a);var o;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var c=n.createMorphAt(o,1,1,a);return i(t,c,e,"render",["todoItem",d(t,e,"todo")],{}),o}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createComment("");return e.appendChild(t,a),t},render:function(t,a,n){var r=a.dom,d=a.hooks,i=d.get,o=d.block;r.detectNamespace(n);var c;a.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(c=this.build(r),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=r.cloneNode(this.cachedFragment,!0))):c=this.build(r);var l=r.createMorphAt(c,0,0,n);return r.insertBoundary(c,null),r.insertBoundary(c,0),o(a,l,t,"each",[i(a,t,"model")],{keyword:"todo"},e,null),c}}}())}),define("todos/templates/todos/index",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("  ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var n=t.dom,r=t.hooks,d=r.get,i=r.inline;n.detectNamespace(a);var o;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var c=n.createMorphAt(o,1,1,a);return i(t,c,e,"render",["todoItem",d(t,e,"todo")],{}),o}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createComment("");return e.appendChild(t,a),t},render:function(t,a,n){var r=a.dom,d=a.hooks,i=d.get,o=d.block;r.detectNamespace(n);var c;a.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(c=this.build(r),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=r.cloneNode(this.cachedFragment,!0))):c=this.build(r);var l=r.createMorphAt(c,0,0,n);return r.insertBoundary(c,null),r.insertBoundary(c,0),o(a,l,t,"each",[i(a,t,"model")],{keyword:"todo"},e,null),c}}}())}),define("todos/config/environment",["ember"],function(e){var t="todos";try{var a=t+"/config/environment",n=e["default"].$('meta[name="'+a+'"]').attr("content"),r=JSON.parse(unescape(n));return{"default":r}}catch(d){throw new Error('Could not read config from meta tag with name "'+a+'".')}}),runningTests?require("todos/tests/test-helper"):require("todos/app")["default"].create({name:"todos",version:"0.0.0.65b133b0"});