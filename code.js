function doGet(e) {
  var page = e.parameter["p"];
  if (page == "login" || page == null) {
    return HtmlService.createTemplateFromFile("login").evaluate();
  } else if (page == "mypage") {
    var template = HtmlService.createTemplateFromFile("mypage");
    var id = e.parameter.id;
    template.id = id;
    return template.evaluate();
  } else if (page == "event") {
    return HtmlService.createTemplateFromFile("event").evaluate();
  } else if (page == "signup") {
    return HtmlService.createTemplateFromFile("signup").evaluate();
  }
}

function include(file) {
  return HtmlService
    .createHtmlOutputFromFile(file).getContent();
}

function loginCheck_gs(loginId, loginPassword) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("loginCheck");
  for (let i = 2; i <= sheet.getLastRow(); i++) {
    if (loginId === sheet.getRange(i, 1).getValue()) {
      if (loginPassword === sheet.getRange(i, 2).getValue()) {
        return getScriptUrl(2) + "&id=" + sheet.getRange(i, 1).getValue();
      }
    }
  }
  throw "IDまたはパスワードが誤りです";
}

function getUserName(id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("loginCheck");
  for (let i = 2; i <= sheet.getLastRow(); i++) {
    if (id === sheet.getRange(i, 1).getValue()) {
      return sheet.getRange(i, 3).getValue();
    }
  }
}

function getScriptUrl(i) {
  const URL = ScriptApp.getService().getUrl();
  const page = ["signup", "login", "mypage", "event",];
  return URL + "?p=" + page[i];
}
