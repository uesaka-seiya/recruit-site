function doGet(e) {
  var page = e.parameter["p"];
  if (page == "login" || page == null) {
    return HtmlService.createTemplateFromFile("login").evaluate();
  } else if (page == "mypage") {
    return HtmlService.createTemplateFromFile("mypage").evaluate();
  }
}

function include(file) {
  return HtmlService
    .createHtmlOutputFromFile(file).getContent();
}
