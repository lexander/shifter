FOO.add("uploader-html5",function(e,t){function i(e){i.superclass.constructor.apply(this,arguments)}var n=Y.substitute,r=Y.Uploader.Queue;Y.UploaderHTML5=Y.extend(i,Y.Widget,{_fileInputField:null,_buttonBinding:null,queue:null,initializer:function(){this._fileInputField=null,this.queue=null,this._buttonBinding=null,this._fileList=[],this.publish("fileselect"),this.publish("uploadstart"),this.publish("fileuploadstart"),this.publish("uploadprogress"),this.publish("totaluploadprogress"),this.publish("uploadcomplete"),this.publish("alluploadscomplete"),this.publish("uploaderror"),this.publish("dragenter"),this.publish("dragover"),this.publish("dragleave"),this.publish("drop")},renderUI:function(){var e=this.get("boundingBox"),t=this.get("contentBox"),n=this.get("selectFilesButton");n.setStyles({width:"100%",height:"100%"}),t.append(n),this._fileInputField=Y.Node.create(i.HTML5FILEFIELD_TEMPLATE),t.append(this._fileInputField)},bindUI:function(){this._bindSelectButton(),this._setMultipleFiles(),this._setFileFilters(),this._bindDropArea(),this._triggerEnabled(),this.after("multipleFilesChange",this._setMultipleFiles,this),this.after("fileFiltersChange",this._setFileFilters,this),this.after("enabledChange",this._triggerEnabled,this),this.after("selectFilesButtonChange",this._bindSelectButton,this),this.after("dragAndDropAreaChange",this._bindDropArea,this),this.after("tabIndexChange",function(e){this.get("selectFilesButton").set("tabIndex",this.get("tabIndex"))},this),this._fileInputField.on("change",this._updateFileList,this),this.get("selectFilesButton").set("tabIndex",this.get("tabIndex"))},_rebindFileField:function(){this._fileInputField.remove(!0),this._fileInputField=Y.Node.create(i.HTML5FILEFIELD_TEMPLATE),this.get("contentBox").append(this._fileInputField),this._fileInputField.on("change",this._updateFileList,this),this._setMultipleFiles(),this._setFileFilters()},_bindDropArea:function(e){var t=e||{prevVal:null};t.prevVal!==null&&(t.prevVal.detach("drop",this._ddEventHandler),t.prevVal.detach("dragenter",this._ddEventHandler),t.prevVal.detach("dragover",this._ddEventHandler),t.prevVal.detach("dragleave",this._ddEventHandler));var n=this.get("dragAndDropArea");n!==null&&(n.on("drop",this._ddEventHandler,this),n.on("dragenter",this._ddEventHandler,this),n.on("dragover",this._ddEventHandler,this),n.on("dragleave",this._ddEventHandler,this))},_bindSelectButton:function(){this._buttonBinding=this.get("selectFilesButton").on("click",this.openFileSelectDialog,this)},_ddEventHandler:function(e){e.stopPropagation(),e.preventDefault();switch(e.type){case"dragenter":this.fire("dragenter");break;case"dragover":this.fire("dragover");break;case"dragleave":this.fire("dragleave");break;case"drop":var t=e._event.dataTransfer.files,n=[],r=this.get("fileFilterFunction");r?Y.each(t,function(e){var t=new Y.FileHTML5(e);r(t)&&n.push(t)}):Y.each(t,function(e){n.push(new Y.FileHTML5(e))});if(n.length>0){var i=this.get("fileList");this.set("fileList",this.get("appendNewFiles")?i.concat(n):n),this.fire("fileselect",{fileList:n})}this.fire("drop")}},_setButtonClass:function(e,t){t?this.get("selectFilesButton").addClass(this.get("buttonClassNames")[e]):this.get("selectFilesButton").removeClass(this.get("buttonClassNames")[e])},_setMultipleFiles:function(){this.get("multipleFiles")===!0?this._fileInputField.set("multiple","multiple"):this._fileInputField.set("multiple","")},_setFileFilters:function(){this.get("fileFilters").length>0?this._fileInputField.set("accept",this.get("fileFilters").join(",")):this._fileInputField.set("accept","")},_triggerEnabled:function(){this.get("enabled")&&this._buttonBinding===null?(this._bindSelectButton(),this._setButtonClass("disabled",!1),this.get("selectFilesButton").setAttribute("aria-disabled","false")):!this.get("enabled")&&this._buttonBinding&&(this._buttonBinding.detach(),this._buttonBinding=null,this._setButtonClass("disabled",!0),this.get("selectFilesButton").setAttribute("aria-disabled","true"))},_getFileList:function(e){return this._fileList.concat()},_setFileList:function(e){return this._fileList=e.concat(),this._fileList.concat()},_updateFileList:function(e){var t=e.target.getDOMNode().files,n=[],r=this.get("fileFilterFunction");r?Y.each(t,function(e){var t=new Y.FileHTML5(e);r(t)&&n.push(t)}):Y.each(t,function(e){n.push(new Y.FileHTML5(e))});if(n.length>0){var i=this.get("fileList");this.set("fileList",this.get("appendNewFiles")?i.concat(n):n),this.fire("fileselect",{fileList:n})}this._rebindFileField()},_uploadEventHandler:function(e){switch(e.type){case"file:uploadstart":this.fire("fileuploadstart",e);break;case"file:uploadprogress":this.fire("uploadprogress",e);break;case"uploaderqueue:totaluploadprogress":this.fire("totaluploadprogress",e);break;case"file:uploadcomplete":this.fire("uploadcomplete",e);break;case"uploaderqueue:alluploadscomplete":this.queue=null,this.fire("alluploadscomplete",e);break;case"file:uploaderror":case"uploaderqueue:uploaderror":this.fire("uploaderror",e);break;case"file:uploadcancel":case"uploaderqueue:uploadcancel":this.fire("uploadcancel",e)}},openFileSelectDialog:function(){var e=this._fileInputField.getDOMNode();e.click&&e.click()},upload:function(e,t,n){var r=t||this.get("uploadURL"),i=n||this.get("postVarsPerFile"),s=e.get("id");i=i.hasOwnProperty(s)?i[s]:i,e instanceof Y.FileHTML5&&(e.on("uploadstart",this._uploadEventHandler,this),e.on("uploadprogress",this._uploadEventHandler,this),e.on("uploadcomplete",this._uploadEventHandler,this),e.on("uploaderror",this._uploadEventHandler,this),e.on("uploadcancel",this._uploadEventHandler,this),e.startUpload(r,i,this.get("fileFieldName")))},uploadAll:function(e,t){this.uploadThese(this.get("fileList"),e,t)},uploadThese:function(e,t,n){if(!this.queue){var i=t||this.get("uploadURL"),s=n||this.get("postVarsPerFile");this.queue=new r({simUploads:this.get("simLimit"),errorAction:this.get("errorAction"),fileFieldName:this.get("fileFieldName"),fileList:e,uploadURL:i,perFileParameters:s,retryCount:this.get("retryCount"),uploadHeaders:this.get("uploadHeaders"),withCredentials:this.get("withCredentials")}),this.queue.on("uploadstart",this._uploadEventHandler,this),this.queue.on("uploadprogress",this._uploadEventHandler,this),this.queue.on("totaluploadprogress",this._uploadEventHandler,this),this.queue.on("uploadcomplete",this._uploadEventHandler,this),this.queue.on("alluploadscomplete",this._uploadEventHandler,this),this.queue.on("uploadcancel",this._uploadEventHandler,this),this.queue.on("uploaderror",this._uploadEventHandler,this),this.queue.startUpload(),this.fire("uploadstart")}else this.queue._currentState===r.UPLOADING&&(this.queue.set("perFileParameters",this.get("postVarsPerFile")),Y.each(e,function(e){this.queue.addToQueueBottom(e)},this))}},{HTML5FILEFIELD_TEMPLATE:"<input type='file' style='visibility:hidden; width:0px; height: 0px;'>",SELECT_FILES_BUTTON:"<button type='button' class='yui3-button' role='button' aria-label='{selectButtonLabel}' tabindex='{tabIndex}'>{selectButtonLabel}</button>",TYPE:"html5",NAME:"uploader",ATTRS:{appendNewFiles:{value:!0},buttonClassNames:{value:{hover:"yui3-button-hover",active:"yui3-button-active",disabled:"yui3-button-disabled",focus:"yui3-button-selected"}},dragAndDropArea:{value:null,setter:function(e){return Y.one(e)}},enabled:{value:!0},errorAction:{value:"continue",validator:function(e,t){return e===r.CONTINUE||e===r.STOP||e===r.RESTART_ASAP||e===r.RESTART_AFTER}},fileFilters:{value:[]},fileFilterFunction:{value:null},fileFieldName:{value:"Filedata"},fileList:{value:[],getter:"_getFileList",setter:"_setFileList"},multipleFiles:{value:!1},postVarsPerFile:{value:{}},selectButtonLabel:{value:"Select Files"},selectFilesButton:{valueFn:function(){return Y.Node.create(n(Y.UploaderHTML5.SELECT_FILES_BUTTON,{selectButtonLabel:this.get("selectButtonLabel"),tabIndex:this.get("tabIndex")}))}},simLimit:{value:2,validator:function(e,t){return e>=1&&e<=5}},uploadURL:{value:""},uploadHeaders:{value:{}},withCredentials:{value:!0},retryCount:{value:3}}}),Y.UploaderHTML5.Queue=r},"@VERSION@",{requires:["widget","node-event-simulate","substitute","file-html5","uploader-queue"]});