function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)return unescape(r[2]);
  return null;
}
$(document).ready(function(){
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: "100vw")').matches;
  let mode = GetQueryString('mode');
  let menus = {
    file: {title: '文件', items: 'newdocument'},
    edit: {title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall'},
    insert: {title: '插入', items: 'link | media | hr'},
    view: {title: '查看', items: 'visualaid'},
    format: {title: '格式', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
    table: {title: '表格', items: 'inserttable tableprops deletetable | cell row column'},
  }; // 顶部工具栏
  let readonly = false;
  if (!mode || mode === 'designer') {
    menus.tools = {title: '病例控件', items: 'template | insertdatetime'};
  }
  if (mode === 'readonly') {
    readonly = true;
  }
  let templates = [
    { title: '复选框', description: '复选框', url: './templates/checkbox.html'},
    { title: '下拉选择', description: 'select', url: './templates/select.html'},
    { title: '标签', description: 'label', url: './templates/label.html'},
    { title: '文档段', description: '文档段', url: './templates/document.html'},
    { title: '单选框', description: '单选框', url: './templates/radio.html'},
    // {
    //   title: '下拉选择',
    //   description: '下拉控件',
    //   content: '<select>{$select}</select>'
    // },
    // {
    //   title: '标签',
    //   description: '标签控件',
    //   content: '<div style="display:flex"><label>{$label}</label><input value="{$username}" /></div>'
    // },
    // {
    //   title: '文档段',
    //   description: '文档段',
    //   content: '<textarea class="mceTmpl-control-text" style="width: 100%" type="text">{$document}</textarea>'
    // },
    // {
    //   title: '单选框',
    //   description: '单选框',
    //   content: '<div style="display:flex"><label><input type="radio" name="{$radioName}" />{$radioText1}</label><label><input type="radio" name="{$radioName}" />{$radioText2}</label></div>'
    // },
    // {
    //   title: '复选框',
    //   description: '复选框',
    //   content: '<div style="display:flex"><label><input type="checkbox" name="{$checkName}" />{$checkText1}</label><label><input type="checkbox" name="{$checkName}" />{$checkText2}</label></div>'
    // },
  ]
  tinymce.init({
    document_base_url: './',
    apiKey: 'wdz0zcafealz93eqmn33zx73ufiibam0kafxoasgewr2g8fo',
    selector: 'textarea#open-source-plugins',
    language: 'zh_CN',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    editimage_cors_hosts: ['picsum.photos'],
    menu: menus,
    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link codesample',
    toolbar_mode: "sliding",
    toolbar_sticky: true,
    toolbar_sticky_offset: isSmallScreen ? 102 : 108,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [
      { title: 'My page 1', value: 'https://www.tiny.cloud' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_list: [
      { title: 'My page 1', value: 'https://www.tiny.cloud' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_class_list: [
      { title: 'None', value: '' },
      { title: 'Some class', value: 'class-name' }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
      }
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
      }
      if (meta.filetype === 'media') {
        callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
      }
    },
    templates: templates,
    template_replace_values: {
      label: '姓名',
      username: "Lucy",
      document: "这是一段文档段",
      select: `<option value="1">上海</option><option value="2">北京</option>`,
      radioName: 'radio',
      radioText1: '男',
      radioText2: '女',
      checkName: 'checkbox',
      checkText1: '男',
      checkText2: '女',
    },
    template_preview_replace_values: {
      label: '姓名',
      username: "Lucy",
      document: "这是一段文档段212",
      select: `<option value="1">上海</option><option value="2">北京</option>`,
      radioName: 'radio',
      radioText1: '男',
      radioText2: '女',
      checkName: 'checkbox',
      checkText1: '男',
      checkText2: '女',
    },
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    readonly: readonly,
    branding: false,
    font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif',
    fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
    quickbars_insert_toolbar: 'quickimage quicktable',
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
    images_upload_url: '/demo/upimg.php',
    images_upload_base_path: '/demo',
    images_upload_handler: function (blobInfo, success, failure, progress) {
      var xhr, formData;
      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', 'postAcceptor.php');
      xhr.upload.onprogress = function(e){
        progress(e.loaded / e.total * 100);
      }
      xhr.onload = function() {
        var json;
        if (xhr.status == 403) {
          failure('HTTP Error: ' + xhr.status, { remove: true });
          return;
        }
        if (xhr.status < 200 || xhr.status >= 300 ) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }
        json = JSON.parse(xhr.responseText);
        if (!json || typeof json.location != 'string') {
          failure('Invalid JSON: ' + xhr.responseText);
          return;
        }
        success(json.location);
      };
      xhr.onerror = function () {
        failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      }
      formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
      xhr.send(formData);
    }
  });
  $('.footer_save').click(function(){
    let content = tinyMCE.activeEditor.getContent();
    alert(`content:: ${content}`)
  });
  $('.footer_reset').click(function(){
    tinyMCE.activeEditor.setContent('');
  });
  $('.footer_set').click(function() {
    let val = $('.footer_value').val();
    console.log('val', val);
    tinyMCE.activeEditor.setContent(val);
  });
})