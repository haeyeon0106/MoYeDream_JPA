$(document).ready(function () {

    $("#summernote").summernote({
        height: 523,
        maxHeight: 523,
        minHeight: 523,
        lang: "ko-KR",
        placeholder : '내용을 작성해 주세요!',
        callbacks: {
            onImageUpload: function(files) {
                    sendFile(files, this, '/mypage/myPageModify.html');
            }
        }
    });

    console.log($(location).attr("pathname"));

    if($(location).attr("pathname") == "/member/myPostModifyRead"){
        // 값 들어왔는지 확인
        console.log(content);
        // 썸머노트에 값 불러오기
        $("#summernote").summernote('code',content);
    }

    let $registerBtn = $(".write_register");

    // 저장버튼 클릭
    $registerBtn.on("click",function(e){
            e.preventDefault();
            saveContent();
        }
    )
});

// 저장소에 사진 업로드 후 썸네일 출력
function sendFile(fileList, el, uploadURL){
    let formData = new FormData;

    let files = fileList;

    for(let i = 0; i < files.length; i++){
        formData.append("files", files[i]);
    }

    $.ajax({
        url : "/file/uploadPostFile",
        type : "post",
        data : formData,
        contentType : false,
        processData : false,
        enctype : 'multipart/form-data',
        success : function(fileList){
            console.log(fileList);
            showUploadFiles(fileList, el);
        }
    })
}

function showUploadFiles(fileList,el) {
    // 파일정보를 담기 위함

    $.each(fileList, function(i, file){
        // 썸네일 노출을 위함
        let str = "";

        str += "/file/displayPostFile?path=" +file.uploadDirectory + "/t_" +  file.fileName;
        $(el).summernote('editor.insertImage', str);

    })
}