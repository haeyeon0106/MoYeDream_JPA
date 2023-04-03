$(document).ready(function () {

    let toolbar = [
        // 글꼴 설정
        ['fontname', ['fontname']],
        // 글자 크기 설정
        ['fontsize', ['fontsize']],
        // 굵기, 기울임꼴, 밑줄,취소 선, 서식지우기
        ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
        // 글자색
        ['color', ['forecolor', 'color']],
        // 표만들기
        ['table', ['table']],
        // 글머리 기호, 번호매기기, 문단정렬
        ['para', ['ul', 'ol', 'paragraph']],
        // 줄간격
        ['height', ['height']],
        // 그림첨부, 링크만들기, 동영상첨부
        ['insert', ['picture', 'link', 'video']],
        // 코드보기, 확대해서보기, 도움말
        ['view', ['codeview', 'fullscreen', 'help']]
    ];

    let setting = {
        height: 523,
        maxHeight: 523,
        minHeight: 523,
        lang: "ko-KR",
        placeholder: '내용을 작성해 주세요!',
        callbacks: {
            onImageUpload: function(files){
                sendFile(files, $('#summernote'), '/board/boardWrite.html');
            }
        }
    };

    $('#summernote').summernote(setting);
// });

      console.log($(location).attr("pathname"));

      if($(location).attr("pathname") == "/post/modify"){
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