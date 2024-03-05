import React, { useEffect } from "react";

import { useForm, Form } from "../forms/useForm";
import Controls from "./Controls";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { Divider, Stack } from "@mui/material";

const docTypeItems = [
   { id: "mission", title: "Mission" },
   { id: "task", title: "Task" },
];

const initialFormValues = {
   title: "",
   description: "",
   link: "",
   docType: "",
};

// form for adding map pin to current country
export default function DocumentForm(props) {
   const { addOrEdit, recordForEdit } = props;
   const validate = (fieldData = formData) => {
      let temp = { ...errors };
      if ("title" in fieldData)
         temp.title = fieldData.title ? "" : "This field is required.";
      if ("description" in fieldData)
         temp.description = fieldData.description
            ? ""
            : "This field is required.";
      if ("link" in fieldData)
         temp.link = fieldData.link ? "" : "This field is required.";
      if ("docType" in fieldData)
         temp.docType = fieldData.docType ? "" : "Select a Document Type.";

      setErrors({
         ...temp,
      });

      if (fieldData === formData)
         return Object.values(temp).every((x) => x === "");
   };

   // submits a request to add new map pin to current country
   const handleSubmit = async (e) => {
      e.preventDefault();

      // onReload();
      if (validate()) {
         addOrEdit(formData, resetForm);
      }
   };

   const [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ] = useForm(initialFormValues, true, validate);

   useEffect(() => {
      if (recordForEdit != null) {
         setFormData({ ...recordForEdit });
      }
   }, [recordForEdit]);
   return (
      <>
         <Form onSubmit={handleSubmit}>
            <Controls.Input
               name="title"
               label="Title"
               value={formData.title}
               onChange={handleInputChange}
               error={errors.title}
               fullWidth
            />
            <Controls.Input
               name="description"
               label="Description"
               value={formData.description}
               onChange={handleInputChange}
               error={errors.description}
               multiline
               fullWidth
            />
            <Controls.Input
               name="link"
               label="Link"
               value={formData.link}
               onChange={handleInputChange}
               error={errors.link}
               fullWidth
            />
            <Controls.RadioGroup
               name="docType"
               label="Document Type"
               value={formData.docType}
               onChange={handleInputChange}
               items={docTypeItems}
               error={errors.docType}
               disabled={formData.id ? true : false}
            />

            <Stack
               direction="row"
               spacing={2}
               alignItems="center"
               justifyContent="center"
               divider={<Divider orientation="vertical" flexItem />}
            >
               <Controls.Button
                  variant="outlined"
                  text="Clear"
                  startIcon={<CancelIcon />}
                  onClick={resetForm}
                  fullWidth
               />
               <Controls.Button
                  type="submit"
                  text="Submit"
                  startIcon={<CheckIcon />}
                  fullWidth
               />
            </Stack>
         </Form>
      </>
   );
}
