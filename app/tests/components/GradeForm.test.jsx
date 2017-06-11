import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import $ from 'jQuery';

import GradeForm from 'GradeForm';

describe('GradeForm', () => {
    it('should exist', () => {
        expect(GradeForm).toExist();
    });

    it('should render correct number of rows', () => {
        var gradeForm = TestUtils.renderIntoDocument(<GradeForm />);
        // console.log(gradeForm.state.numRows);
        var $el = $(ReactDOM.findDOMNode(gradeForm));
        var $formTableHead = $el.find('thead');
        var $formTableBody = $el.find('tbody');
        var $formTableRows = $formTableBody.find('tr');
        expect($formTableHead.length).toBe(1);
        expect($formTableRows.length).toBe(4);
    });

    describe('parseGrade', () => {
        it('should parse grade to a float with 2 decimal places', () => {
            var gradeForm = TestUtils.renderIntoDocument(<GradeForm />);
            var grade = '50';
            var expected = '50.00';
            var actual = gradeForm.parseGrade(grade);

            expect(expected).toBe(actual);
        });

        it('should parse fraction grades to float with 2 decimals places', () => {
            var gradeForm = TestUtils.renderIntoDocument(<GradeForm />);
            var grade = '5/10';
            var expected = '50.00';
            var actual = gradeForm.parseGrade(grade);

            expect(expected).toBe(actual);
        });
    });

    describe('clearEntries', () => {
        it('should clear all entries in form', () => {
            var gradeForm = TestUtils.renderIntoDocument(<GradeForm />);
            var $el = $(ReactDOM.findDOMNode(gradeForm));
            var descriptions = $el.find('.description');
            var grades = $el.find('.grade');
            var weights = $el.find('.weight');
            for (let i = 0; i < descriptions.length; i++) {
                descriptions[i].value = 'some description';
                grades[i].value = 85;
                weights[i].value = 10;
            }
            gradeForm.clearEntries();
            for (let i = 0; i < descriptions.length; i++) {
                expect(descriptions[i].value).toBe('');
                expect(grades[i].value).toBe('');
                expect(weights[i].value).toBe('');
            }
        });
    });
});
