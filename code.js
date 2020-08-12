const ss = SpreadsheetApp.getActiveSpreadsheet();
const usersData = ss.getSheetByName("users");
const eventData = ss.getSheetByName("events");
const entryData = ss.getSheetByName("entry");

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
  for (let i = 2; i <= usersData.getLastRow(); i++) {
    if (id === usersData.getRange(i, 1).getValue() && password === usersData.getRange(i, 2).getValue()) {
      return getScriptUrl(2) + "&id=" + usersData.getRange(i, 1).getValue();
    }
  }
  throw "IDまたはパスワードが誤りです";
}

function getUserName(id) {
  for (let i = 2; i <= usersData.getLastRow(); i++) {
    if (id === usersData.getRange(i, 1).getValue()) {
      return usersData.getRange(i, 3).getValue();
    }
  }
}

function getScriptUrl(i) {
  const page = ["signup", "login", "mypage", "event"];
  return ScriptApp.getService().getUrl() + "?p=" + page[i];
}

function setEntry(userId, eventId) {
  const lastRow = entryData.getLastRow();
  entryData.getRange(lastRow + 1, 1).setValue(new Date());
  entryData.getRange(lastRow + 1, 2).setValue(eventId);
  entryData.getRange(lastRow + 1, 3).setValue(userId);
  const result = ["処理を完了しました", eventId];
  return result;
}

function deleteEntry(userId, eventId) {
  for (let i = 2; i <= entryData.getLastRow(); i++) {
    if (userId == entryData.getRange(i, 3).getValue() && eventId == entryData.getRange(i, 2).getValue()) {
      entryData.deleteRows(i);
    }
  }
  const result = ["キャンセルしました", eventId];
  return result;
}
