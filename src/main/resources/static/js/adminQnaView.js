/* 답변 수정하기 */
let $modifyBtnArr = $(".modifyBtn");

$modifyBtnArr.each(function(){
    $(this).click(function (e) {
        let $comment = $(this).parents("form").find(".commentPrint").children("p");
        let $commentBtns = $(this).parents(".commentManageBtn");
        let $modifyInput = $(this).parents("form").find(".modifyInput");
        let $modifyOk = $(this).parents("form").find(".modifyOk");

        let check = false;
        check = confirm("답변을 수정하시겠습니까?");

        if(check){
            $comment.addClass("hidden");
            $commentBtns.addClass("hidden");

            $modifyInput.removeClass("hidden");
            $modifyOk.removeClass("hidden");
            $modifyInput.addClass("active");
            $modifyOk.addClass("active");
        }
    });
})

/* 답변 삭제 */
let $delBtnArr = $(".deleteBtn");

$delBtnArr.each(function(){
    $(this).click(function(){
        let $comment = $(this).parents("form").find(".commentPrint").children("p");
        
        let check = false;
        check = confirm("답변을 삭제하시겠습니까?")

        if(check){
            console.log($comment.text());
            alert("답변이 삭제되었습니다.");
        }
    });
});

/* 답변 수정완료 */
let $modifyOkArr = $(".modifyOk");

$modifyOkArr.each(function(){
    $(this).click(function(){
        let $comment = $(this).parents("form").find(".commentPrint").children("p");
        let $commentBtns = $(this).parents("form").find(".commentManageBtn");
        let $modifyInput = $(this).parent().prev(".modifyInput");
        let $modifyOk = $(this);

        let check = false;
        check = confirm("답변을 수정하시겠습니까?");

        if(check){
            $comment.removeClass("hidden");
            $commentBtns.removeClass("hidden");
            $modifyInput.addClass("hidden");
            $modifyOk.addClass("hidden");

            alert("답변이 수정되었습니다.");
        }
    })
});

/* 답변 등록 */
let $confirmBtn = $("button.confirm");

$confirmBtn.click(function () {
    let check = false;
   check = confirm("답변을 등록하시겠습니까?");
   
   if(check){
       alert("답변이 등록되었습니다.");
   }
});