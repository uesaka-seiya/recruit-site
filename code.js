const ss = SpreadsheetApp.getActiveSpreadsheet();
const users = ss.getSheetByName("loginCheck");

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

function loginCheck_gs(id, password) {
  for (let i = 2; i <= users.getLastRow(); i++) {
    if (id === users.getRange(i, 1).getValue() && password === users.getRange(i, 2).getValue()) {
      return getScriptUrl(2) + "&id=" + users.getRange(i, 1).getValue();
    }
  }
  throw "IDまたはパスワードが誤りです";
}

function getUserName(id) {
  for (let i = 2; i <= users.getLastRow(); i++) {
    if (id === users.getRange(i, 1).getValue()) {
      return users.getRange(i, 3).getValue();
    }
  }
}

function getScriptUrl(i) {
  const page = ["signup", "login", "mypage", "event"];
  return ScriptApp.getService().getUrl() + "?p=" + page[i];
}

function setJoin(id, col, value) {
  for (let i = 2; i <= users.getLastRow(); i++) {
    if (id == users.getRange(i, 1).getValue()) {
      users.getRange(i, col).setValue(value);
      return "処理を完了しました.";
    }
  }
}
