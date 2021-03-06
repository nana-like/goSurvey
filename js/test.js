$(function () {
  var commonEvt = function () {
    $(".able-delete").each(function () {
      if ($(this).val().length > 0) {
        $(this)
          .next(".button-search-delete")
          .addClass("active");
      } else {
        $(this)
          .next(".button-search-delete")
          .removeClass("active");
      }
    });
    $(".able-delete").on("change keyup", function () {
      if ($(this).val().length > 0) {
        $(this)
          .next(".button-search-delete")
          .addClass("active");
      } else {
        $(this)
          .next(".button-search-delete")
          .removeClass("active");
      }
    });

    $(".button-search-delete").on("click", function () {
      $(this)
        .removeClass("active")
        .prev(".able-delete")
        .val("")
        .focus();
    });

    // 드롭다운 버튼 클릭 시 콤보박스 표시
    $(".button-dropdown").on("click", function (e) {
      e.preventDefault();
      $(this)
        .parents(".voters-dropdown-container")
        .toggleClass("active");
    });
  };

  var myPollsEvt = function () {
    var pollListType = {
      active: "참여 가능한 설문입니다.",
      inactive: "참여 불가능한 설문입니다.",
      upcoming: "곧 참여 가능한 설문입니다.",
      complete: "설문이 완료되었습니다.",
      finished: "설문이 마감되었습니다."
    };

    function showRandomPoll(obj) {
      var result;
      var count = 0;
      for (var prop in obj)
        if (Math.random() < 1 / ++count) result = prop;
      return result;
    }

    $(".myPolls .tabmenu-item").on("click", function () {
      //[*] 클릭한 탭에 active 클래스를 추가
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });

    $(".myPolls .fab").on("click", function () {
      //[*] poll list item 추가
      var type = showRandomPoll(pollListType);
      var typeDescription = pollListType[type];
      var percent = Math.floor(Math.random() * 100);
      var pollListItem = `
      <div class="poll-list-item poll-${type}">
        <button>
          <div class="poll-info-top">
            <p class="poll-title">신입생 환영회 장소를 선택해주세요.</p><p class="poll-process"><span class="text">진행률</span><span class="percent">${percent}</span><em class="symbol">%</em></p>
          </div>
          <div class="poll-info-bottom">
            <i class="poll-icon"></i>
            <div class="container">
              <div class="poll-owner">
                <i class="icon icon-person"></i><span>ekbae</span>
              </div>
              <p class="poll-description">${typeDescription}</p>
            </div>
            <p class="poll-duedate">2019.03.06 시작</p>
          </div>
        </button>
      </div>`;
      $(".poll-list").append(pollListItem);

      if ($(".poll-list").children().length > 0) {
        //[*] poll-list 안에 poll-list-item이 하나라도 추가되면 init 클래스 제거
        $(".poll-list-container").removeClass("init");
        $(".fab").removeClass("fab-style02");
        $(".fab").addClass("fab-style01");
      }
    });
  };

  var createEvt = function () {
    //투표 종료 조건 변경에 따른 UI
    $('input[name="endCondition"]').on("click", function () {
      if ($("#endCondition-date:checked").length > 0) {
        $(".set-endCondition-area")
          .removeClass("people")
          .addClass("date");
      } else if ($("#endCondition-people:checked").length > 0) {
        $(".set-endCondition-area")
          .removeClass("date")
          .addClass("people");
      }
    });

    //투표 타입 설정에 따른 UI
    $('input[name^="votingItemType"]').on("click", function () {
      if ($(this).parent().find("[id^='votingItemType-choice']:checked").length > 0) {
        console.log($("[id^='votingItemType-choice']:checked"))
        console.log("객관식!!!")
        $(this).parents(".set-votingItemType-area").removeClass("type-answer").addClass("type-choice");
      } else if ($(this).parent().find("[id^='votingItemType-answer']:checked").length > 0) {
        console.log("주관식!!!")
        $(this).parents(".set-votingItemType-area")
          .removeClass("type-choice")
          .addClass("type-answer");
      }
    });

    //날짜값 있을 시 init 제거
    $(document).on("change", "input[type='datetime-local']", function () {
      if ($(this).val() !== "") {
        var date = $(this).val();
        $(this)
          .parent()
          .removeClass("init");
        $(this)
          .parent()
          .find(".create-date")
          .text(
            date.slice(0, 4) +
            "년 " +
            date.slice(5, 7) +
            "월 " +
            date.slice(8, 10) +
            "일 "
          );
      } else {
        $(this)
          .parent()
          .addClass("init");
        $(this)
          .parent()
          .find(".create-date")
          .empty();
      }
    });

    $(document).on("click", ".button-date-delete", function () {
      console.log("!");
      $(this)
        .parent()
        .find(".create-date")
        .empty();
      $(this)
        .parent()
        .find("input")
        .val("");
      $(this)
        .parent()
        .addClass("init");
    });

    //학과 또는 부서 선택 시 칩 노출
    $(".dropdown-ui-department .dropdown-item").on("click", function (e) {
      e.preventDefault();
      var name = $(this).text();
      var newVotersList = `
        <div class="voters-list">
          <p class="text">${name}</p>
          <button class="voters-list-delete"></button>
        </div>
      `;

      $(this)
        .parent()
        .prev()
        .children(".voters-list-container")
        .append(newVotersList);
    });

    //개별 대상 검색 시 드롭다운 노출
    $(".create .search-box-style02").on("keyup", function () {
      var val = $(this).val();
      if (val.length > 0) {
        $(this)
          .parents(".voters-dropdown-container")
          .addClass("active");
      } else {
        $(this)
          .parents(".voters-dropdown-container")
          .removeClass("active");
      }
    });

    // Question 여닫기 (go survey 추가)
    $(".question-title").on("click", function (e) {
      var x = e.target.parentNode;
      x.classList.contains("closed") ? x.classList.remove("closed") : x.classList.add("closed");
    });

    //voters-list-delete 이벤트
    $(document).on("click", ".voters-list-delete", function (e) {
      e.preventDefault();
      $(this)
        .parent()
        .remove();
    });
  };

  $(window).on("load", function () {
    commonEvt();
    myPollsEvt();
    createEvt();
  });

  var selectboxEvent = function () {
    var $selectBox = $(".selectbox");

    $selectBox.on("mousedown", function (event) {
      var selectData = $(this).data("ui-id");
      var selectId = selectData
        .split("-")
        .slice(1)
        .join("-")
        .toString();
      var input = $("input").data("ui-id");
      $("input[data-ui-id='input-" + selectId + "']").focus();

      if (event.target.nodeName == "LI") {
        var selectContent = event.target.dataset.uiContent;
        $("input[data-ui-id='input-" + selectId + "']").attr(
          "value",
          selectContent
        );
        $(".login-area-email-info").addClass("active");
      }
    });
    $(".select-item").on("click", function (evt) {
      evt.stopPropagation();
    });

    $("body").on("click", function () {
      var $selectItem = $(".select-item");
      if ($selectItem.hasClass("active")) {
        $selectItem.removeClass("active");
        $selectItem.find(".selectbox").removeClass("active");
      }
    });
  };

  var selectItemClickEvent = function () {
    var $selectItem = $(".select-item");

    $selectItem.on("click", function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      } else {
        $selectItem.removeClass("active");
        $(this).addClass("active");
      }
    });
  };

  $(window).on("load", function () {
    selectboxEvent();
    selectItemClickEvent();
  });
});