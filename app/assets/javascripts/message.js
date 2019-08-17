$(function(){
  function buildHTML(message){
  var image = message.image? `<img src="${message.image}">` : "";
  var html = `<div class="contents__chat-right-side__messages__message" data-message-id="${message.id}">
                <div class="contents__chat-right-side__messages__message__upper-info">
                    <div class="contents__chat-right-side__messages__message__upper-info__talker">
                        ${ message.user_name }
                    </div>
                    <div class="contents__chat-right-side__messages__message__upper-info__date">
                        ${ message.date }
                    </div>
                  </div>
                </div>
                <div class="contents__chat-right-side__messages__message__text">
                    <p class="contents__chat-right-side__messages__message__text">
                        ${ message.content }
                        ${image}
                    </p>
                </div>`
        return html; 
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
      })

      .done(function(data){
        var html = buildHTML(data);
        $('.contents__chat-right-side__messages').append(html);
        $("form")[0].reset();
        $('.form__submit').prop('disabled', false);
        $('.contents__chat-right-side__messages').animate({ scrollTop: $('.contents__chat-right-side__messages')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert('error')
        $('.form__submit').prop('disabled', false);
      })
  })
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.contents__chat-right-side__messages__message:last').data("message-id");
      // var group_id = $(".group").data("group-id");

      // var reloadMessages = function () {
      //   if (window.location.href.match(/\/groups\/\d+\/messages/)){
      //     var last_id = $('.message:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {last_id: last_message_id}
    })

      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.contents__chat-right-side__messages').append(insertHTML);
        })
        $('.contents__chat-right-side__messages').animate({scrollTop: $('.contents__chat-right-side__messages')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      })
  };
};
setInterval(reloadMessages, 5000);
});