/* 상단 메뉴 변환 */

var selectCategory = document.getElementsByClassName("select-category");

      function handleClick(event) {

        if (event.target.classList[1] === "select-subject") {
          /* event.target.classList.remove("select-subject");
          $(".yellow-line").remove(); */
        } else {
            for (var i = 0; i < selectCategory.length; i++) {
                selectCategory[i].classList.remove("select-subject");
                $(".yellow-line").remove();
          }

          event.target.classList.add("select-subject");
          $(event.target).append(
            $('<div/>', {
              class: 'yellow-line',
            }),
          );
        }

      }

      function init() {
        for (var i = 0; i < selectCategory.length; i++) {
            selectCategory[i].addEventListener("click", handleClick);
        }
      }

      init();

/* ----------------------------------------------------------------------- */
/* 상단 메뉴 누르면 하단 내용 변환 */

      $(function(){
        $(".my-create").click(function(){
            $(".main-box").hide();
            $(".my-create-box").css('display', 'flex').show();
        });
        $(".my-activity").click(function(){
            $(".main-box").hide();
            $(".my-activity-box").css('display', 'flex').show();
        });
        $(".my-favorite").click(function(){
            $(".main-box").hide();
            $(".my-favorite-box").css('display', 'flex').show();
        });
        $(".my-waiting").click(function(){
            $(".main-box").hide();
            $(".my-waiting-box").css('display', 'flex').show();
        });
        
      });

/* -------------------------------------------------------------------------- */


