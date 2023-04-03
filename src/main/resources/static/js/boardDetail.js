
let postCommentService = (function(){

    // 댓글 목록 불러오기
    function getList(postNumber, callback){
        $.getJSON("/postReply/list/"+ postNumber, function(list){
            if(callback){
                callback(list);
            }
        });
    }

    // 댓글 등록
    function register(param, callback){
        console.log("js : register.....");
        $.ajax({
            url : "/postReply/register",
            type : "post",
            data : JSON.stringify(param),
            contentType: "application/json",
            success : function(){
                if(callback){
                    console.log("댓글 등록 성공");
                    callback();
                }
            }
        });
    }

    // 댓글 수정
    function modify(param, callback){
        console.log("js.modify,....");
        $.ajax({
            url : "/postReply/modify",
            type : "post",
            data : JSON.stringify(param),
            contentType : "application/json",
            success : function(comment){
                if(callback){
                    callback(comment);
                };
            }
        });
    }

    // 댓글 삭제 
    function remove(postCommentNumber, callback){
        console.log("js remove.......");
        $.ajax({
            url : "/postReply/remove/"+postCommentNumber ,
            type : "delete",
            success : function(){
                if(callback){
                    callback();
                }
            }
        })
    };

    // 게시물의 댓글 개수 가져오기
    function getTotal(postNumber, callback){
        console.log("js getTotal......");
        $.getJSON("/postReply/total/" + postNumber, function(result){
            if(callback){
                callback(result);
            }
        })
    };

return {getList: getList, register: register, modify: modify, remove: remove, getTotal:getTotal };
})();