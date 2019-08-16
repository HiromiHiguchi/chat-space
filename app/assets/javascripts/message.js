$(function(){
  function buildHTML(message){
  var image = message.image.url? `<img src="${message.image.url}">` : "";
  var html = `<div class="contents__chat-right-side__messages__message">
                <div class="contents__chat-right-side__messages__message__upper-info">
                    <div class="contents__chat-right-side__messages__message__upper-info__talker">
                        ${ message.user_name }
                    </div>
                    <div class="contents__chat-right-side__messages__message__upper-info__date">
                        ${ message.time }
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
})