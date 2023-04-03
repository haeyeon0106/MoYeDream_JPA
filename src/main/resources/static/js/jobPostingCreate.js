const imgThumbnail2 = document.querySelector("label[for='enterprise-img'] img");
const imgFile2 = document.querySelector("input[id='enterprise-img']");

let logoName2;

imgFile2.addEventListener("change", function(event) {
	let reader = new FileReader();
	reader.readAsDataURL(event.target.files[0]);
	reader.onload = function(event) {
		let url = event.target.result;
		if(url.includes("image")) {
			imgThumbnail2.src = url;
		}
		else {
			imgThumbnail2.src = "https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG";
		}
	}

	let formData2 = new FormData();
	let logoInput2 = $("input[type='file']");
	let logoFiles2 = logoInput2[1].files;
	console.log(logoFiles2[0]);

	logoName2 = $("input[type='file']")[1].files[0].name;

	formData2.append("file", logoFiles2[0]);

	$.ajax({
		url: "/file/uploadCompanyLogo",
		type: "POST",
		data: formData2,
		processData: false,
		contentType: false,
		success: function(fileName) {
			$("#job-logo-name").val(fileName);
		}
	});
});

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
		$("#createForm").submit();
	}
});
