$(function(){
    $(".delete-button").click(function(){
        $(".delete-button").hide();
        $(".all-delete-button").show();
        $(".not-delete-button").show();
        $(".delete-checkbox").show();
    });
    
    $(".not-delete-button").click(function(){
        $(".not-delete-button").hide();
        $(".all-delete-button").hide();
        $(".delete-button2").hide();
        $("input[name=chk]").prop("checked", false);
        $(".delete-checkbox").hide();
        $(".delete-button").show();
    });
    
    $(".all-delete-button").click(function() {
        $("input[name=chk]").prop("checked", true);
        $(".all-delete-button").hide();
        $(".delete-button2").show();        
	});
    
    $('.question-list input[name=chk]').click(function(){
        var tmpp = $(this).prop('checked'); 
        
        var tt=$("input[name=chk]:checked").length;
        
        if(tmpp==true || tt>0){
            $(".all-delete-button").hide();
            $(".delete-button2").show();        
        }else{
            $(".delete-button2").hide();        
            $(".all-delete-button").show();
        }
    });
    
    





});







