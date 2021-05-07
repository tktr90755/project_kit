$(function($){
  $( "#sns_line" ).click( shareOfLine );
  $( "#sns_twitter" ).click( shareOfTwitter );
  $( "#sns_facebook" ).click( shareOfFacebook );
});

//__________________________________________________________________________________
// sns
function shareOfLine(){
  let shareUrl = "";
  let message = encodeURIComponent("TEST\n http://test.jp/ \n#test");
  let lineUrl = "http://line.me/R/msg/text/?" + message + " " + shareUrl;
  window.open().location.href = lineUrl;
};

function shareOfTwitter(){
  let shareUrl = "";
  let message = encodeURIComponent("TEST\n http://test.jp/ \n#test");
  let hashTag = "";
  let twitterUrl = "https://twitter.com/intent/tweet?url=" + shareUrl + "&text=" + message;
  window.open().location.href = twitterUrl;
};

function shareOfFacebook(){
  let shareUrl = "http://test.jp/";
  let facebookUrl = "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl;
  window.open().location.href = facebookUrl;
};
