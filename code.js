const ss = SpreadsheetApp.getActiveSpreadsheet();
const usersSheet = ss.getSheetByName("loginCheck");

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
  for (let i = 2; i <= usersSheet.getLastRow(); i++) {
    if (loginId === usersSheet.getRange(i, 1).getValue()) {
      if (loginPassword === usersSheet.getRange(i, 2).getValue()) {
        return getScriptUrl(2) + "&id=" + usersSheet.getRange(i, 1).getValue();
      }
    }
  }
  throw "IDまたはパスワードが誤りです";
}

function getUserName(id) {
  for (let i = 2; i <= usersSheet.getLastRow(); i++) {
    if (id === usersSheet.getRange(i, 1).getValue()) {
      return usersSheet.getRange(i, 3).getValue();
    }
  }
}

function getScriptUrl(i) {
  const URL = ScriptApp.getService().getUrl();
  const page = ["signup", "login", "mypage", "event",];
  return URL + "?p=" + page[i];
}
