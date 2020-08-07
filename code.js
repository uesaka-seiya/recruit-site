function doGet(e) {
  let page = e.parameter["p"];
  if (page == null) {
    page = "login";
  }
  let template = HtmlService.createTemplateFromFile(page);
  template.id = e.parameter.id;
  return template.evaluate();
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
