exports.ids=[11],exports.modules={103:function(t,e,n){"use strict";var o={},r=n(1);var component=Object(r.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"main"},[e("Row",{staticClass:"content"},[e("Col",{staticStyle:{"border-radis":"10px"},attrs:{span:"17"}},[this._t("main")],2),this._v(" "),e("Col",{attrs:{span:"6",offset:"1"}},[this._t("side")],2)],1)],1)}),[],!1,(function(t){var e=n(96);e.__inject__&&e.__inject__(t)}),"60490932","1f481332");e.a=component.exports},108:function(t,e,n){"use strict";n.r(e);var o=n(98),r=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e.default=r.a},109:function(t,e,n){(t.exports=n(3)(!1)).push([t.i,".pinListView[data-v-329965e8],.pinListView .Item[data-v-329965e8]{margin-top:20px}.pinListView .Item .pin[data-v-329965e8]{background-color:#fff;border-radius:5px;box-shadow:0 1px 2px 0 rgba(0,0,0,.05);padding:20px}.pinListView .Item .pin .pinHeader[data-v-329965e8]{display:flex;align-items:center}.pinListView .Item .pin .pinHeader img[data-v-329965e8]{width:35px;height:35px;border-radius:50%}.pinListView .Item .pin .pinHeader .headerContent[data-v-329965e8]{font-size:14px;display:flex;flex-direction:column;margin-left:10px}.pinListView .Item .pin .pinContent[data-v-329965e8]{margin:10px 0 10px 40px;color:#000}.pinListView .Item .pin .pinContent .content[data-v-329965e8]{white-space:pre-wrap}.pinListView .Item .pin .pinImg[data-v-329965e8]{margin:10px 0 10px 40px}.pinListView .Item .pin .pinImg img[data-v-329965e8]{margin-left:4px}.pinListView .Item .pin .pinTopic[data-v-329965e8]{margin:10px 0 10px 40px}.pinListView .Item .pin .pinTopic .pinTopicTitle[data-v-329965e8]{font-size:13px;display:inline-block;line-height:22px;height:22px;padding:0 12px;border:1px solid #007fff;border-radius:14px;text-align:center;color:#007fff;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}",""])},110:function(t,e,n){"use strict";n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return l}));var o=n(2);const r=t=>o.a.httpServer({url:"/shorthand/publish",method:"post"},t),c=t=>o.a.httpServer({url:"/shorthand/list",method:"get"},t),l=t=>o.a.httpServer({url:"/shorthand/search",method:"get"},t)},112:function(t,e,n){"use strict";n.r(e);var o=n(99),r=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e.default=r.a},113:function(t,e,n){(t.exports=n(3)(!1)).push([t.i,".utilWrap[data-v-4ef607e4]{margin-top:20px;width:150px}.utilWrap .sideWrap[data-v-4ef607e4]{max-width:150px;border-radius:.2rem;background-color:#fff;transition:all .2s linear}.utilWrap .sideWrap .ContentWrap[data-v-4ef607e4]{height:100%;display:flex;flex-direction:column;text-align:center;padding:20px}.utilWrap .sideWrap .ContentWrap .sideItem[data-v-4ef607e4]{height:30px;font-size:15px;display:flex;justify-content:center;align-items:center;padding:0 10px}.utilWrap .searchWrap[data-v-4ef607e4]{position:fixed;margin-top:10px;max-width:150px}",""])},114:function(t,e,n){var content=n(148);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var o=n(4).default;t.exports.__inject__=function(t){o("5645f58c",content,!0,t)}},131:function(t,e,n){"use strict";n(41);var o=n(87),r=n.n(o),c={props:{images:{type:Array},trigger:{},options:{type:Object}},data:()=>({}),computed:{},methods:{createViewer(){this.$viewer&&this.$viewer.destroy(),this.$viewer=new r.a(this.$el,this.options),this.$emit("inited",this.$viewer)}},watch:{images(){this.$nextTick(()=>{this.createViewer()})},trigger:{handler:function(){this.$nextTick(()=>{this.createViewer()})},deep:!0},options:{handler:function(){this.$nextTick(()=>{this.createViewer()})},deep:!0}},mounted(){this.createViewer()},destroyed(){this.$viewer&&this.$viewer.destroy()}},l=n(1),d=Object(l.a)(c,(function(){var t=this.$createElement;return(this._self._c||t)("div",[this._t("default",null,{images:this.images,options:this.options})],2)}),[],!1,null,null,"27c39980").exports,h={props:{source:{type:Array}},components:{Viewer:d}};var v=Object(l.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pinListView"},[t._ssrNode('<ul class="pinList" data-v-329965e8>',"</ul>",t._l(t.source,(function(e,o){return t._ssrNode('<li class="Item" data-v-329965e8>',"</li>",[t._ssrNode('<div class="pin" data-v-329965e8>',"</div>",[t._ssrNode('<div class="pinHeader" data-v-329965e8>',"</div>",[t._ssrNode('<div class="userPopover" data-v-329965e8>',"</div>",[n("nuxt-link",{attrs:{to:"/home/"+e.user_info.id}},[n("img",{attrs:{src:e.user_info.avatar}})])],1),t._ssrNode(' <div class="headerContent" data-v-329965e8><p data-v-329965e8>'+t._ssrEscape(t._s(e.user_info.name))+"</p> <p data-v-329965e8>"+t._ssrEscape(t._s(t._f("dateFormat")(e.created)))+"</p></div>")],2),t._ssrNode(' <div class="pinContent" data-v-329965e8><span class="content" data-v-329965e8>'+t._ssrEscape(t._s(e.content))+"</span></div> "),t._ssrNode('<div class="pinImg" data-v-329965e8>',"</div>",[n("Viewer",{attrs:{images:e.imgData}},t._l(e.imgData,(function(t){return n("img",{key:t.index,attrs:{src:t,height:"100"}})})),0)],1),t._ssrNode(' <div class="pinTopic" data-v-329965e8><span class="pinTopicTitle" data-v-329965e8>'+t._ssrEscape(t._s(e.topic))+"</span></div>")],2)])})),0)])}),[],!1,(function(t){var e=n(108);e.__inject__&&e.__inject__(t)}),"329965e8","4097800d");e.a=v.exports},133:function(t,e,n){"use strict";var o={data:()=>({active:0,type:"",searchValue:"",showSearch:!0}),components:{myButton:n(26).a},props:{source:{type:Array},path:{type:String},search:{type:Function}},methods:{CateGoryArticle(t,e){this.active=t+1,this.$router.push({path:`${this.path}?${this.type}=${e}`})},searchShortList(){this.$router.push(`/search?topic=${this.searchValue}`)}},mounted(){"/learn/article"===this.path?this.type="category":this.type="topic"}},r=n(1);var component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"utilWrap"},[t._ssrNode("<div data-v-4ef607e4>","</div>",[t._ssrNode('<div style="position:fixed" data-v-4ef607e4>',"</div>",[t._ssrNode('<nav class="sideWrap" data-v-4ef607e4>',"</nav>",[t._ssrNode('<ul class="ContentWrap" data-v-4ef607e4>',"</ul>",[t._ssrNode("<p data-v-4ef607e4>文章分类</p> "),t._ssrNode('<li class="sideItem" data-v-4ef607e4>',"</li>",[n("myButton",{attrs:{active:0===t.active},on:{click:function(e){return t.CateGoryArticle(-1,"")}}},[t._v("\n                      全部\n                  ")])],1),t._ssrNode(" "),t._l(t.source,(function(e,o){return t._ssrNode('<li class="sideItem" data-v-4ef607e4>',"</li>",[n("myButton",{attrs:{active:o+1===t.active},on:{click:function(n){return t.CateGoryArticle(o,e.name)}}},[t._v("\n                    "+t._s(e.name)+"\n                  ")])],1)}))],2)]),t._ssrNode(" "),"topic"===t.type?t._ssrNode('<div class="searchWrap" data-v-4ef607e4>',"</div>",[n("Input",{attrs:{placeholder:"搜索速记",icon:"md-search"},on:{"on-enter":t.searchShortList,"on-click":t.searchShortList},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}})],1):t._e()],2)])])}),[],!1,(function(t){var e=n(112);e.__inject__&&e.__inject__(t)}),"4ef607e4","5960b48d");e.a=component.exports},147:function(t,e,n){"use strict";n.r(e);var o=n(114),r=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e.default=r.a},148:function(t,e,n){(t.exports=n(3)(!1)).push([t.i,".publishWrap[data-v-82b6a13c]{margin-top:20px;padding:1.333rem 1.666rem 0;background:#fff;position:relative;border-radius:2px}.publishWrap .content[data-v-82b6a13c]{position:relative;border-radius:2px;border:1px solid hsla(0,0%,59.2%,.2);background-color:rgba(226,230,235,.2)}.publishWrap .content .textWrap[data-v-82b6a13c],.publishWrap .content .textWrap .textCard[data-v-82b6a13c]{position:relative}.publishWrap .content .textWrap .textCard .Richedit[data-v-82b6a13c]{font-size:16px;position:relative;height:100%;outline:none;border-radius:2px;color:#17181a;min-height:75px;padding:8px 10px;min-height:37px}.publishWrap .content .textWrap .textCard .Richedit[data-v-82b6a13c]:after{content:attr(placeholder);position:absolute;top:8px;color:rgba(23,24,26,.4);pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:inline-block}.publishWrap .content .textWrap .textCard .Richedit.empty[data-v-82b6a13c]:after{display:none}.publishWrap .content .imgWrap[data-v-82b6a13c]{display:flex;flex-wrap:wrap;padding:12px;position:relative}.publishWrap .content .imgWrap .previewImage[data-v-82b6a13c]{position:relative;cursor:pointer}.publishWrap .content .imgWrap .previewImage .imgContent[data-v-82b6a13c]{background-size:cover!important;flex:0 0 auto;width:80px;height:80px;border-radius:1.4px;border:1px dashed #c5c5c5;background:#f8f8f9;margin:0 .666rem .666rem 0}.publishWrap .content .imgWrap .previewImage .imgContent[data-v-82b6a13c]:hover{-webkit-filter:brightness(.8);filter:brightness(.8)}.publishWrap .content .imgWrap .previewImage .CloseIcon[data-v-82b6a13c]{position:absolute;right:15px;top:5px;border-radius:50%;border:1px solid #c5c5c5;background:rgba(0,0,0,.4)}.publishWrap .content .imgWrap .previewImage .CloseIcon[data-v-82b6a13c]:hover{opacity:.8}.publishWrap .content .imgWrap .file-upload[data-v-82b6a13c]{position:relative;overflow:hidden;border:1px solid #c5b7b7;display:inline-block;padding:10px;border-radius:3px;margin-top:10px}.publishWrap .content .imgWrap .file-upload-input[data-v-82b6a13c]{position:absolute;width:999px;height:999px;top:0;right:0;cursor:pointer}.publishWrap .content .topic[data-v-82b6a13c]{padding:0 12px 12px}.publishWrap .content .topic .topicTitle[data-v-82b6a13c]{font-size:13px;display:inline-block;line-height:22px;height:22px;padding:0 12px;border:1px solid #007fff;border-radius:14px;text-align:center;color:#007fff;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.publishWrap .toolWrap[data-v-82b6a13c]{padding:10px 0;display:flex;justify-content:space-between}.publishWrap .toolWrap .tool[data-v-82b6a13c]{display:flex;align-items:center}.publishWrap .toolWrap .tool .TopicHandle[data-v-82b6a13c]{position:relative}.publishWrap .toolWrap .tool .TopicHandle:hover .TopicSelect[data-v-82b6a13c]{display:block}.publishWrap .toolWrap .tool .TopicHandle .TopicSelect[data-v-82b6a13c]{display:none}.publishWrap .toolWrap .tool .TopicHandle .TopicChoose[data-v-82b6a13c]{color:#515a6e}.NoList[data-v-82b6a13c]{background:#fff;padding:20px;margin-top:20px;text-align:center}",""])},182:function(t,e,n){"use strict";n.r(e);var o=n(131),r=n(93),c=n(110),l=n(27),d=n(133),h=n(9),v=n(8),f=n(7),m=n(26),x=n(103),_=n(29),w={layout:"blog",components:{contentLayout:x.a,myButton:m.a,DropList:h.a,DropListItem:v.a,sideList:d.a,Skeleton:r.a,shorthandList:o.a,Modal:_.a},data:()=>({showModal:!1,baseUrl:"https://api.yjdzm.com",path:"/shorthand",topic:"",value:"",defaultTopic:"摸鱼/生活",imgUrlData:[],uploadType:["image/png","image/jpeg","image/jpg","image/gif"],selectData:[{name:"摸鱼/生活"},{name:"bug/踩坑"},{name:"技巧/资源"},{name:"笔记/记录"}]}),async asyncData({query:t,error:e}){try{const{data:{list:e,hasNextPage:n,next:o}}=await Object(c.a)({topic:t.topic}),{data:data}=await Object(l.a)();return{listData:e,hasNextPage:n,nextPage:o,loading:!1,topicData:data}}catch{e({statusCode:404})}},methods:{changeValue(t){this.UserToken?this.value=t.target.innerText:this.showModal=!0},deleteImg(t){this.imgUrlData.splice(t,1)},upLoadsuccess(t){this.loading=!1,200===t.code&&this.imgUrlData.push(t.data.url)},changeTopic(t){t=t.replace(/\s*/g,""),this.topic=t,this.showSelect=!1},publish(){if(!this.value&&0===this.imgUrlData.length)return void this.$Message.error("不能发布空内容");let t={content:this.value,topic:this.topic||this.defaultTopic,status:"online",imgData:this.imgUrlData};Object(c.c)(t).then(t=>{200===t.code&&this.$Message.success("发布成功"),this.imgUrlData=[],this.value="",this.$refs.text.innerText="",this.loading=!0,this.nextPage=1,this.topic="",this.getShortHandList([])})},getShortHandList(t=[]){this.loading=!0,Object(c.a)({page:this.nextPage,topic:this.topic}).then(e=>{200===e.code&&setTimeout(()=>{this.loading=!1,this.nextPage=e.data.next,this.hasNextPage=e.data.hasNextPage,this.listData=t.concat(e.data.list)},500)})},handleScroll(){if((document.documentElement.scrollTop||document.body.scrollTop)+(document.documentElement.clientHeight||document.body.clientHeight)>(document.documentElement.scrollHeight||document.body.scrollHeight)-1){if(this.loading)return;if(!this.hasNextPage)return;this.getShortHandList(this.listData)}},goLogin(){this.$router.replace("/login")}},mounted(){window.addEventListener("scroll",this.handleScroll);let t=this;this.$refs.text.addEventListener("paste",(function(e){var n=(e.clipboardData||window.clipboardData).items,o=null;if(n&&n.length)for(var i=0;i<n.length;i++){if(-1!==n[i].type.indexOf("image")){o=n[i].getAsFile();break}return}var r=new FormData;r.append("file",o),Object(l.f)(r).then(e=>{t.imgUrlData.push(e.data.url)})}))},computed:{...Object(f.mapState)({UserToken:t=>t.login.UserToken}),header(){return{Authorization:"Bearer "+this.UserToken}},...Object(f.mapState)({userInfo:t=>t.login.userInfo})},watch:{$route({query:t}){this.listData=[],this.nextPage=1,this.topic=t.topic||"",this.getShortHandList(this.listData)}}},y=n(1);var component=Object(y.a)(w,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("contentLayout",[n("div",{attrs:{slot:"main"},slot:"main"},[n("div",{staticClass:"publishWrap"},[n("div",{staticClass:"content"},[n("div",{staticClass:"textWrap"},[n("div",{staticClass:"textCard"},[n("div",{ref:"text",staticClass:"Richedit",class:[{empty:t.value}],attrs:{contenteditable:"true",placeholder:"快速记录你遇到的问题或者分享你的小技巧,请不要上传代码"},on:{input:function(e){return t.changeValue(e)}}})])]),t._v(" "),n("div",{staticClass:"imgWrap"},t._l(t.imgUrlData,(function(e,o){return n("div",{key:o,staticClass:"previewImage"},[n("div",{staticClass:"imgContent",style:{background:"url("+e+")"}}),t._v(" "),n("Icon",{staticClass:"CloseIcon",attrs:{type:"md-close",size:"12"},on:{click:function(e){return t.deleteImg(o)}}})],1)})),0),t._v(" "),n("div",{staticClass:"topic"},[n("span",{staticClass:"topicTitle"},[t._v(t._s(t.topic?t.topic:t.defaultTopic))])])]),t._v(" "),n("div",{staticClass:"toolWrap"},[n("div",{staticClass:"tool"},[n("Upload",{attrs:{action:t.baseUrl+"/upload",data:{dir:"image/"},"show-upload-list":!1,"on-success":t.upLoadsuccess,disabled:t.loading,headers:t.header,accept:""+t.uploadType.join(",")}},[n("div",{staticStyle:{cursor:"pointer"}},[n("Icon",{attrs:{type:"md-images"}}),t._v(" "),n("span",[t._v("图片")])],1)]),t._v(" "),n("div",{staticClass:"TopicHandle"},[n("myButton",{staticClass:"TopicChoose"},[t._v(" 选择分类")]),t._v(" "),n("DropList",{staticClass:"TopicSelect",on:{click:t.changeTopic}},[n("DropListItem",{attrs:{source:t.selectData,size:14}})],1)],1)],1),t._v(" "),n("myButton",{attrs:{type:"success"},on:{click:t.publish}},[t._v("发布")])],1)]),t._v(" "),n("shorthandList",{attrs:{source:t.listData}}),t._v(" "),t.loading?n("Skeleton"):t._e(),t._v(" "),0!==t.listData.length||t.loading?t._e():n("div",{staticClass:"NoList"},[n("p",[t._v("当前没有内容")])])],1),t._v(" "),n("div",{attrs:{slot:"side"},slot:"side"},[n("sideList",{attrs:{source:t.topicData,path:t.path}})],1)]),t._ssrNode(" "),n("Modal",{attrs:{title:"提示",visible:t.showModal,mask:!0,okText:"去登陆"},on:{onOk:t.goLogin,onCancle:function(e){t.showModal=!1}}},[n("p",[t._v("检测到你没有登录账号或者账号验证过期,需要登陆才可以发布速记")])])],2)}),[],!1,(function(t){var e=n(147);e.__inject__&&e.__inject__(t)}),"82b6a13c","d3183e76");e.default=component.exports},88:function(t,e,n){var content=n(92);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var o=n(4).default;t.exports.__inject__=function(t){o("61cc07ab",content,!0,t)}},90:function(t,e,n){var content=n(97);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var o=n(4).default;t.exports.__inject__=function(t){o("4b2b0e42",content,!0,t)}},91:function(t,e,n){"use strict";n.r(e);var o=n(88),r=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e.default=r.a},92:function(t,e,n){(t.exports=n(3)(!1)).push([t.i,".articleSkeleton[data-v-ef67fa28]{margin-top:20px;padding:20px;background-color:#fff;border-radius:0 0 .2rem .2rem;overflow:hidden}.articleSkeleton .skeleton-row[data-v-ef67fa28]{height:1.2rem;margin-bottom:16px;background:linear-gradient(90deg,#fff,#edeff1,#fff);background-size:480px 480px;-webkit-animation:skeleton-stripes-move-data-v-ef67fa28 .6s linear infinite;animation:skeleton-stripes-move-data-v-ef67fa28 .6s linear infinite}.articleSkeleton .skeleton-row[data-v-ef67fa28]:first-of-type{width:30%}.articleSkeleton .skeleton-row[data-v-ef67fa28]:nth-of-type(2){width:80%}.articleSkeleton .skeleton-row[data-v-ef67fa28]:nth-of-type(3){width:70%}.articleSkeleton .skeleton-row[data-v-ef67fa28]:nth-of-type(4){width:50%}@-webkit-keyframes skeleton-stripes-move-data-v-ef67fa28{0%{background-position:0 0}to{background-position:480px 0}}@keyframes skeleton-stripes-move-data-v-ef67fa28{0%{background-position:0 0}to{background-position:480px 0}}",""])},93:function(t,e,n){"use strict";var o={},r=n(1);var component=Object(r.a)(o,(function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"articleSkeleton"},[this._ssrNode('<div class="skeleton-row" data-v-ef67fa28></div> <div class="skeleton-row" data-v-ef67fa28></div> <div class="skeleton-row" data-v-ef67fa28></div> <div class="skeleton-row" data-v-ef67fa28></div>')])}),[],!1,(function(t){var e=n(91);e.__inject__&&e.__inject__(t)}),"ef67fa28","71312465");e.a=component.exports},96:function(t,e,n){"use strict";n.r(e);var o=n(90),r=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e.default=r.a},97:function(t,e,n){(t.exports=n(3)(!1)).push([t.i,".main[data-v-60490932]{max-width:1200px;margin:auto}.main .content[data-v-60490932]{padding:30px 20px}",""])},98:function(t,e,n){var content=n(109);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var o=n(4).default;t.exports.__inject__=function(t){o("51d28ecf",content,!0,t)}},99:function(t,e,n){var content=n(113);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var o=n(4).default;t.exports.__inject__=function(t){o("4024727f",content,!0,t)}}};