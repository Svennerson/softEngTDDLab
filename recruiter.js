'use strict';

// Object containing starting wages for various 4 year degrees
var degreeSWage = require('./degreeSWage.json');
// File containing some of our utility functions (already written)
var util = require('./util.js');

//TODO: You need to write this function AND utilize it.
// bracketFromGPA(decimal GPA);
function bracketFromGPA(gpa) {
	if (3.5 <= gpa && gpa <= 4) {
		return 3;
	}
	else if (3 <= gpa && gpa <= 3.49) {
		return 2;
	}
	else if (2.5 <= gpa && gpa <= 2.99) {
		return 1;
	}
	else {
		return 0;
	}
}

// TODO: recruiter( Array of hireables )
function recruiter(internArr) {
	var i;
	var j;

	for(i = 0; i < internArr.length; i++) {
		var temp;
		temp = false;
		for(j = 0; j < 309; ++j) {
			if (internArr[i].degree===degreeSWage.degreenames[j]) {
				temp = true;
			}
		}
		if (internArr[i].degree==="astrology") {
			temp = true;
		}
		if (temp === false) {
			internArr.splice(i,1);
			i--;
		}
	}

	// Below is just to help show the syntax you need,
	// you'll need to process ALL of the hireables like this one and sort
	var index = 0;
	var iname = internArr[index].name;
	var idegr = internArr[index].degree;
	var igpa = internArr[index].gpa;
	var iexp = internArr[index].experiance;
	var iwage, ivalue, ibracket, imetric;

	// Yep, you can use strings as an "index" (technically it's a property) in JavaScript
	idegr = idegr.toLowerCase();
	iwage = degreeSWage[idegr];

	// You should use these functions at some point
	ivalue = util.getValueFromWageAndExp( /*wage, full years of experiance*/ );
	ibracket = bracketFromGPA ( /*decimal GPA*/ );

	// Hmm... this doesn't seem to follow the spec - fix it
	imetric = ivalue + ibracket;

	// We really want to add our sorting number "metric" to objects (it really is this easy)
	internArr[index].metric = imetric;

	// and then sort them all (it doesn't return anything, it modifies the array sent)
	// util.sortInternObjects( /*Array of hireables with "metric" as a property*/ );


	// Output
	// An array of HIREABLE 'intern objects' (in order of most valueable to least valueable)
	// with at least the properties "name", "metric", "degree"
	// You can come up with any number you want for "metric" as long as it corresponds to the spec
	// and people earlier in the array have equal or greater values for "metric" than
	// people further down.

	return internArr;
};

module.exports = {
	recruiter: recruiter,
	bracketFromGPA: bracketFromGPA
};
