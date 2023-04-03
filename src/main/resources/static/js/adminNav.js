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
    });
});

// /* 상위메뉴 클릭시 */
// const $menuParentArr = $(".menuParent");
// const $menuChildArr = $(".menuChild");

// $menuParentArr.each(function(){
//     let $parent ;
//     let $child ;

//     $(this).click(function(e){
//         $child = $(this).next(".menuChild");

//         $(this).toggleClass("toggleYellow");
//         $child.toggleClass("toggleMenu");

//         $(document).mouseup(function(e){
//             if($child.has(e.target).length==0){
//                 $(this).toggleClass("toggleYellow");
//                 $child.toggleClass("toggleMenu");
//             }
//         });
//     });
// });

/* 스터디 메뉴 */

let $studyParent = $(".studyParent");
let $studyChild = $(".studyChild");
let $studyArrow = $studyParent.find("svg");

$studyParent.click(function(e){
    if(!$(this).hasClass("toggleYellow")){
        $(this).addClass("toggleYellow");
        $studyChild.addClass("toggleMenu");

    } else{
        $(this).removeClass("toggleYellow");
        $studyChild.removeClass("toggleMenu");
    }

    $('html').mouseup(function(e){
        if($studyChild.hasClass("toggleMenu")){
            if($studyChild.has($(e.target)).length == 0){
                $studyParent.removeClass("toggleYellow");
                $studyChild.removeClass("toggleMenu");
            }
        }
    });
});

/* 채용공고 메뉴 */

let $postParent = $(".postParent");
let $postChild = $(".postChild");

$postParent.click(function(e){
    if(!$(this).hasClass("toggleYellow")){
        $(this).addClass("toggleYellow");
        $postChild.addClass("toggleMenu");
    } else{
        $(this).removeClass("toggleYellow");
        $postChild.removeClass("toggleMenu");
    }

    $('html').mouseup(function(e){
        if($postChild.hasClass("toggleMenu")){
            if($postChild.has($(e.target)).length == 0){
                $postParent.removeClass("toggleYellow");
                $postChild.removeClass("toggleMenu");
            }
        }
    });
});

/* 문의게시판 메뉴 */
let $qnaParent = $(".qnaParent");
let $qnaChild = $(".qnaChild");

$qnaParent.click(function(e){
    if(!$(this).hasClass("toggleYellow")){
        $(this).addClass("toggleYellow");
        $qnaChild.addClass("toggleMenu");
    } else{
        $(this).removeClass("toggleYellow");
        $qnaChild.removeClass("toggleMenu");
    }

    $('html').mouseup(function(e){
        if($qnaChild.hasClass("toggleMenu")){
            if($qnaChild.has($(e.target)).length == 0){
                $qnaParent.removeClass("toggleYellow");
                $qnaChild.removeClass("toggleMenu");
            }
        }
    });
});