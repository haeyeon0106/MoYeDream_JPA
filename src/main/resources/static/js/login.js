$(document).ready(function() {
	if(memberNumber != null) {
		let jsonMemberNumber = {
			memberNumber : memberNumber
		};

		$.ajax({
			url: "/member/checkProfile",
			type: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(jsonMemberNumber),
			success: function(result) {
				if(result) {
					$("div.headerIcon img").attr("src", "/file/displayProfile?path=" + result);
				}
				else {
					$("div.headerIcon img").attr("src", "https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG");
				}
			}
		});
	}
	else {
		$("div.headerIcon img").attr("src", "https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG");
	}
});

const loginContent = document.querySelector("div.login-content");
const nicknameNext = document.querySelector("button.nickname-next");
const interestNext = document.querySelector("button.interest-next");
const joinSuccess = document.querySelector("button.join-success");
const nicknameContent = document.querySelector("div.nickname-content");
const interestContent = document.querySelector("div.interest-content");
const imgContent = document.querySelector("div.img-content");
const joinOk = document.querySelector("div.join-ok");
const nicknameImg = document.querySelector("img.nickname");
const interestImg = document.querySelector("img.interest");
const imgImg = document.querySelector("img.img");

const imgThumbnail = document.querySelector("img.img-example");
const imgFile = document.querySelector("input[id='img-choose']");
const imgDelete = document.querySelector("button.img-delete");

let profileName;

imgFile.addEventListener("change", function(event) {
	let reader = new FileReader();
	reader.readAsDataURL(event.target.files[0]);
	reader.onload = function(event) {
		let url = event.target.result;
		if(url.includes("image")) {
			imgThumbnail.src = url;
		}
		else {
			imgThumbnail.src = "https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG";
		}
	}

	let formData = new FormData();
	let profileInput = $("input[type='file']");
	let profileFiles = profileInput[0].files;
	profileName = $("input[type='file']")[0].files[0].name;

	formData.append("file", profileFiles[0]);

	$.ajax({
		url: "/file/uploadProfile",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: function(fileName) {
			$("#profile-name").val(fileName);
		}
	});
});

imgDelete.addEventListener("click", function() {
	imgFile.value = "";
	imgThumbnail.src = "https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG";

	let path = dateFormat(new Date()) + $("#profile-name").val();
	console.log(path);

	$.ajax({
		url: "/file/deleteProfile",
		type: "DELETE",
		data: {path: path}
	});
});

const $loginBtn = $("button.loginBtn");
const $loginBg = $("div.login-bg");
const $loginContainer = $("div.login-container");
const $xDiv = $("div.login-exit");

$loginBtn.on("click", function () {
	tagCount = 0;
	$loginBg.css("display", "block");
	$loginContainer.css("display", "block");
	$("body").css("overflow", "hidden");
});

// 관심분야 태그 부분
$(function() {
	$(".open-select").click(function() {
		$(".select-box").toggle();
	});
});

// 세부 카테고리
const $cateChildLiAr = $(".select-value");
// 카테고리 클릭시 나오는 block
const $cateBlockAr = $(".cate-block");
// 모두 지우기 버튼
const $clearAll = $(".delete-all-select");
// 해당 카테고리 지우기
const $deleteOneAr = $(".choice-box-value-remove");

// 선택된 태그의 개수
let tagCount = 0;

$cateChildLiAr.each(function() {
	$(this).click(function() {
		let $value = $(this).attr("value");
		$cateBlockAr.each(function() {
			if($(this).attr("value") == $value){
				if($(this).css("display") == "none") {
					tagCount++;
				}
				if(tagCount > 5) {
					alert("최대 5개까지만 선택해 주세요!");
					tagCount--;
				}
				else {
					$(this).show();
				}
			}
		});
		$(".select-box").toggle();
	});
});

// 해당 카테고리 삭제
$cateBlockAr.each(function() {
	$cateBlockAr.children($deleteOneAr).click(function() {
		$(this).parent(".cate-block").hide();
	});
});

$deleteOneAr.on("click", function() {
	tagCount--;
});

// 전체 카테고리 삭제
$clearAll.click(function() {
	$cateBlockAr.hide();
	tagCount = 0;
});

let click = 0;

$xDiv.on("click", function () {
	tagCount = 0;
	click = 0;
	$loginBg.css("display", "none");
	$loginContainer.css("display", "none");
	$(loginContent).css("display", "flex");
	$(nicknameContent).css("display", "none");
	$(interestContent).css("display", "none");
	$(imgContent).css("display", "none");
	$(joinOk).css("display", "none");
	$("body").css("overflow", "visible");
});

// 카카오 로그인 API
// 참고 사이트 : https://tyrannocoding.tistory.com/49
Kakao.init('9410b8b853e1b1969a33820e597a5af6');
// console.log(Kakao.isInitialized());

function kakaoLogin() {
	Kakao.Auth.login({
		success: function (response) {
			Kakao.API.request({
				url: '/v2/user/me',
				success: function (response) {
					let memberEmail = {
						memberEmail : response.kakao_account.email
					}

					$.ajax({
						url:"/member/checkEmail",
						type:"post",
						contentType: "application/json; charset=utf-8",
						data: JSON.stringify(memberEmail),
						success: function(result) {
							if(result) {
								// 로그인
								$("input[name='memberEmail']").val(response.kakao_account.email);
								$("form#loginForm").submit();
							}
							else {
								// 회원가입
								loginContent.style.display = "none";
								nicknameContent.style.display = "flex";

								nicknameNext.addEventListener("click", function() {
									let memberNickname = $("input[name='memberNickname']").val();
									if(memberNickname == "") {
										alert("값을 입력해주세요!");
										return;
									}

									nicknameContent.style.display = "none";
									interestContent.style.display = "flex";
									$("span.nickname").text(memberNickname);
								});

								interestNext.addEventListener("click", function() {
									for(let i = 0; i < $('li.cate-block').length; i++) {
										if ($($('li.cate-block')[i]).css("display") == "list-item") {
											click++;
										}
									}

									if(click == 0) {
										alert("값을 입력해주세요!");
										return;
									}

									interestContent.style.display = "none";
									imgContent.style.display = "flex";
								});

								joinSuccess.addEventListener("click", function() {
									imgContent.style.display = "none";
									joinOk.style.display = "flex";

									let interestsList = "";
									let interest = new Array();
									for(let i = 0; i < $('li.cate-block').length; i++) {
										if ($($('li.cate-block')[i]).css("display") == "list-item") {
											interest.push($($('li.cate-block')[i]).attr("value"));
										}
									}
									interestsList = interest.join(",");

									let memberInfo = {
										memberEmail : response.kakao_account.email,
										memberNickname : $("input[name='memberNickname']").val(),
										memberProfile : $("#profile-name").val(),
										memberInterests : interestsList
									};

									$.ajax({
										url:"/member/join",
										type:"post",
										contentType: "application/json; charset=utf-8",
										data: JSON.stringify(memberInfo)
									})
								});

								nicknameImg.addEventListener("click", function() {
									loginContent.style.display = "flex";
									nicknameContent.style.display = "none";
								});

								interestImg.addEventListener("click", function() {
									nicknameContent.style.display = "flex";
									interestContent.style.display = "none";
								});

								imgImg.addEventListener("click", function() {
									interestContent.style.display = "flex";
									imgContent.style.display = "none";
								});

								joinOk.addEventListener("click", function() {
									$loginBg.css("display", "none");
									$loginContainer.css("display", "none");
									$("body").css("overflow", "visible");
									location.href = "http://localhost:11111/member/main";
								});
							}
						}
					});
				},
				fail: function(error) {
					console.log(error);
				},
			});
		},
		fail: function(error) {
			console.log(error);
		},
	});
}

// 카카오 로그아웃
function kakaoLogout() {
	if(Kakao.Auth.getAccessToken()) {
		Kakao.API.request({
			url: '/v1/user/unlink',
			success: function() {
				$("form#logoutForm").submit();
			}
		});
		Kakao.Auth.setAccessToken(undefined);
	}
}

function logout() {
	kakaoLogout();
}