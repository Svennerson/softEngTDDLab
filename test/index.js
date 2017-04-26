'use strict';

var test = require('tape');
// Object containing the interns we want to evaluate
var potentialHires = require('./input/groupOne.json');
var interns = potentialHires.interns;

var recruiter = require('../recruiter.js');
var util = require('../util.js');

test('util.getValueFromWageAndExp', function(t) {
  t.ok(util.getValueFromWageAndExp(31, 1) > util.getValueFromWageAndExp(30, 1), 'factors in wage');

  if (util.getValueFromWageAndExp(30, 1) > util.getValueFromWageAndExp(30, 0)) {
  	t.pass('factors in experiance');
  } else {
  	t.fail('does not factor in experiance');
  }

  t.equal(util.getValueFromWageAndExp(34, 1.3), false,
  	"getValueFromWageAndExp catches a partial year input and returns false");

  t.end();
});

test('util.sortInternObjects', function(t) {
	var inputArr = [interns[0], interns[1], interns[2], interns[3]];
	inputArr[0].metric = 3;
	inputArr[1].metric = 1;
	inputArr[2].metric = 2;
	inputArr[3].metric = 0;

	// Lets get the input sorted manually, in the expected array
	var expectedArr = inputArr.slice();
	expectedArr = [
		expectedArr[0], // 3
		expectedArr[2], // 2
		expectedArr[1], // 1
		expectedArr[3]  // 0
	];

	// Lets make a copy of the input to sort with the function
	var actualArr = inputArr.slice();

	// Sort by reference (in-place)
	util.sortInternObjects(actualArr);

  t.deepEqual(actualArr, expectedArr, 'bascially sorts by metric');

  // Let's throw a wrench in it and change our metrics
  actualArr[0].metric = 0;
  inputArr[0].metric = 0;

  expectedArr = [
		inputArr[2], // 2
		inputArr[1], // 1
		inputArr[0], // 0
		inputArr[3]  // 0
	];

	util.sortInternObjects(actualArr);

	t.deepEqual(actualArr, expectedArr, 'preserves order of same-metric objects');

  t.end();
});

test('bracketFromGPA', function(t) {

  t.deepEqual( recruiter.bracketFromGPA(3.5), 3, "returns bracket three");
  t.deepEqual( recruiter.bracketFromGPA(3.49), 2, "returns bracket two");
  t.deepEqual( recruiter.bracketFromGPA(3), 2, "returns bracket two");
  t.deepEqual( recruiter.bracketFromGPA(2.99), 1, "returns bracket one");
  t.deepEqual( recruiter.bracketFromGPA(2.5), 1, "returns bracket one");
  t.deepEqual( recruiter.bracketFromGPA(2.49), 0, "fucking disgraceful");

  t.end();

});

test('Do the Degree Do', function(t) {

  t.comment("DUMB DEGREES ARE EARNED BY DUMB PEOPLE");
  var collArr = [
    interns[0],
    interns[6],
    interns[7]
  ];

  var inputArr = collArr.slice();
  inputArr[1].degree = "beet slicing";
  inputArr[2].degree = "";

  recruiter.recruiter(inputArr);

  t.deepEqual(inputArr.length, 1, "PURGES THESE LANDS OF THE HERETICAL BEET SLICERS.");
  t.deepEqual(inputArr[0].degree, "advertising", "Because improving your product is for chumps.");

  inputArr = collArr.slice();
  inputArr[1].degree = "beet slicing";
  inputArr[2].degree = "astrology";
  recruiter.recruiter(inputArr);

  t.deepEqual(inputArr.length, 2, "THE SKILL-LESS HEATHEN HAS REPENTED");
  t.deepEqual(inputArr[1].degree, "astrology", "More like Asstrology amirite?");

  t.end();
})

// Your tests go here  (methods reference: https://www.npmjs.com/package/tape#testname-opts-cb )

// test('Test Name', function(t) {

//   if (/*some condition*/) {
//   	t.pass('passes condition');
//   } else {
//   	t.fail('does not pass condition');
//   }

// and/or an actual comparison like t.equal();

//   t.end();
// });
