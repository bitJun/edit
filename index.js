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
    insert: {title: '插入', items: 'link media | template hr | insertdatetime'},
    view: {title: '查看', items: 'visualaid'},
    format: {title: '格式', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
    table: {title: '表格', items: 'inserttable tableprops deletetable | cell row column'},
  }; // 顶部工具栏
  let readonly = false;
  if (!mode || mode === 'designer') {
    menus.tools = {title: '病例控件', items: 'template'};
  }
  if (mode === 'readonly') {
    readonly = true;
  }
  let templates = [
    { title: 'template1', description: 'template1', content: `<div class="content">
    <p>adfa打发sfadsf阿sfadsf阿斯dfa<span class="sde-ctrl" sde-type="text" sde-right="." id="abc1" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22verify%22%3A%22%5E%5B0-9%5D*%24%22%2C%22required%22%3A0%2C%22desc%22%3A%22%E6%95%B4%E6%95%B0%E6%8E%A7%E4%BB%B6%22%2C%22remotedata%22%3A%7B%22url%22%3A%22%2Fdata%2Fjson1.json%22%2C%22method%22%3A%22get%22%2C%22data%22%3A%7B%22name%22%3A%22tl%22%7D%7D%7D"
      contenteditable="false"><span class="sde-value" sde-left="[" sde-right="]" contenteditable="true" >整数控件</span>
    </span>
    sd啊斯顿发打发斯蒂芬
    <span class="sde-ctrl" sde-value='[{ "label": "男", "value": 1 }]' sde-type="select" sde-updatetime="2018-5-3 14:13:02" sde-right="." id="abc-select" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22required%22%3A0%2C%22multi%22%3A0%2C%22desc%22%3A%22%E6%80%A7%E5%88%AB%22%2C%22bindingdata%22%3A%5B%5D%2C%22remotedata%22%3A%7B%22url%22%3A%22%2Fdata%2Fsex.json%22%2C%22method%22%3A%22get%22%2C%22headers%22%3A%7B%7D%2C%22data%22%3A%7B%7D%7D%7D"
      contenteditable="false"><span class="sde-value" sde-left="[" sde-right="]" contenteditable="false" >性别</span></span>sd啊打爱的发的蒂芬
    <span class="sde-ctrl" bindingdata='[{ "label": "感觉很好", "value": 1 }, { "label": "感觉一般", "value": 2 }]' sde-value='[{ "label": "感觉很好", "value": 1 }, { "label": "感觉一般", "value": 2 }]' sde-type="select" sde-updatetime="2018-5-3 14:13:02" sde-right="." id="abc-select1"
      sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22required%22%3A0%2C%22multi%22%3A1%2C%22desc%22%3A%22%E6%84%9F%E8%A7%89%22%2C%22bindingdata%22%3A%5B%7B%20%22label%22%3A%20%22%E6%84%9F%E8%A7%89%E5%BE%88%E5%A5%BD%22%2C%20%22value%22%3A%201%20%7D%2C%20%7B%20%22label%22%3A%20%22%E6%84%9F%E8%A7%89%E4%B8%80%E8%88%AC%22%2C%20%22value%22%3A%202%20%7D%5D%7D"
      contenteditable="false"><span class="sde-value" sde-left="[" sde-right="]" contenteditable="false" >感觉</span></span>sd啊打发sf</p>
  <p>开始时间：<span class="sde-ctrl" id="kssj" sde-type="date" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22required%22%3A0%2C%22desc%22%3A%22%22%2C%22defvalue%22%3A%222018-5-7%2016%3A08%3A09%22%2C%22format%22%3A%22%7Byyyy%7D-%7BMM%7D-%7Bdd%7D%20%7Bhh%7D%3A%7Bmm%7D%3A%7Bss%7D%22%2C%22min%22%3A%22%22%2C%22max%22%3A%22%22%7D"><span class="sde-value" contenteditable="true" sde-left="[" sde-right="]">开始时间</span></span>阿打发打
    结束时间：
    <span class="sde-ctrl" id="jssj" sde-type="date" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22required%22%3A0%2C%22desc%22%3A%22%22%2C%22defvalue%22%3A%222018-5-7%2016%3A08%3A09%22%2C%22format%22%3A%22%7Byyyy%7D-%7BMM%7D-%7Bdd%7D%20%7Bhh%7D%3A%7Bmm%7D%3A%7Bss%7D%22%2C%22min%22%3A%222018-4-7%2016%3A08%3A09%22%2C%22max%22%3A%222018-5-17%2016%3A08%3A09%22%7D"><span class="sde-value" contenteditable="true" sde-left="[" sde-right="]">结束时间</span></span>阿打发打
    发随意时间：
    <span class="sde-ctrl" id="sysj" sde-type="date" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22required%22%3A0%2C%22desc%22%3A%22%22%2C%22defvalue%22%3A%222018-5-7%2016%3A08%3A09%22%2C%22format%22%3A%22%7Byyyy%7D%E5%B9%B4%7BMM%7D-%7Bdd%7D%20%7Bhh%7D%3A%7Bmm%7D%3A%7Bss%7D%22%2C%22min%22%3A%222018-4-7%2016%3A08%3A09%22%2C%22max%22%3A%222018-5-17%2016%3A08%3A09%22%7D"><span class="sde-value" contenteditable="true" sde-left="[" sde-right="]">结束时间</span></span>阿打发打
    发
    <label sde-type="label" class="sde-ctrl sde-label" id="label1">labellabellabel</label>俺的沙发
    <table class="tb-dotted">
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
        </tr>
        <tr>
          <td></td>
          <td>4</td>
        </tr>
      </tbody>
    </table>
    adfa打发s 非异步：
    <span id="gj" sde-right="." sde-type="radio" class="sde-ctrl" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22required%22%3A0%2C%22multi%22%3A1%2C%22desc%22%3A%22%E6%84%9F%E8%A7%89%22%2C%22bindingdata%22%3A%5B%7B%20%22label%22%3A%20%22%E6%84%9F%E8%A7%89%E5%BE%88%E5%A5%BD%22%2C%20%22value%22%3A%201%20%7D%2C%20%7B%20%22label%22%3A%20%22%E6%84%9F%E8%A7%89%E4%B8%80%E8%88%AC%22%2C%20%22value%22%3A%202%20%7D%5D%7D"
      bindingdata='[{ "label": "感觉很好", "value": 1 }, { "label": "感觉一般", "value": 2 }]' contenteditable="false"><span contenteditable="true" sde-left="[" sde-right="]"  class="sde-value"><label contenteditable="false"><input type="radio"  name="radio_33"  value='{ "label": "感觉很好", "value": 1 }'>感觉很好</label>
      <label contenteditable="false"><input type="radio" name="radio_33" value='{ "label": "感觉一般", "value": 2 }'>感觉一般</label>
    </span></span>
    fad异步：<span id="gj1" sde-right="." sde-type="radio" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22required%22%3A0%2C%22multi%22%3A1%2C%22desc%22%3A%22%E6%84%9F%E8%A7%89%22%2C%22bindingdata%22%3A%5B%5D%2C%22remotedata%22%3A%7B%22url%22%3A%22%2Fdata%2Ffeel.json%22%2C%22method%22%3A%22get%22%2C%22headers%22%3A%7B%7D%2C%22data%22%3A%7B%7D%7D%7D"
      class="sde-ctrl" contenteditable="false"><span contenteditable="true" sde-left="[" sde-right="]"  class="sde-value"></span></span>sf阿dfa adfa打发sfadsf阿sfadsf阿斯df阿sfadsf阿斯dfa
    <span class="sde-ctrl" sde-type="text" sde-right="." id="abc1" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22verify%22%3A%22%5E%5B0-9%5D*%24%22%2C%22required%22%3A0%2C%22desc%22%3A%22%E6%95%B4%E6%95%B0%E6%8E%A7%E4%BB%B6%22%2C%22remotedata%22%3A%7B%22url%22%3A%22%2Fdata%2Fjson1.json%22%2C%22method%22%3A%22get%22%2C%22data%22%3A%7B%22name%22%3A%22tl%22%7D%7D%7D"
      contenteditable="false"><span class="sde-value" sde-left="[" sde-right="]" contenteditable="true" >整数控件</span>
    </span>
    sd啊斯顿adf文档节：
    <div class="sde-ctrl sde-section" contenteditable="false" sde-type="section" id="section1" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22originalmode%22%3A%22EDITOR%22%7D">
      <p contenteditable="true" class="sde-value">区域控件阿斯dfa
        <span class="sde-ctrl" sde-type="text" sde-right="." id="abc1" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22verify%22%3A%22%5E%5B0-9%5D*%24%22%2C%22required%22%3A0%2C%22desc%22%3A%22%E6%95%B4%E6%95%B0%E6%8E%A7%E4%BB%B6%22%2C%22remotedata%22%3A%7B%22url%22%3A%22%2Fdata%2Fjson1.json%22%2C%22method%22%3A%22get%22%2C%22data%22%3A%7B%22name%22%3A%22tl%22%7D%7D%7D"
          contenteditable="false"><span class="sde-value" sde-left="[" sde-right="]" contenteditable="true" >整数控件</span>
        </span>
        sd啊斯区域 控件！！！
      </p>
    </div>adsfasdfaad打发<span class="sde-revise"><span class="sde-revise-add">新增批注</span></span>阿斯 顿发
    <span class="sde-revise"><span class="sde-revise-del">删除批注</span></span>阿发 发打fa
  </p>
  </div>` },
    { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
  ]
  console.log('mode', mode);
  tinymce.init({
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
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
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