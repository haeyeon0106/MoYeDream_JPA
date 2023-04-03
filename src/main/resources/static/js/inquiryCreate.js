$(document).ready(function () {
    $('.summernote').summernote({
        height: 523,
        maxHeight: 523,
        minHeight: 523,
        lang: "ko-KR",
        placeholder: '내용을 작성해주세요!',
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ],
        callbacks: {
            onImageUpload: function(files) {
                uploadImage(files[0], this);
            }
        }
    });
});

function uploadImage(files, editor) {
    let data = new FormData();
    data.append("files", files);
    $.ajax({
        url: '/file/uploadInquiry',
        type: "post",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function(fileList) {
            let keys = Object.keys(fileList[0]);
            let fileName = fileList[0][keys[0]];
            let uploadPath = fileList[0][keys[1]];

            let url = "/file/displayInquiry?path=" + uploadPath + "/" + fileName;
            $(editor).summernote('insertImage', url);
        },
        error: function(e) {
            console.log(e);
        }
    });
}

const $inputTitle = $("input#title-input");
const $note = $(".summernote");
const $input = $("input.inquiry-content");
const $registerButton = $("button.register");


$registerButton.on("click", function () {
    let note = $note.summernote('code');

    if($inputTitle.val() == "") {
        alert("문의 제목을 입력해주세요.");
    }
    else if(note == "<p><br></p>" || note == "") {
        alert("문의 내용을 입력해주세요.");
    }
    else {
        $input.val(note);
        $("#inquiryForm").submit();
    }
});


