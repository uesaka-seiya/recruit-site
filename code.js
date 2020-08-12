const ss = SpreadsheetApp.getActiveSpreadsheet();
const usersSheet = ss.getSheetByName("users");
const eventsSheet = ss.getSheetByName("events");
const entryStatusSheet = ss.getSheetByName("entry");
const entryLastRow = entryStatusSheet.getLastRow();

function doGet(e) {
  let page = e.parameter["p"];
  if (page == null) {
    page = "login";
  }
  let template = HtmlService.createTemplateFromFile(page);
  template.userId = e.parameter.id;
  template.eventNum = eventsSheet.getLastRow() - 1;
  template.eventValues = eventsSheet.getRange(2, 2, template.eventNum, 4).getValues();
  return template.evaluate();
}

function include(file) {
  return HtmlService
    .createHtmlOutputFromFile(file).getContent();
}

function loginCheck_gs(id, password) {
  for (let i = 2; i <= usersSheet.getLastRow(); i++) {
    if (id === usersSheet.getRange(i, 1).getValue() && password === usersSheet.getRange(i, 2).getValue()) {
      return getScriptUrl(2) + "&id=" + usersSheet.getRange(i, 1).getValue();
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
  const page = ["signup", "login", "mypage", "event"];
  return ScriptApp.getService().getUrl() + "?p=" + page[i];
}

function getStatus(userId, eventId) {
  var entryDisabled = false;
  var cancelDisabled = true;
  for (let i = 2; i <= entryLastRow; i++) {
    if (userId == entryStatusSheet.getRange(i, 3).getValue() && eventId == entryStatusSheet.getRange(i, 2).getValue()) {
      entryDisabled = true;
      cancelDisabled = false;
      break;
    }
  }
  const disabledStatus = [eventId, entryDisabled, cancelDisabled];
  return disabledStatus;
}

function setEntry(userId, eventId) {
  entryStatusSheet.getRange(entryLastRow + 1, 1).setValue(new Date());
  entryStatusSheet.getRange(entryLastRow + 1, 2).setValue(eventId);
  entryStatusSheet.getRange(entryLastRow + 1, 3).setValue(userId);
  return eventId;
}

function deleteEntry(userId, eventId) {
  for (let i = 2; i <= entryLastRow; i++) {
    if (userId == entryStatusSheet.getRange(i, 3).getValue() && eventId == entryStatusSheet.getRange(i, 2).getValue()) {
      entryStatusSheet.deleteRows(i);
    }
  }
  return eventId;
}
