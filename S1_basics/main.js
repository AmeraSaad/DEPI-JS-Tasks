function printNumber() {
  let number = document.getElementById('numberInput').value;
  document.getElementById('output1').innerHTML = `You entered: ${number}`;
}

function checkDivisibility() {
  let number = document.getElementById('divisibleInput').value;
  if (number % 3 === 0 && number % 4 === 0) {
      document.getElementById('output2').innerHTML = 'yes';
  } else {
      document.getElementById('output2').innerHTML = 'no';
  }
}

function findMax() {
  let num1 = parseInt(document.getElementById('num1').value);
  let num2 = parseInt(document.getElementById('num2').value);
  let max = (num1 > num2) ? num1 : num2;
  document.getElementById('output3').innerHTML = `Max number: ${max}`;
}

// Task 4: Check if integer is negative or positive
function checkPositiveNegative() {
  let number = parseInt(document.getElementById('integerInput').value);
  if (number < 0) {
      document.getElementById('output4').innerHTML = 'Negative';
  } else {
      document.getElementById('output4').innerHTML = 'Positive';
  }
}

// Task 5: Find Max and Min of 3 integers
function findMinMax() {
  let num1 = parseInt(document.getElementById('num3').value);
  let num2 = parseInt(document.getElementById('num4').value);
  let num3 = parseInt(document.getElementById('num5').value);
  let max = Math.max(num1, num2, num3);
  let min = Math.min(num1, num2, num3);
  document.getElementById('output5').innerHTML = `Max number: ${max}, Min number: ${min}`;
}

// Task 6: Check if integer is even or odd
function checkEvenOdd() {
  let number = parseInt(document.getElementById('numberInput').value);
  if (number % 2 === 0) {
      document.getElementById('output6').innerHTML = 'Even';
  } else {
      document.getElementById('output6').innerHTML = 'Odd';
  }
}

// Task 7: Check if character is vowel or consonant
function checkVowelConsonant() {
  let char = document.getElementById('charInput').value.toLowerCase();
  if (['a', 'e', 'i', 'o', 'u'].includes(char)) {
      document.getElementById('output7').innerHTML = 'Vowel';
  } else {
      document.getElementById('output7').innerHTML = 'Consonant';
  }
}

// Task 8: Print numbers from 1 to entered number
function printNumbersInRange() {
  let number = parseInt(document.getElementById('numberRangeInput').value);
  let output = '';
  for (let i = 1; i <= number; i++) {
      output += i + ' ';
  }
  document.getElementById('output8').innerHTML = output;
}

// Task 9: Print multiplication table of entered number up to 12
function printMultiplicationTable() {
  let number = parseInt(document.getElementById('multiplicationInput').value);
  let output = '';
  for (let i = 1; i <= 12; i++) {
      output += `${number} x ${i} = ${number * i} <br>`;
  }
  document.getElementById('output9').innerHTML = output;
}

// Task 10: Print all even numbers between 1 and entered number
function printEvenNumbers() {
  let number = parseInt(document.getElementById('evenNumberInput').value);
  let output = '';
  for (let i = 1; i <= number; i++) {
      if (i % 2 === 0) {
          output += i + ' ';
      }
  }
  document.getElementById('output10').innerHTML = output;
}

// Task 11: Calculate power of two numbers
function calculatePower() {
  let base = parseInt(document.getElementById('baseInput').value);
  let exponent = parseInt(document.getElementById('exponentInput').value);
  let result = Math.pow(base, exponent);
  document.getElementById('output11').innerHTML = `${base}^${exponent} = ${result}`;
}

// Task 12: Calculate total, average, and percentage of marks
function calculateMarks() {
  let physics = parseInt(document.getElementById('physicsMarks').value);
  let chemistry = parseInt(document.getElementById('chemistryMarks').value);
  let biology = parseInt(document.getElementById('biologyMarks').value);
  let math = parseInt(document.getElementById('mathMarks').value);
  let computer = parseInt(document.getElementById('computerMarks').value);

  let total = physics + chemistry + biology + math + computer;
  let average = total / 5;
  let percentage = (total / 500) * 100;

  document.getElementById('output12').innerHTML = `Total Marks: ${total}<br>Average Marks: ${average}<br>Percentage: ${percentage}%`;
}

// Task 13: Calculate days in a month based on month number
function calculateDaysInMonth() {
  let month = parseInt(document.getElementById('monthInput').value);
  let days;

  switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
          days = 31;
          break;
      case 4:
      case 6:
      case 9:
      case 11:
          days = 30;
          break;
      case 2:
          days = 28; // Assuming non-leap year
          break;
      default:
          days = 'Invalid month';
  }

  document.getElementById('output13').innerHTML = `Number of days in month ${month}: ${days}`;
}

// Task 14: Calculate percentage and grade based on marks of five subjects
function calculatePercentageAndGrade() {
  let physics = parseInt(document.getElementById('physicsMarks2').value);
  let chemistry = parseInt(document.getElementById('chemistryMarks2').value);
  let biology = parseInt(document.getElementById('biologyMarks2').value);
  let math = parseInt(document.getElementById('mathMarks2').value);
  let computer = parseInt(document.getElementById('computerMarks2').value);

  let total = physics + chemistry + biology + math + computer;
  let percentage = (total / 500) * 100;

  let grade;
  if (percentage >= 90) {
      grade = 'A';
  } else if (percentage >= 80) {
      grade = 'B';
  } else if (percentage >= 70) {
      grade = 'C';
  } else if (percentage >= 60) {
      grade = 'D';
  } else {
      grade = 'F';
  }

  document.getElementById('output14').innerHTML = `Percentage: ${percentage.toFixed(2)}%<br>Grade: ${grade}`;
}

//15
function executeSwitchCase() {
  let caseNumber = parseInt(document.getElementById('caseInput').value);
  let output;

  switch (caseNumber) {
      case 1:
          output = calculateDaysInMonth();
          break;
      case 2:
          output = checkVowelConsonant();
          break;
      case 3:
          output = findMax();
          break;
      case 4:
          output = checkEvenOdd();
          break;
      case 5:
          output = checkPositiveNegative();
          break;
      case 6:
          output = calculateSimpleCalculator();
          break;
      default:
          output = 'Invalid case number';
  }

  document.getElementById('output15').innerHTML = output;
}

// Task 16: Print numbers 1 to 10 using loop
function printNumbers1to10() {
  let output = '';
  for (let i = 1; i <= 10; i++) {
      output += i + ' ';
  }
  document.getElementById('output16').innerHTML = output;
}

// Task 17: Calculate sum of first 10 natural numbers using loop
function calculateSumOfFirst10() {
  let sum = 0;
  for (let i = 1; i <= 10; i++) {
      sum += i;
  }
  document.getElementById('output17').innerHTML = `Sum of first 10 natural numbers: ${sum}`;
}

// Task 18: Print even numbers between 1 and 20 using loop
function printEvenNumbers1to20() {
  let output = '';
  for (let i = 2; i <= 20; i += 2) {
      output += i + ' ';
  }
  document.getElementById('output18').innerHTML = output;
}

// Task 19: Calculate factorial of a number using loop
function calculateFactorial() {
  let number = parseInt(document.getElementById('factorialInput').value);
  let factorial = 1;
  for (let i = 1; i <= number; i++) {
      factorial *= i;
  }
  document.getElementById('output19').innerHTML = `Factorial of ${number}: ${factorial}`;
}

// Task 20: Reverse a string using loop
function reverseString() {
  let inputString = document.getElementById('reverseStringInput').value;
  let reversedString = '';
  for (let i = inputString.length - 1; i >= 0; i--) {
      reversedString += inputString[i];
  }
  document.getElementById('output20').innerHTML = `Reversed String: ${reversedString}`;
}

// Task 21: Print elements of an array using loop
function printArrayElements() {
  let array = [1, 2, 3, 4, 5]; 
  let output = 'Array Elements: ';
  for (let i = 0; i < array.length; i++) {
      output += array[i] + ' ';
  }
  document.getElementById('output21').innerHTML = output;
}

// Task 22: Find maximum number in an array using loop
function findMaxInArray() {
  let array = [60, 20, 2, 30, 1]; 
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
      if (array[i] > max) {
          max = array[i];
      }
  }
  document.getElementById('output22').innerHTML = `Maximum number in array: ${max}`;
}

// Task 23: Print multiplication table of a number up to 10 using loop
function printMultiplicationTableLoop() {
  let number = parseInt(document.getElementById('multiplicationTableInput').value);
  let output = '';
  for (let i = 1; i <= 10; i++) {
      output += `${number} x ${i} = ${number * i} <br>`;
  }
  document.getElementById('output23').innerHTML = output;
}

// Task 24: Count vowels in a string using loop
function countVowels() {
  let inputString = document.getElementById('countVowelsInput').value.toLowerCase();
  let count = 0;
  for (let i = 0; i < inputString.length; i++) {
      if (['a', 'e', 'i', 'o', 'u'].includes(inputString[i])) {
          count++;
      }
  }
  document.getElementById('output24').innerHTML = `Number of vowels: ${count}`;
}

// Task 25: Check if a number is prime using loop
function checkPrime() {
  let number = parseInt(document.getElementById('primeNumberInput').value);
  let isPrime = true;
  
  if (number > 1){
    for (let i = 2; i <number; i++){
      if(number%i == 0){
        isPrime=false;
        break;
      }
    }
  }else{
    isPrime=false;
  }

  if (isPrime) {
      document.getElementById('output25').innerHTML = `${number} is a prime number`;
  } else {
      document.getElementById('output25').innerHTML = `${number} is not a prime number`;
  }
}