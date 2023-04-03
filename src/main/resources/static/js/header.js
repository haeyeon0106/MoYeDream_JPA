
/* 새 글 쓰기 */
const $writeBtn = $(".writeBtn");
const $writeBox = $(".writeHidden");

$writeBtn.click(function(){
    if(!$writeBox.hasClass("open")){
        $writeBox.addClass("open");
    } else{
        $writeBox.removeClass("open");
    }

    $('html').mouseup(function(e){
        if($writeBox.hasClass("open")){
            if($writeBox.has($(e.target)).length == 0){
                $writeBox.removeClass("open");
            }
        }
    })
});

/* 알림 보기 */
let $noti = $(".headerNoti");
let $notiBox = $(".notiHidden");
let $notiClose = $(".notiXbtn");

$noti.click(function(){
    if(!$notiBox.hasClass("open")){
        $notiBox.addClass("open");
    } else{
        $notiBox.removeClass("open");
    }

    $('html').mouseup(function(e){
        if($notiBox.hasClass("open")){
            if($notiBox.has($(e.target)).length == 0){
                $notiBox.removeClass("open");
            }
        }
    })
});

/* 아이콘 클릭시 */
let $headerIcon = $(".headerIcon");
let $iconBox = $(".iconHidden");

$headerIcon.click(function(){
    if(!$iconBox.hasClass("open")){
        $iconBox.addClass("open");
    } else{
        $iconBox.removeClass("open");
    }

    $('html').mouseup(function(e){
        if($iconBox.hasClass("open")){
            if($iconBox.has($(e.target)).length == 0){
                $iconBox.removeClass("open");
            }
        }
    })
});
