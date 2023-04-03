/* 검색조건 - 첫번째 필터 */
function toggleSelect(selectBox){
    selectBox.classList.toggle("active");
}

function selectOption(option){
    const selectBox = option.closest(".selectBox"); // 클릭한 옵션의 selectBox 찾기
    const selectVal = selectBox.querySelector(".selectedValue");   //클릭한 옵션이 들어갈 객체 (selected)
    selectVal.textContent = option.textContent; // 클릭한 option의 text로 변경해줌
}

const selectArr = document.querySelectorAll(".selectBox");

selectArr.forEach(select => {
    select.addEventListener("click", function(e){
        const target = e.target; // 클릭한 객체
        const option = target.classList.contains("option"); // 클릭한 객체가 option인지 확인

        if(option){ // 클릭한 객체가 옵션일 경우
            selectOption(target);
            // selected 부분의 text을 해당 옵션으로 변경하는 function
        }

        toggleSelect(select); // 클릭시 옵션List 열고 닫아주기
    });
});

/* 검색조건 - 두번째 필터 */

const $optionArr = $(".opt1st");
const $filter1st = $(".filter1st").find(".selected");
const $filter2ndArr = $(".filter2nd");
let $pageForm = $("form[name='pageForm']");
const $inputType = $pageForm.find("input[name=type]");


$filter1st.click(function(){
    $optionArr.each(function(){
        $(this).mouseup(function(e){
            let $tge = $(e.target);

            if($tge.hasClass("title")){ // 검색조건 : 제목
                let $titleFilter = $("div.titleFilter");

                $filter2ndArr.not($(this)).removeClass("visible");
                $titleFilter.addClass("visible");

                // 첫번째 필터 값 <input name="type">에 넣기
                console.log($tge.attr("value"));
                $inputType.val($tge.attr("value"));

            }else if($tge.hasClass("writer")){ //검색조건 : 작성자
                let $writerFilter = $("div.writerFilter");

                $filter2ndArr.not($(this)).removeClass("visible");
                $writerFilter.addClass("visible");

                console.log($tge.attr("value"));
                $inputType.val($tge.attr("value"));

            }else if($tge.hasClass("period")){ //검색조건 : 작성기간
                let $periodFilter = $("div.periodFilter");

                $filter2ndArr.not($(this)).removeClass("visible");
                $periodFilter.addClass("visible");

                $inputType.val($tge.attr("value"));

            }else if($tge.hasClass("body")){ // 검색조건 : 본문내용
                let $contentFilter = $("div.contentFilter");

                $filter2ndArr.not($(this)).removeClass("visible");
                $contentFilter.addClass("visible");

                $inputType.val($tge.attr("value"));

            }else if($tge.hasClass("reply")){ // 검색조건 : 댓글내용
                let $replyFilter = $("div.replyFilter");

                $filter2ndArr.not($(this)).removeClass("visible");
                $replyFilter.addClass("visible");

                $inputType.val($tge.attr("value"));
            }
        });
    });
});