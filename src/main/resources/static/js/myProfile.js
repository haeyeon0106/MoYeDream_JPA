
$(function() {
	$(".open-selectt").click(function() {
		$(".select-boxx").toggle();
	});
});

/* 세부 카테고리 */
const $cateChildLiArr = $(".select-valuee");

// 카테고리 클릭시 나오는 block
const $cateBlockArr = $(".cateBlockk");

// 모두 지우기 버튼
const $clear = $(".delete-all-selectt");

// 해당 카테고리 지우기
const $deleteOneArr = $(".choice-box-value-removee");

// 선택된 태그의 개수
let tagCount2 = 0;

// 받아올 카테고리의 배열
let memberInterestsArr = [];

$(document).ready(function() {
	if(memberInterests != null) {
		memberInterestsArr = memberInterests.split(',');

		/*관심 분야 받아오기*/
		for (let i in memberInterestsArr){
			if(memberInterestsArr[i] == 'culture'){
				$(".culture").show();
				tagCount2++;
			}
			else if(memberInterestsArr[i] == 'sports'){
				$(".sports").show();
				tagCount2++;
			}
			else if(memberInterestsArr[i] == 'programming'){
				$(".programming").show();
				tagCount2++;
			}
			else if(memberInterestsArr[i] == 'foreign'){
				$(".foreign").show();
				tagCount2++;
			}
			else if(memberInterestsArr[i] == 'science'){
				$(".science").show();
				tagCount2++;
			}
			else if(memberInterestsArr[i] == 'finance'){
				$(".finance").show();
				tagCount2++;
			}
			else if(memberInterestsArr[i] == 'politics'){
				$(".politics").show();
				tagCount2++;
			}
			else if(memberInterestsArr[i] == 'certificate'){
				$(".certificate").show();
				tagCount2++;
			}
			else if(memberInterestsArr[i] == 'officiary'){
				$(".officiary").show();
				tagCount2++;
			}
			else if(memberInterestsArr[i] == 'employment'){
				$(".employment").show();
				tagCount2++;
			}
		}
	}

	$cateBlockArr.each(function() {
		if($(this).css("display") == "block") {
			tagCount2++;
			console.log(tagCount2);
		}
	});


});

$cateChildLiArr.each(function(){
	$(this).click(function(){
		let $value = $(this).attr("value");
        $cateBlockArr.each(function(){
			if($(this).attr("value") == $value){
				if($(this).css("display") == "none") {
					tagCount2++;
				}
				if(tagCount2 > 5) {
					alert("최대 5개까지만 선택해 주세요!");
					tagCount2--;
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
$cateBlockArr.each(function(){
	$cateBlockArr.children($deleteOneArr).click(function(){
		$(this).parent(".cateBlockk").hide();
	});
});

$deleteOneArr.on("click", function() {
	tagCount2--;
});

// 전체 카테고리 삭제
$clear.click(function(){
	$cateBlockArr.hide();
	tagCount2 = 0;
});



/* 회원탈퇴 창*/
$(function(){
	$(".button-withdraw").click(function(){
		$("#root").css('opacity', '0.5');
		$(".delete-confirm-window").show();
	});
	$(".cancelButton_cancelButton__1wL0W").click(function(){
		$(".delete-confirm-window").hide();
		$("#root").css('opacity', '1');
	});
});



