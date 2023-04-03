/* 로그인 검사 */
const $loginBtn = $(".loginBtn");
const $inputId = $("input.adminId");
const $inputPw = $("input.adminPw");
const $error = $(".errorMsg");
const $loginForm = $(".formBox").find("form");

$loginBtn.click(function(){
    let $tempBorder = $inputId.css("border");
    console.log($tempBorder);

    if(!$inputId.val() && !$inputPw.val()){ // 아이디 비밀번호 모두 입력 안했을때
        $error.text("아이디와 비밀번호를 입력해주세요.");
        $inputId.css("border-color", "f77");
        $inputPw.css("border","1px solid f77");

    }else if(!$inputId.val() && $inputPw.val()){ // 아이디 입력 안했을때
        $error.text("아이디를 입력해주세요.");

    }else if ($inputId.val()){
        if(!$inputPw.val()){ // 비밀번호 입력 안했을때
            $error.text("비밀번호를 입력해주세요.");

        }
        // else if(/*$inputId.val() != "admin"*/id()){ // 아이디 불일치
            // $error.text("아이디를 확인해주세요.");

        // }else if ($inputId.val() == "admin"){
        //     if($inputPw.val() != "pw1234"){ // 비밀번호 불일치
        //         $error.text("비밀번호를 확인해주세요.");
        //
        //     }else if($inputPw.val() == "pw1234"){ // 로그인 성공
        //         $loginForm.submit();
        //         console.log("로그인 성공");
        //     }
        // }
    }
});

// function id() {
//     $.ajax({
//         url:"admin/id",
//         type: "post",
//         data: {id: "$inputId.val()"},
//         success: function(result){
//             if(result == null){
//                 $error.text("아이디를 확인해주세요.");
//             }else {
//                 $error.text("");
//             }
//         },
//         error: function(request, status, error){
//             console.log("실패..");
//             console.log(request);
//             console.log(status);
//             console.log(error);
//         }
//     });
// }
//
// function login() {
//     $.ajax({
//         url:"admin/login",
//         type: "post",
//         data: {adminId: "$inputId.val()", adminPw : "$inputId.val()"},
//         success: function(result){
//             if(result == 0){
//                 $error.text("비밀번호를 확인해주세요.");
//             }else {
//                 $loginForm.submit();
//             }
//         },
//         error: function(request, status, error){
//             console.log("실패..");
//             console.log(request);
//             console.log(status);
//             console.log(error);
//         }
//     });
// }