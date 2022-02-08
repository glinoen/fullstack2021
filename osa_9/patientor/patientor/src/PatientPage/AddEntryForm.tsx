import React from 'react';
import {  HospitalEntry } from '../types';
import { Grid, Button, Segment } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";

import { useStateValue } from "../state";

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;


interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  error?: string
}

export const AddEntryForm = ({ onSubmit, error } : Props)  => {
  const [{ diagnosisCodes }] = useStateValue();
  return (
    <div>
    {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "Hospital",
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.discharge) {
          errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Name of the specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosisCodes)}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />

            <Grid>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add New Entry
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    </div>
  );
};
