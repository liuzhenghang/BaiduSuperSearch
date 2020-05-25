function bodyLoad() {
    getImg();
    $('#siteVal').hide();
    $('#tittleValBox').hide();
    $('#textValBox').hide();
    $('#fileValBox').hide();
    $('#siteValBox').hide();
    $('#fileVal').hide();
    $('#delValBox').hide();
    layStart();
    if (UA()){
        $('#box').animate({width:'100%'},300);
    }
    $('input').keydown(function (event) {
        if(event.keyCode ==13){
            goto();
        }
    })
    $('#so').click(function () {
        goto();
    });
    $('#tittle').click(function () {
        if ($('#tittle').prop('checked')){
            $('#tittleVal').show(300);
        }else {
            $('#tittleVal').hide(300);
            $('#tittleVal').val('');
        }
    });
    $('#box').mousemove(function () {
        $('#bg').addClass('bg-bul');
    });
    $('#box').mouseout(function () {
        $('#bg').removeClass('bg-bul');
    });
}
function getImg() {
    $.getJSON('/img.php',null,function (data) {
        $('body').css("background:url('"+data.images+"')");
        $('#imgText').html("<a target='view_window' href='"+data.images+"'>下载这张图片</a><br>"+
            data.copyright);
    });
}
function goto() {
    // if (!inspect()){
    //     return false;
    // }
    let word=words();
    let del=delWords();
    let site=getSite();
    let tittle=getTittle();
    let body=getTextWords();
    let file=getFile();
    let url="https://www.baidu.com/s?wd=";
    url=url+file+word+del+site+tittle+body;
    window.open(url);
}

function words() {
// 获取关键字
    let word='';
    let words=$('#word').val().split(' ');
    for (let i in words){
        if ($('#accurate').prop('checked')){
            word+='"'+words[i]+'"'+' ';
        }else {
            word+=words[i]+' ';
        }
    }
    return ' '+word;
}

function delWords() {
    // 获取屏蔽字
    let del='';
    if ($('#delChk').prop('checked')){
        if ($('#del').val()!==''){
            let dels=$('#del').val().split(' ');
            for (let i in dels){
                del+='-'+dels[i]+' ';
            }
        }
    }
    return del;
}
function getSite() {
// 获取查询站点
    if ($('#siteChk').prop('checked')){
        let lSite=' site:'
        if (site==='null'){
            if ($('#siteVal').val()===''){
                return '';
            }
            if (!$('#siteVague').prop('checked')){
                lSite=' inurl:'
            }
            lSite+=$('#siteVal').val();
        }else if (site!==null){
            if (!$('#siteVague').prop('checked')){
                lSite=' inurl:'
            }
            lSite+=site;
        }else {
            lSite='';
        }
        return lSite;
    }else {
        return '';
    }

}
function getTittle() {
// 获取标题关键字
    if ($('#tittle').prop('checked')){
        if ($('#tittleVal').val()===''){
            return '';
        }
        let tittle=' intitle:'+$('#tittleVal').val();
        if (!$('#tittle').prop('checked')){
            tittle='';
        }
        return tittle;
    }else {
        return '';
    }
}
function getTextWords() {
// 获取正文关键字
    if ($('#body').prop('checked')){
        if ($('#textVal').val()===''){
            return '';
        }
        let body=' intext:'+$('#textVal').val();
        if (!$('#body').prop('checked')){
            body='';
        }
        return body;
    }else {
        return '';
    }
}
function getFile() {
// 获取文件类型
    if ($('#fileChk').prop('checked')){
        if (file===null){
            return '';
        }else if (file==='null'){
            if ($('#fileVal').val()===''){
                return '';
            }
            return ' filetype:'+$('#fileVal').val();
        }else{
            return ' filetype:'+file;
        }
    }else {
        return '';
    }
}

function UA() {
    var os = function (){
        var ua = navigator.userAgent,
            isWindowsPhone = /(?:Windows Phone)/.test(ua),
            isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
            isAndroid = /(?:Android)/.test(ua),
            isFireFox = /(?:Firefox)/.test(ua),
            isChrome = /(?:Chrome|CriOS)/.test(ua),
            isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
            isPhone = /(?:iPhone)/.test(ua) && !isTablet,
            isPc = !isPhone && !isAndroid && !isSymbian;
        return {
            isTablet: isTablet,
            isPhone: isPhone,
            isAndroid: isAndroid,
            isPc: isPc
        };
    }();

    if (os.isAndroid || os.isPhone) {
        return true;
    } else if (os.isTablet) {
        return false;
    } else if(os.isPc) {
        return false;
    }
}

function layStart() {
    layui.use(['layer', 'jquery', 'form'], function () {
        var layer = layui.layer,
            $ = layui.jquery,
            form = layui.form;
        form.on('select(site)', function(data){
            console.log(data.value); //得到被选中的值
            if (data.value===''){
                site=null;
                $('#siteVal').hide(300);
            }else if (data.value==='null'){
                $('#siteVal').show(300);
                site='null';
            }else {
                $('#siteVal').hide(300);
                site=data.value;
            }
            form.render('select');
        });
        form.on('select(file)', function(data){
            console.log(data.value); //得到被选中的值
            if (data.value===''){
                file=null;
                $('#fileVal').hide(300);
            }else if (data.value==='null'){
                $('#fileVal').show(300);
                file='null';
            }else {
                $('#fileVal').hide(300);
                file=data.value;
            }
            form.render('select');
        });
        form.on('checkbox', function(data){
            if ($('#tittle').prop('checked')){
                $('#tittleValBox').slideDown(300);
            }else {
                $('#tittleValBox').hide(300);
            }
            if ($('#body').prop('checked')){
                $('#textValBox').slideDown(300);
            }else {
                $('#textValBox').hide(300);
            }
            if ($('#delChk').prop('checked')){
                $('#delValBox').slideDown(300);
            }else {
                $('#delValBox').hide(300);
            }
            if ($('#siteChk').prop('checked')){
                $('#siteValBox').slideDown(300);
            }else {
                $('#siteValBox').hide(300);
            }
            if ($('#fileChk').prop('checked')){
                $('#fileValBox').slideDown(300);
            }else {
                $('#fileValBox').hide(300);
            }
            form.render('checkbox');
        });
    });
}

function inspect() {
    if ($('#body').prop('checked')){
        if ($('#textValBox').val()===''){
            layer.tips('这个选项没填好，不能为空哈，或者可以把开关关掉呢', '#tittleVal', {
                tips: [1, '#3595CC'],
                time: 4000
            });
            return false;
        }
    }
    if ($('#siteChk').prop('checked')){
        if (site==='null'){
            if ($('#siteVal').val()===''){
                layer.msg('检查下自定义站点添上了没有', {icon: 5});
                // layer.tips('这个标题没填好，不能为空哈，或者可以把选项关掉呢', '#tittleVal', {
                //     tips: [1, '#3595CC'],
                //     time: 4000
                // });
                return false;
            }
        }
    }
    if ($('#fileChk').prop('checked')){
        if (file==='null'){
            if ($('#fileVal').val()===''){
                layer.msg('检查下自定义文件类型添上了没有', {icon: 5});
                // layer.tips('这个标题没填好，不能为空哈，或者可以把选项关掉呢', '#tittleVal', {
                //     tips: [1, '#3595CC'],
                //     time: 4000
                // });
                return false;
            }
        }
    }
    return true;
}