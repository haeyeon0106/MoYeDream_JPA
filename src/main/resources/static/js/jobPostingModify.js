


const $inputTitle = $("input#title-input");
const $companyName = $("input#enterprise-input");
const $career = $("input#employment-time-input");
const $worktype = $("input#employment-regular-input");
const $Area = $("input#region-input");
const $CompanyUrl = $("input#site-input");
const $note = $(".summernote");
const $input = $("input.jobposting-content");
const $registerButton = $("button.register");


$registerButton.on("click", function () {
    let note = $note.summernote('code');

    if($companyName.val() == "") {
        alert("기업 이름을 입력해주세요.");
    }
    else if($career.val() == "") {
        alert("채용 경력을 입력해주세요.");
    }
    else if($worktype.val() == "") {
        alert("채용 형태를 입력해주세요.");
    }
    else if($Area.val() == "") {
        alert("근무 지역을 입력해주세요.");
    }
    else if($CompanyUrl.val() == "") {
        alert("사이트 url를 입력해주세요.");
    }
    else if($inputTitle.val() == "") {
        alert("공고 제목을 선택해주세요.");
    }
    else if(note == "<p><br></p>" || note == "") {
        alert("공고 상세 내용을 입력해주세요.");
    }
    else {
        $input.val(note);

        if(uploadBoolean != 0) {
            $.ajax({
                url: "/file/deleteCompanyLogo",
                type: "delete",
                data: {path: files},
            });
        }

        $("#createForm").submit();
    }
});

function uploadImage(files, editor) {
    let data = new FormData();
    data.append("files", files);
    $.ajax({
        url: '/file/uploadJobposting',
        type: "post",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function(fileList) {
            let keys = Object.keys(fileList[0]);
            let fileName = fileList[0][keys[0]];
            let uploadPath = fileList[0][keys[1]];

            let url = "/file/displayJobposting?path=" + uploadPath + "/" + fileName;
            $(editor).summernote('insertImage', url);
        },
        error: function(e) {
            console.log(e);
        }
    });
}