exports.ids=[14],exports.modules={158:function(e,t,o){var content=o(203);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);var r=o(4).default;e.exports.__inject__=function(e){r("52541574",content,!0,e)}},159:function(e,t,o){var content=o(205);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);var r=o(4).default;e.exports.__inject__=function(e){r("c0bad2a8",content,!0,e)}},202:function(e,t,o){"use strict";o.r(t);var r=o(158),l=o.n(r);for(var n in r)"default"!==n&&function(e){o.d(t,e,(function(){return r[e]}))}(n);t.default=l.a},203:function(e,t,o){(e.exports=o(3)(!1)).push([e.i,".WriteWrap[data-v-267d70f2]{padding-top:20px}.WriteWrap .ArticeTitle .title-input[data-v-267d70f2]{margin:0;padding:0;font-size:32px;color:#000;border:none;outline:none;resize:none;overflow:hidden;width:100%;height:40px;background:#f6f7f8;text-align:center}.ArticleSet[data-v-267d70f2]{padding:20px 0;text-align:right}.ArticleSet .issue[data-v-267d70f2]{background:#e2e6ea;border-color:#e2e6ea;font-size:16px}.mask[data-v-267d70f2]{position:fixed;left:0;top:0;right:0;bottom:0;z-index:9999;background-color:rgba(55,55,55,.6)}",""])},204:function(e,t,o){"use strict";o.r(t);var r=o(159),l=o.n(r);for(var n in r)"default"!==n&&function(e){o.d(t,e,(function(){return r[e]}))}(n);t.default=l.a},205:function(e,t,o){(e.exports=o(3)(!1)).push([e.i,".mavonEditor{width:100%;height:100%;padding-top:30px}.mavonEditor .v-note-wrapper{z-index:0;min-height:500px;max-height:500px}.mavonEditor ::v-deep.hljs span{font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace!important}.upload-img{background:#fff;border:1px dashed #dcdee2;border-radius:4px;text-align:center;cursor:pointer;position:relative;overflow:hidden;width:150px;height:150px;line-height:150px;background-repeat:no-repeat!important;background-size:cover!important}.ItemTitle{margin:10px 0}",""])},248:function(e,t,o){"use strict";o.r(t);var r=o(7),article=o(29),l=o(8),n=o(30),d={layout:"blog",data:()=>({baseUrl:"https://api.yjdzm.com",uploadType:["image/png","image/jpeg","image/jpg","image/gif"],coverUrl:"",draftId:"",source:"",content:"",isShow:!1,language:"Vue",title:"",toolbars:{bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,superscript:!0,subscript:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!0,code:!0,table:!0,readmodel:!0,undo:!0,redo:!0,trash:!0,alignleft:!0,aligncenter:!0,alignright:!0,subfield:!0,preview:!0},loading:!1,SelectData:[{value:"Vue",label:"Vue"},{value:"React",label:"React"},{value:"JavaScript",label:"JavaScript"},{value:"小程序",label:"小程序"},{value:"移动端",label:"移动端"},{value:"Node",label:"Node"},{value:"TypeScript",label:"TypeScript"},{value:"Flutter",label:"Flutter"}]}),methods:{upLoadsuccess(e){this.loading=!1,200===e.code&&(this.coverUrl=e.data.url)},checkFile(e){if(this.loading=!0,!this.uploadType.some(t=>t===e.type&&e.size/1024/1024<=2))return this.$Message.error("文件格式有误或过大"),this.loading=!1,!1},$imgAdd(e,t){let o=new FormData;o.append("file",t),Object(l.h)(o).then(t=>{200===t.code&&this.$refs.md.$img2Url(e,t.data.url)})},setArticleDetail(){this.source&&this.title?this.isShow=!0:this.$Message.error("内容或者标题不能为空")},publish(e){this.loading=!0;let t={source:this.source,content:this.content,category:this.language,title:this.title,status:e,cover:this.coverUrl};this.draftId?Object(article.j)({id:this.draftId},t).then(e=>{200===e.code&&(this.loading=!1),this.isShow=!1,this.$Message.success("修改成功"),this.$router.replace("/learn/article")}):Object(article.l)(t).then(t=>{200===t.code&&(this.loading=!1,this.isShow=!1,this.$Message.success("发布成功"),"online"===e?this.$router.replace("/learn/article"):this.$router.replace("/draft"))})},changeValue(e,t){this.source=e,this.content=t}},components:{myButton:o(28).a,Modal:n.a},computed:{...Object(r.mapState)({userInfo:e=>e.login.userInfo}),...Object(r.mapState)({UserToken:e=>e.login.UserToken}),header(){return{Authorization:"Bearer "+this.UserToken}}},created(){this.draftId=this.$route.query.draftId,this.draftId&&Object(article.f)({id:this.draftId},{isDraft:1}).then(e=>{200===e.code&&(this.source=e.data.source),this.title=e.data.title,this.language=e.data.category,this.content=e.data.content,this.status=e.data.status,this.coverUrl=e.data.cover})},mounted(){this.UserToken||(this.$Message.error("需要登录才可以发布文章"),this.$router.replace("/login"))}},c=o(2);var component=Object(c.a)(d,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"WriteWrap"},[e._ssrNode('<div class="ArticeTitle" data-v-267d70f2><textarea placeholder="输入标题..." spellcheck="false" maxlength="30" rows="1" class="title-input" data-v-267d70f2>'+e._ssrEscape(e._s(e.title))+"</textarea></div> "),e._ssrNode('<div class="mavonEditor" data-v-267d70f2>',"</div>",[o("client-only",[o("mavon-editor",{ref:"md",attrs:{placeholder:"目前仅支持MakeDown语法, 创作完成, 点击右下方按钮发布",toolbars:e.toolbars},on:{imgAdd:e.$imgAdd,change:e.changeValue},model:{value:e.source,callback:function(t){e.source=t},expression:"source"}})],1)],1),e._ssrNode(" "),e._ssrNode('<div class="ArticleSet" data-v-267d70f2>',"</div>",[o("myButton",{staticClass:"issue",attrs:{size:"large",type:"success"},on:{click:e.setArticleDetail}},[e._v("\n            发布文章\n        ")])],1),e._ssrNode(" "),o("Modal",{attrs:{visible:e.isShow,mask:!0,line:!0,title:"文章细节选择",okText:"确定发布",cancleText:"存草稿"},on:{onOk:function(t){e.isShow=!1},onCancle:function(t){e.isShow=!1}}},[o("p",{staticClass:"ItemTitle"},[e._v("选择文章分类")]),e._v(" "),o("Select",{staticStyle:{width:"200px"},model:{value:e.language,callback:function(t){e.language=t},expression:"language"}},e._l(e.SelectData,(function(t){return o("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1),e._v(" "),o("p",{staticClass:"ItemTitle"},[e._v("文章封面")]),e._v(" "),o("Upload",{attrs:{action:e.baseUrl+"/upload",data:{dir:"cover/"},"show-upload-list":!1,"before-upload":e.checkFile,"on-success":e.upLoadsuccess,disabled:e.loading,headers:e.header,accept:""+e.uploadType.join(",")}},[o("div",{staticClass:"upload-img",style:{background:"url("+e.coverUrl+")"}})]),e._v(" "),o("template",{slot:"footer"},[o("myButton",{attrs:{loading:e.loading},on:{click:function(t){return e.publish("online")}}},[e._v("确定发布")]),e._v(" "),o("myButton",{attrs:{loading:e.loading},on:{click:function(t){return e.publish("draft")}}},[e._v("存草稿")])],1)],2)],2)}),[],!1,(function(e){var t=o(202);t.__inject__&&t.__inject__(e);var r=o(204);r.__inject__&&r.__inject__(e)}),"267d70f2","0c23d6b9");t.default=component.exports}};