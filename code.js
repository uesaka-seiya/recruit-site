const ss = SpreadsheetApp.getActiveSpreadsheet();
const usersSheet = ss.getSheetByName("users");

function doGet(e) {
  let page = e.parameter["p"];
  if (page == null) {
    page = "login";
  }
  let template = HtmlService.createTemplateFromFile(page);
  template.userId = e.parameter.id;
  return template.evaluate();
}

function include(file) {
  return HtmlService
    .createHtmlOutputFromFile(file).getContent();
}

/**
 * 新規ユーザー情報をDBに登録する
 *
 * @param {*} userid
 * @param {*} password
 * @param {*} name
 * @param {*} address
 * @param {*} tel
 * @param {*} school
 * @throw 登録済みIDを入力しようとすると再入力を求める
 */
function setUserData(userid, password, name, address, tel, school) {
  for (let i = 2; i <= usersSheet.getLastRow(); i++) {
    if (userid == usersSheet.getRange(i, 1).getValue()) {
      throw "このIDはすでに使われています。別のIDを再入力してください。";
    } else {
      const user = [[userid, password, name, address, tel, school]];
      usersSheet.getRange(usersSheet.getLastRow() + 1, 1, 1, 6).setValues(user);
      console.log(usersSheet.getRange(1, usersSheet.getLastRow(), 1, 6).getValues());
      return getScriptUrl(2) + "&id=" + userid;
    }
  }
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
