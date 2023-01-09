function getQueryVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
  }
  return(false);
}
window.onload = function() {
  let mode = getQueryVariable('mode') || 'DESIGN'
  var sde = window.sde = new SDE({
    el: document.querySelector('#sde'),
    iframe_css_src: null, //string/Array数组 扩展css
    page_start_num: 1, //页面起始页//默认为1
    outer_width: '100%',
    inner_width: '100%',
    header_page_height: 50, //头部高度，底部
    footer_page_height: 30, 
    footer: '', 
    mode: mode,
    ctrl_remote_handle: function(data) {
      //这里可以处理url，对url进行再加工。如果此时执行 this.isLoadAsyncData(true)，则表示代替sde自带的异步请求方法，
      //场景1，二次处理发起异步请求前的参数设置，比如因模板打开路径不同，导致的控件中的url路径不对的问题；
      console.log(data);
      data.url = data.url + '?' + new Date().getTime();
      return data;
      //场景2，在该方法中执行异步请求。并量数据赋值
      // this.isLoadAsyncData(true);
      // var ctrl = this;
      // ajax(function (data) {
      //   //这里是请求成功
      //   ctrl.setBindingData(data.data);//这里是去除data的数据，一般为数组。
      //   if (ctrl.render) {
      //     ctrl.render(); //重新渲染
      //   }
      // }, function (err) {
      //   //这里是失败
      // });
    },
    // default_open_toolbar: 'sde-toolbar-tools', //默认打开的toolbar的集合，如果不填，默认使用第一个集合
    default_open_toolbar: 'sde-toolbar-editor',//默认开启的toolbar，考虑到编辑器高度问题，特将toolbar设置为不可折叠。该值如不设置，默认打开第一个toolbar。
    toolbars: [{//本次更新，toolbar支持更大的定制功能，可自由排列，随意组合，任意命名。如不填默认为下列值：
      name: 'sde-toolbar-file',
      title: '文件',
      items: [{
        name: 'sde-toolbar-file-file',
        title: '文件管理',
        items: [{
          name: 'openxml',
          title: '打开XML'
        }, {
          name: 'importxml',
          title: '下载XML'
        }]
      }, {
        name: 'test',
        title: '测试扩展',
        items: [{
          name: 'tt',
          title: '字符扩展',//toolbar扩展方式一：
          render: function() {
            return `<div class="panel-content-ctrl" title="字符扩展"  onclick="alert('字符扩展')">
              <div class="sde-icon sde-icon-openxml" style="width: 40px; height: 32px; float: none;"></div>
              <div style="text-align: center;">字符扩展</div>
            </div>`;
          }
        }, {
          name: 'tt2',
          title: '对象扩展',
          render: function() {//toolbar扩展方式二（推荐）：
            let div = document.createElement('div');
            div.innerHTML = `<div class="panel-content-ctrl" title="对象扩展" >
              <div class="sde-icon sde-icon-openxml" style="width: 40px; height: 32px; float: none;"></div>
              <div style="text-align: center;">对象扩展</div>
            </div>`;
            div = div.firstElementChild;
            div.addEventListener('click', function() {
              alert('对象扩展');
            });
            return div;
          }
        }]
      }]
    }, {
      name: 'sde-toolbar-editor',
      title: '编辑',
      items: [{
        name: 'sde-toolbar-editor-history',
        title: '历史记录',
        items: [{
          name: 'drafts',
          title: '草稿箱'
        }, {
          name: 'undo',
          title: '撤销'
        }, '|', {
          name: 'redo',
          title: '恢复'
        }]
      }, {
        name: 'sde-toolbar-editor-clipboard',
        title: '剪切板',
        items: [{
          name: 'paste',
          title: '粘贴'
        }, {
          name: 'copy',
          title: '复制'
        }, '|', {
          name: 'cut',
          title: '剪切'
        }]
      }, {
        name: 'sde-toolbar-editor-fonts',
        title: '字体',
        items: [{
          name: 'fontfamily',
          title: '字体'
        }, {
          name: 'removeformat',
          title: '清除格式'
        }, {
          name: 'autotypeset',
          title: '自动格式化'
        }, {
          name: 'formatmatch',
          title: '格式刷'
        }, '|', {
          name: 'fontsize',
          title: '字号'
        }, {
          name: 'upsize',
          title: '增大字体'
        }, {
          name: 'downsize',
          title: '缩小字体'
        }, {
          name: 'subscript',
          title: '上标'
        }, {
          name: 'superscript',
          title: '下标'
        }, {
          name: 'bold',
          title: '加粗'
        }, {
          name: 'italic',
          title: '倾斜'
        }, {
          name: 'underline',
          title: '下划线'
        }, {
          name: 'strikethrough',
          title: '删除线'
        }, {
          name: 'forecolor',
          title: '文字颜色'
        }, {
          name: 'backcolor',
          title: '背景颜色'
        }]
      }, {
        name: 'sde-toolbar-editor-paragraphs',
        title: '段落',
        items: [{
          name: 'justifyleft',
          title: '向左对齐'
        }, {
          name: 'justifycenter',
          title: '居中对齐'
        }, {
          name: 'justifyright',
          title: '向右对齐'
        }, {
          name: 'justifyjustify',
          title: '两端对齐'
        }, {
          name: 'blockquote',
          title: '引用'
        }, {
          name: 'blockindent',
          title: '增加缩进'
        }, {
          name: 'blockoutdent',
          title: '减小缩进'
        }, '|', {
          name: 'unorderedlist',
          title: '无序编号'
        }, {
          name: 'orderedlist',
          title: '有序编号'
        }, {
          name: 'rowspacingtop',
          title: '段前距'
        }, {
          name: 'rowspacingbottom',
          title: '段后距'
        }, {
          name: 'lineheight',
          title: '行高'
        }]
      }]
    }, {
      name: 'sde-toolbar-insert',
      title: '插入',
      items: [{
        name: 'sde-toolbar-insert-pagebreak',
        title: '分页符',
        items: [{
          name: 'pagebreak',
          title: '分页符'
        }]
      }, {
        name: 'sde-toolbar-insert-spechars',
        title: '字符',
        items: [{
          name: 'spechars',
          title: '字符'
        }]
      }, {
        name: 'sde-toolbar-insert-links',
        title: '链接',
        items: [{
          name: 'insertlink',
          title: '添加链接'
        }, '|', {
          name: 'unlink',
          title: '取消链接'
        }]
      }, {
        name: 'sde-toolbar-insert-images',
        title: '图片',
        items: [{
          name: 'insertimage',
          title: '图片管理'
        }, {
          name: 'simpleupload',
          title: '插入'
        }, {
          name: 'emotion',
          title: '表情'
        }, {
          name: 'vectordiagram',
          title: '矢量图'
        }, '|', {
          name: 'snapscreen',
          title: '截屏'
        }, {
          name: 'scrawl',
          title: '涂鸦'
        }]
      }, {
        name: 'sde-toolbar-insert-map',
        title: '地图',
        items: [{
          name: 'map',
          title: '地图'
        }]
      }, {
        name: 'sde-toolbar-insert-insertcode',
        title: '代码',
        items: [{
          name: 'insertcode',
          title: '代码'
        }]
      }, {
        name: 'sde-toolbar-insert-table',
        title: '表格',
        items: [{
          name: 'inserttable',
          title: '表格'
        }]
      }, {
        name: 'sde-toolbar-insert-kityformula',
        title: '公式',
        items: [{
          name: 'kityformula',
          title: '公式'
        }]
      }, {
        name: 'sde-toolbar-insert-blockcomment',
        title: '批注',
        items: [{
          name: 'blockcomment',
          title: '批注'
        }]
      }]
    }, {
      name: 'sde-toolbar-table',
      title: '表格',
      items: [{
        name: 'sde-toolbar-table-table',
        title: '表格',
        items: [{
          name: 'inserttable',
          title: '插入表格'
        }, {
          name: 'deletetable',
          title: '删除表格'
        }, {
          name: 'insertrow',
          title: '插入行'
        }, {
          name: 'insertcol',
          title: '插入列'
        }, '|', {
          name: 'deleterow',
          title: '删除行'
        }, {
          name: 'deletecol',
          title: '删除列'
        }]
      }, {
        name: 'sde-toolbar-table-merge',
        title: '合并单元格',
        items: [{
          name: 'mergecells',
          title: '合并单元格'
        }, {
          name: 'mergedown',
          title: '向下合并单元格'
        }, {
          name: 'mergeright',
          title: '向右合并单元格'
        }, '|', {
          name: 'splittocells',
          title: '拆分单元格'
        }, {
          name: 'splittocols',
          title: '单元格拆分成列'
        }, {
          name: 'splittorows',
          title: '单元格拆分成行'
        }]
      }, {
        name: 'sde-toolbar-table-alignmerge',
        title: '对齐方向',
        items: [{
          name: 'valign-top',
          title: '顶端对齐'
        }, {
          name: 'valign-middle',
          title: '垂直居中'
        }, {
          name: 'valign-bottom',
          title: '底端对齐'
        }, '|', {
          name: 'align-left',
          title: '左对齐'
        }, {
          name: 'align-center',
          title: '居中'
        }, {
          name: 'align-right',
          title: '右对齐'
        }]
      }, {
        name: 'sde-toolbar-table-style',
        title: '表格线样式',
        items: [{
          name: 'tablestyle',
          title: '表格样式',
          items: [{
              title: '隐藏表格线',
              name: 'tb-hide' //这里是具体的样式
            },
            {
              title: '设为实线',
              name: 'tb-solid'
            },
            {
              title: '设为虚线',
              name: 'tb-dotted'
            }
          ]
        }, {
          name: 'tablelowerframeline',
          title: '下框线'
        }, {
          name: 'tableupperframeline',
          title: '上框线'
        }, {
          name: 'tableleftframeline',
          title: '左框线'
        }, {
          name: 'tablerightframeline',
          title: '右框线'
        }, {
          name: 'tablenoborder',
          title: '无框线'
        }, '|', {
          name: 'tableinternaltransverseline',
          title: '内部横线'
        }, {
          name: 'tableinternalverticalline',
          title: '内部竖线'
        }, {
          name: 'tableinsideborder',
          title: '内部框线'
        }, {
          name: 'tablelateralframeline',
          title: '外侧框线'
        }, {
          name: 'tableallframelines',
          title: '所有框线'
        }, ]
      }]
    }, {
      name: 'sde-toolbar-views',
      title: '视图',
      items: [{
        name: 'sde-toolbar-views-directory',
        title: '目录',
        items: [{
          name: 'directory',
          title: '显示目录'
        }]
      }, {
        name: 'sde-toolbar-views-comment',
        title: '批注',
        items: [{
          name: 'showcomment',
          title: '显示批注'
        }]
      }, {
        name: 'sde-toolbar-views-revise',
        title: '修订',
        items: [{
          name: 'revise',
          title: '修订'
        }, {
          name: 'unrevise',
          title: '移除'
        }]
      }, {
        name: 'sde-toolbar-views-preview',
        title: '预览文档',
        items: [{
          name: 'preview',
          title: '预览文档'
        }]
      }]
    }, {
      name: 'sde-toolbar-tools',
      title: '工具',
      items: [{
        name: 'sde-toolbar-tools-drafts',
        title: '草稿箱',
        items: [{
          name: 'drafts',
          title: '草稿箱'
        }]
      }, {
        name: 'sde-toolbar-tools-print',
        title: '打印',
        items: [{
          name: 'print',
          title: '普通打印'
        }, {
          name: 'seniorprint',
          title: '高级打印'
        }]
      }, {
        name: 'sde-toolbar-tools-search',
        title: '搜索',
        items: [{
          name: 'searchreplace',
          title: '查找替换'
        }]
      }, {
        name: 'sde-toolbar-tools-wordcount',
        title: '字数统计',
        items: [{
          name: 'wordcount',
          title: '字数统计'
        }]
      }]
    }, 
    {
      name: 'sde-toolbar-controls',
      title: '病历控件',
      items: [
        {
          name: 'sde-toolbar-controls-sdetemplate',
          title: '控件库',
          items: [{
            name: 'sdetemplate',
            title: '控件库'
          }]
        },
        {
          name: 'sde-toolbar-controls-controls',
          title: '新增控件',
          items: [{
            name: 'sdectrllabel',
            title: '标签控件'
          }, {
            name: 'sdectrltext',
            title: '单行文本'
          }, {
            name: 'sdectrlsection',
            title: '文档段'
          }, {
            name: 'sdectrlsummary',
            title: '文档节'
          }, '|', {
            name: 'sdectrlselect',
            title: '下拉选择'
          }, {
            name: 'sdectrldate',
            title: '日期控件'
          }, {
            name: 'sdectrlradio',
            title: '单选框'
          }, {
            name: 'sdectrlcbx',
            title: '复选框'
          }
        ]
      },
      // {
      //   name: 'sde-toolbar-controls-sdemode',
      //   title: '模式设置',
      //   items: [{
      //     name: 'sdemode',
      //     title: '模式设置'
      //   }]
      // }
      ]
    }]
  });
  sde.addListener('ready', function() {
    sde.seniorPrint({
      resettingPrint(opt, viewDom) {}, //默认重置（包括首次设置）打印页面前触发。优先级高于render系列函数
      resetedPrint(opt, viewDom) {}, //默认重置（包括首次设置）打印页面后触发。优先级高于render系列函数
      renderHeader(index, page) {
        return `<div style="line-height:55px;background:red;border:1px solid yellow;">这里是header</div>`;
      }, //返回要渲染的页眉。默认从零开始
      renderFooter(index, page) {
        return `<div style="line-height:35px;background:blue;border:1px solid green;"><center>第${index + 1}页<center></div>`;
      }, //返回要渲染的页脚。默认从零开始
      renderedHeader(index, count, page, header) {}, //渲染后
      renderedFooter(index, count, page, footer) {}, //渲染后
      scale: 2, //放大比例，默认2倍，越大越清晰，相应的渲染也更慢
      autoPrint: true, //是否默认打开pdfviewer即执行打印操作
      isDownload: false, //是否下载，如果为true，则不再打开pdfviewer页面
      fileName: 'SDE 测试打印', //如果isDownload=true时的pdf文件下载名称
      pageMode: 'A4', //页面模式:A3|A4|A5 ……
      width: 794, //以下默认值
      height: 1123,
      top: 100,
      right: 100,
      bottom: 100,
      left: 100,
      printMode: 'normal', //打印模式：normal|neat|revise|comment
      ctrlMode: 'normal', //控件模式：normal|hidden|remove
      printDirection: 'vertical', //打印方向 vertical|horizontal
      printCssUrl: null, //打印的样式表，可以是string，也可以是array
      printJsUrl: null, //打印的js，可以是string，也可以是array
    });
  });
  sde.addListener('headerfooteropen', function() {
    console.log(this);
    console.log('design headerfooteropen ok!');
  });

  sde.addListener('beforerender', function() {
    console.log('beforerender ok!');
  });
  sde.addListener('rendered', function() {
    console.log('arguments', arguments);
    console.log('rendered ok!');
  });
  // sde.addListener('loaddata', function(controls, error) {
  //   debugger;
  //   console.log('loaddata ok!');
  // });
  sde.addListener('click', function() {
    console.log('arguments', arguments);
    console.log('click ok!');
  });
  // sde.addListener('openform', function() {
  //   debugger;
  //   console.log('openform ok!');
  // });
  sde.addListener('valuechange', function() {
    console.log('arguments', arguments);
    console.log('valuechange ok!');
  });
  // sde.addListener('closeform', function() {
  //   debugger;
  //   console.log('closeform ok!');
  // });

  sde.addListener('contentchange', function() {
    console.log('contentchange ok!');
  });

  window.sde = sde;
};