var dateInputRef = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');



function reverseStr(str) {
    var listofchars = str.split("");
    var reverselistofchars = listofchars.reverse();
    var reversedstr = reverselistofchars.join("");
    return reversedstr;
  }
  
  function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
  }
  
  function convertDateToStr(date) {
    var dateStr = { day: "", month: "", year: "" };
  
    if (date.day < 10) {
      dateStr.day = "0" + date.day;
    } else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = "0" + date.month;
    } else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
  
    return dateStr;
  }
  
  function getAlldateFormats(date) {
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  function checkPalindromefordformats(date) {
    var listofpalindromes = getAlldateFormats(date);
  
    var flag = false;
  
    for (var i = 0; i < listofpalindromes.length; i++) {
      if (isPalindrome(listofpalindromes[i])) {
        flag = true;
        break;
      }
    }
  
    return flag;
  }
  
  function isLeapyear(year) {
    if (year % 400 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    if (year % 4 === 0) {
      return true;
    }
    return false;
  }
  
  function getNextdate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysinmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapyear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        } else {
          if (day > 28) {
            day = 1;
            month++;
          }
        }
      }
    } else {
      if (day > daysinmonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    };
  }
  
  function getnextpalindromedate(date) {
    var ctr = 0;
    var nextDate = getNextdate(date);
  
    while (1) {
      ctr++;
      var ifisPalindrome = checkPalindromefordformats(nextDate);
      if (ifisPalindrome) {
        break;
      }
      nextDate = getNextdate(nextDate);
    }
  
    return [ctr, nextDate];
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
      
      var isaPalindrome = checkPalindromefordformats(date);
  
      if(isaPalindrome){
         resultRef.innerText = 'Yay! your birthday is a palindrome!! 🥳';
      }
      else {
        var [ctr, nextDate] = getnextpalindromedate(date);
  
        resultRef.innerText = "The next palindrome date is "+nextDate.day+"-"+nextDate.month+"-"+nextDate.year+ " ,you missed it by "+ctr+" days! 😔";
      }
    }
    else{
      resultRef.innerText = 'Please enter the Birthdate';
    }
  }
  
  showBtnRef.addEventListener('click', clickHandler);