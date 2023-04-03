$(document).ready(function() {
    $('.summernote-chief').summernote({
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

    $('.summernote-study').summernote({
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
        url: '/file/uploadStudy',
        type: "post",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function(fileList) {
            let keys = Object.keys(fileList[0]);
            let fileName = fileList[0][keys[0]];
            let uploadPath = fileList[0][keys[1]];

            let url = "/file/displayStudy?path=" + uploadPath + "/" + fileName;
            $(editor).summernote('insertImage', url);
        },
        error: function(e) {
            console.log(e);
        }
    });
}

const $selectCategory = $("select#category-select");
const $selectProcess = $("select#way-select");
const $selectPersonnel = $("select#people-select");
const $inputStartDate = $("input#start-date");
const $inputCommunication = $("input#contact-input");
const $selectPeriod = $("select#period-select");
const $noteChief = $(".summernote-chief");
const $inputChief = $("input.study-chief");
const $inputTitle = $("input#title-input");
const $noteStudy = $(".summernote-study");
const $inputStudy = $("input.study-content");
const $registerButton = $("button.register");

$registerButton.on("click", function () {
    let noteChief = $noteChief.summernote('code');
    let noteStudy = $noteStudy.summernote('code');

    if($selectCategory.val() == "") {
        alert("카테고리를 선택해주세요.");
    }
    else if($selectProcess.val() == "") {
        alert("진행 방식을 선택해주세요.");
    }
    else if($selectPersonnel.val() == "") {
        alert("모집 인원을 선택해주세요.");
    }
    else if($inputStartDate.val() == "") {
        alert("시작 예정일을 선택해주세요.");
    }
    else if($inputCommunication.val() == "") {
        alert("연락 방법을 입력해주세요.");
    }
    else if($selectPeriod.val() == "") {
        alert("진행 기간을 입력해주세요.");
    }
    else if(noteChief == "<p><br></p>" || noteChief == "") {
        alert("스터디장 소개를 입력해주세요.");
    }
    else if($inputTitle.val() == "") {
        alert("제목을 입력해주세요.");
    }
    else if(noteStudy == "<p><br></p>" || noteStudy == "") {
        alert("스터디 소개를 입력해주세요.");
    }
    else {
        $inputChief.val(noteChief);
        $inputStudy.val(noteStudy);
        $("#studyForm").submit();
    }
});