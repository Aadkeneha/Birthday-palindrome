var dateInputRef = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');

function isPalindrome(str) {
  var reversedStr = str.split('').reverse().join('');
 
  return (str === reversedStr);
}

function convertDatetoString(date) {

  var dateStr = { day: '', month: '', year: '' };

  if (date.day < 10) {
    dateStr.day = '0' + date.day;
  }
  else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = '0' + date.month;
  }
  else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}


function getalldateformats(date) {

  var dateStr = convertDatetoString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return { ddmmyyyy: ddmmyyyy, ddmmyy: ddmmyy, mmddyyyy: mmddyyyy, mmddyy: mmddyy, yyyymmdd: yyyymmdd, yymmdd: yymmdd };
}


function checkPalindromedatesofallformats(date) {
  var status = false;
  var listofdates = getalldateformats(date);
  var list1 = Object.values(listofdates);
  var keylist1 = Object.keys(listofdates);

  for (var i = 0; i < list1.length; i++) {
    if (isPalindrome(list1[i])) {
      status = true;
      var format = keylist1[i] + ":" + list1[i];
      break;
    }
  }

  return [format, status];
}

function isLeapyear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}


function getNextDate(date) {

  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapyear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  }
  else {
    if (day > daysInmonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }

  return { day: day, month: month, year: year };
}

function getPreviousdate(date) {

  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (isLeapyear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    }
    else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  }
  else {
    if (day < 1) {
      day = daysInmonth[month - 1];
      month--;
    }
  }
  if (month < 1) {
    month = 12;
    year--;
  }

  return { day: day, month: month, year: year };

}

function nearestpalindrome(date) {
  var count = 0;
  var nextdate = getNextDate(date);
  var prevdate = getPreviousdate(date);

  while (1) {
    count++;
    if (checkPalindromedatesofallformats(nextdate)[1] == true) {
      var format = checkPalindromedatesofallformats(nextdate)[0];
      return[count, nextdate, format];
      break;
    }
    else {

      if (checkPalindromedatesofallformats(prevdate)[1] === true) {
        var format = checkPalindromedatesofallformats(prevdate)[0];
        return [count, prevdate, format];
        break;
      }

    }
    nextdate = getNextDate(nextdate);
    prevdate = getPreviousdate(prevdate);

  }

}


function maincheckpalindrome(date) {

  if (checkPalindromedatesofallformats(date)[1] === false) {
      var nearestdate=nearestpalindrome(date);
      resultRef.textContent=`you missed palindrome by ${nearestdate[0]} days and the nearest palindrome is ${nearestdate[1].day}-${nearestdate[1].month}-${nearestdate[1].year} for format ${nearestdate[2]} `;
    }else {

    resultRef.textContent=`Yay!! its a palindrome for format ${checkPalindromedatesofallformats(date)[0]}`;

  }
}


function clickHandler(e){
    var bdayStr = dateInputRef.value; 
    
    if(bdayStr !== ''){
      var listOfDate = bdayStr.split('-'); 
  
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      }
      
      var isaPalindrome = maincheckpalindrome(date);

    }
    else{
      resultRef.textContent = 'Please enter the Birthdate';
    }
}


showBtnRef.addEventListener('click', clickHandler);



