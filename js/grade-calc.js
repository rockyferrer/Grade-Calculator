$(document).ready(function() {

    // array to store the grades entered by the user
    var grades;

    //array to store the weights entered by the user
    //grades and weights are parallel
    var weights;

    /* gets the grades entered by the user and store them in the grades array */
    function getGrades() {
        grades = document.getElementsByClassName('Grade');
    }

    /* gets the weights entered by the user and store them in the weights array */
    function getWeights() {
        weights = document.getElementsByClassName('Weight');
    }

    /* Calculates the grade based on the weights and grades */
    function calculateGrade() {
        resetIDs(); //this sets every input id back to "Grade" and "Weight" respectively
        getGrades();
        getWeights();
        var finalGrade;

        // checks if nothing has been entered by the user
        if (isNoEntries()) {
            grades[0].id = 'emptyGradeField';
            weights[0].id = 'emptyWeightField';
            return -1; //since we cannot calculate a valid final grade
        };

        //running totals of the grades and weights
        var curTotalGrade = 0
        var curTotalWeight = 0;
        for (var i = 0; i < grades.length; i++) {
            //convert grades and weights into ints for calculations
            var grade = parseInt(grades[i].value);
            var weight = parseInt(weights[i].value);
            //checks to make sure that both a weight and a grade has been entered in the same row
            if (!isNaN(grade) && !isNaN(weight)) {
                //turn the weight into a decimal out of 100, then multiple by grade
                curTotalGrade += grade * (weight * 0.01);
                if (curTotalWeight < 100) {
                    //keep adding to curTotalWeight as long as it is not over 100
                    curTotalWeight += weight;
                } else {
                    //curTotalWeight is over 100, so tell the user to fix this
                    return -2;
                }
            } else if (isOneFieldMissing(grade, weight)) { //one entry is missing
                highlightRequiredField(grades[i], weights[i]);
                return -1; //since we cannot calculate a valid final grade
            }
        }

        //the loop has completed, so we have valid totals for grade and weight
        //calculate
        finalGrade = ((curTotalGrade / curTotalWeight) * 100).toFixed(2);

        return finalGrade;
    }

    function outputMessage() {
        //reset the outputMessage element back to result
        var el = document.getElementById('errorMessage');
        if (el !== null) {
            el.id = 'result';
        }

        //locate the spot in the html where the result message will go
        var result = document.getElementById('result');
        //calculate the final grade
        var finalGrade = calculateGrade();
        //check if the final grade is an error
        if (finalGrade === -1) {
            result.id = 'errorMessage';
            var outputMessage = "Please fill in the required fields.";
            result.textContent = outputMessage;
        } else if (finalGrade === -2) {
            result.id = 'errorMessage';
            var outputMessage = "The total weights are above 100. Please adjust."
            result.textContent = outputMessage;
        } else { //return the final grade
            result.id = 'result';
            var msg = "Your current grade is ";
            var outputMessage = msg + finalGrade + "%.";
            result.textContent = outputMessage;
        }
        return false;
    }
    var submitButton = document.getElementById('submit');
    submitButton.onclick = outputMessage;

    /* creates an input element for the description of an entry */
    function createDescInput() {
        var newDescInput = document.createElement('input');
        //set the attributes
        newDescInput.className = "Description";
        newDescInput.type = "text";
        newDescInput.size = "15";
        newDescInput.maxLength = "15";
        return newDescInput;
    }

    /* creates an input element for the weight entry */
    function createWeightInput() {
        var newWeightInput = document.createElement('input');
        //set the attributes
        newWeightInput.className = "Weight";
        newWeightInput.type = "text";
        newWeightInput.size = "4";
        newWeightInput.maxLength = "3";
        return newWeightInput;
    }

    /* creates an input element for the grade entry */
    function createGradeInput() {
        var newGradeInput = document.createElement('input');
        //set the attributes
        newGradeInput.className = "Grade";
        newGradeInput.type = "text";
        newGradeInput.size = "4";
        newGradeInput.maxLength = "3";
        return newGradeInput;
    }

    /* creates a new row with the description element, weight element, and grade
    element*/
    function createNewRow() {
        var newListEl = document.createElement('li');
        var newFormEl = document.createElement('form');
        var newPEl = document.createElement('p');
        var newDescInputEl = createDescInput();
        var newDescTextNode = document.createTextNode('Description: ');
        var newWeightInputEl = createWeightInput();
        var newWeightTextNode = document.createTextNode('Weight: ');
        var newGradeInputEl = createGradeInput();
        var newGradeTextNode = document.createTextNode('Grade: ');
        newPEl.appendChild(newDescTextNode);
        newPEl.appendChild(newDescInputEl);
        newPEl.appendChild(newWeightTextNode);
        newPEl.appendChild(newWeightInputEl);
        newPEl.appendChild(newGradeTextNode);
        newPEl.appendChild(newGradeInputEl);
        newFormEl.appendChild(newPEl);
        newListEl.appendChild(newFormEl);
        return newListEl;
    }

    function createNewTableRow() {
        var newTableEl = document.createElement('tr');
        var newTdDescEl = document.createElement('td');
        var newDescInputEl = createDescInput();
        newTdDescEl.appendChild(newDescInputEl);
        var newTdWeightEl = document.createElement('td');
        var newWeightInputEl = createWeightInput();
        newTdWeightEl.appendChild(newWeightInputEl);
        var newTdGradeEl = document.createElement('td');
        var newGradeInputEl = createGradeInput();
        newTdGradeEl.appendChild(newGradeInputEl);
        newTableEl.appendChild(newTdDescEl);
        newTableEl.appendChild(newTdWeightEl);
        newTableEl.appendChild(newTdGradeEl);
        return newTableEl;
    }

    //the previous number of rows before the numRows drop down menu was changed
    //default is set to 4
    var curNumRows = 4;

    /* add a single row to the DOM */
    function addSingleRow() {
        var newListEl = createNewTableRow();
        var position = document.getElementById('entriesList');
        position.appendChild(newListEl);
    }

    /* adds a row when the add row button is clicked */
    function addRow() {
        addSingleRow();
        //update the drop down menu button
        document.getElementById('numRows').value++;
        curNumRows++;
        return false;
    }

    var addRowBtn = document.getElementById('addRowBtn');
    addRowBtn.onclick = addRow;

    /* sets up the rows when the number of entries menu is changed */
    function setUpRows() {
        //determine the number of rows the page should have
        var rowsToAdd = parseInt(this.value);

        //add the rows
        if (curNumRows < rowsToAdd) { //add rows
            for (var i = curNumRows; i < rowsToAdd; i++) {
                addSingleRow();
                curNumRows = rowsToAdd;
            }
        } else if (curNumRows > rowsToAdd) { //remove rows
            var entriesList = document.getElementById('entriesList');
            for (var i = curNumRows; i > rowsToAdd; i--) {
                entriesList.removeChild(entriesList.lastChild);
                curNumRows = rowsToAdd;
            }
        }

    }

    //add an event handler to the drop down menu for whenever the value changes
    var numRowsEl = document.getElementById('numRows');
    numRowsEl.addEventListener('change', setUpRows, false);

	//clear all user entries when clear button is pressed
	$('#clearButton').click(function() {
		getGrades();
        getWeights();
        var descriptions = document.getElementsByClassName('Description');
        for (var i = 0; i < grades.length; i++) {
            if (descriptions.length > 0) {
                descriptions[i].value = '';
            }
            grades[i].value = '';
            weights[i].value = '';
        }
	});

    /* changes the class of the input element to and empty grade field to trigger
    the new css rules */
    function highlightRequiredField(gradeField, weightField) {
        if (isNaN(parseInt(gradeField.value))) {
            gradeField.id = 'emptyGradeField';
        } else if (isNaN(parseInt(weightField.value))) {
            weightField.id = 'emptyWeightField';
        }
    }

    /* checks if one of the fields are empty */
    function isOneFieldMissing(field1, field2) {
        return ((isNaN(field1) && !isNaN(field2)) ||
            (!isNaN(field1) && isNaN(field2)));
    }

    /* sets all the empty fields back to grade and weight respectively */
    function resetIDs() {
        //sets the empty grade field back to 'Grade'
        var emptyGradeElement = document.getElementById('emptyGradeField');
        if (emptyGradeElement !== null) {
            emptyGradeElement.id = 'Grade';
        }
        //sets the empty weight field back to 'Weight'
        var emptyWeightElement = document.getElementById('emptyWeightField');
        if (emptyWeightElement !== null) {
            emptyWeightElement.id = 'Weight';
        }
    }

    /* checks if no entries have been entered in any of the rows */
    function isNoEntries() {
        var counter = 0;

        //loop the increments counter for every empty row
        for (var i = 0; i < grades.length; i++) {
            if ((isNaN(parseInt(grades[i].value))) &&
                (isNaN(parseInt(weights[i].value)))) {
                counter++;
            }
        }

        return counter === grades.length;
    }

});
