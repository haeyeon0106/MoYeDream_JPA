/* 카테고리 필터 선택 */
let $cateListArr = $(".cateLi");

$cateListArr.each(function(i){
    $(this).click(function(){
        if(!$(this).hasClass('cateLiSelect')){
            $cateListArr.not($(this)).removeClass('cateLiSelect');
            $(this).addClass('cateLiSelect');
        }
    })
});


/* 타입 선택 */
const $studyClick = $(".study-click");
const $jobClick = $(".job-click");
const $studyContent = $(".study-content");
const $jobContent = $(".job-content");

$studyClick.on("click", function () {
    $studyContent.show();
    // $jobContent.hide();
    $jobClick.removeClass('typeSelect');
    $studyClick.addClass('typeSelect');
});

$jobClick.on("click", function () {
    // $jobContent.show();
    $studyContent.show();
    $studyClick.removeClass('typeSelect');
    $jobClick.addClass('typeSelect');
});

// let $typeArr = $(".typeLi");
//
// $typeArr.each(function(i){
//     $(this).click(function(){
//         if(!$(this).hasClass('typeSelect')){
//             $typeArr.not($(this)).removeClass('typeSelect');
//             $(this).addClass('typeSelect');
//         }
//     });
// });

/* 토글스위치 */
let $toggleCheck = $("#switchInput"); 
let $switch = $(".toggleSwitch");
let $switchBall = $(".toggleBall");

$toggleCheck.change(function(){
    if($toggleCheck.is(":Checked")){
        $switch.addClass("checked");
        $switchBall.addClass("checkedBall");
    }else{
        $switch.removeClass("checked");
        $switchBall.removeClass("checkedBall");
    }
});

/* 세부 카테고리 */
const $cateChildLiArr = $(".cateChildLi");
// disabled 클래스가 적용된 개수 파악 위함
let $disabledArr = [];  
// cateChildLi (카테고리) 개수
let $cateChildLength = $cateChildLiArr.length;

// 카테고리 클릭시 나오는 block
const $cateBlockArr = $(".cateBlock");
// 필터 블럭 모두 지우기 버튼
const $clear = $(".filterClear");

$cateChildLiArr.each(function(){
    $(this).click(function(i){
        // disabled 클래스가 적용된 개수
        let $disabledLength = $disabledArr.length;
        let $liValue = $(this).attr("value");

        // console.log("cateChild 배열 길이 : "+$cateChildLength);
        // console.log("적용 전 불투명 클래스 : "+ $disabledLength);
        switch($disabledLength){
            case 0 :  // 모든 카테고리 선명한 상태
                // console.log("case 0 들어옴");
                $cateChildLiArr.not($(this)).addClass('disabled');  //클릭한 카테고리 빼고 모두 불투명하게 변경 
                $cateChildLiArr.each(function(i){
                    $disabledArr.push(i);
                });
                $disabledArr.pop(); // disabled 적용된 카테고리 개수 반영

                $cateBlockArr.each(function(){
                    if($(this).attr("value") == $liValue){
                        $cateBlockArr.not($(this)).removeClass('flex');
                        $(this).addClass('flex');
                    }
                });

                //필터 초기화 버튼 활성화
                $clear.addClass('flex'); 
                break;
            
            case ($cateChildLength-1) : // 한개 빼고 모두 불투명할 경우
                if(!$(this).hasClass('disabled')){
                    // console.log("case 10 모두 선명하게")
                    // 전체 카테고리 선명하게
                    $cateChildLiArr.not($(this)).removeClass('disabled');
                    // disabled 적용된 카테고리 개수 반영
                    $disabledArr = [];

                    $cateBlockArr.each(function(){
                        $(this).removeClass('flex');
                    });

                    //필터 초기화버튼 비활성화
                    $clear.removeClass('flex');  

                } else{
                    // console.log("case 10 toggle");
                    // classToggle
                    $(this).removeClass('disabled');
                    $disabledArr.pop();

                    $cateBlockArr.each(function(){
                        if($(this).attr("value") == $liValue){
                            $(this).toggleClass('flex');
                        }
                    });
                }
                break;

            default :   // 카테고리 1개이상 불투명한 경우
                // 클릭시 선명한 카테고리 > 불투명 하게, 불투명한 카테고리 > 선명하게
                // console.log("case 1~9");
                if($(this).hasClass('disabled')){
                    $(this).removeClass('disabled');
                    $disabledArr.pop();
                }else{
                    $(this).addClass('disabled');
                    $disabledArr.push(i);
                }

                $cateBlockArr.each(function(){
                    if($(this).attr("value") == $liValue){
                        $(this).toggleClass('flex');
                    }
                });
                break;                
        };

        // console.log("적용 후 불투명 클래스 : "+ $disabledArr.length);
        // console.log("------------------------------------------------");
    })
});

/* 카테고리 list 와 block 동기화 */
const $filterX = $(".filterXbtn");

$filterX.each(function () {
   $(this).click(function(){
     let $liBlock = $(this).parent();
     let $liValue = $liBlock.attr("value");

    $cateChildLiArr.each(function(){
        if($(this).attr("value") == $liValue){
            $(this).click();
        }
    });
   }); 
});

/* 필터 초기화 */
$clear.click(function(){
    $cateChildLiArr.each(function(){
        $(this).removeClass('disabled');
    });

    $cateBlockArr.each(function(){
        $(this).removeClass('flex');
    });

    //필터 초기화버튼 비활성화
    $clear.removeClass('flex');    
});