import React, { useEffect } from "react";

import { useForm, Form } from "./useForm";
import Controls from "../reusable/Controls";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import TitleIcon from "@mui/icons-material/Title";
import MessageIcon from "@mui/icons-material/Message";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

import { Divider, InputAdornment, Stack } from "@mui/material";

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
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <TitleIcon />
                     </InputAdornment>
                  ),
                  endAdornment: (
                     <InputAdornment position="end">
                        {`${formData.title.length} / 100`}
                     </InputAdornment>
                  ),
               }}
               inputProps={{
                  maxlength: "100",
               }}
               onChange={handleInputChange}
               error={errors.title}
               required
               fullWidth
            />
            <Controls.Input
               name="description"
               label="Description"
               value={formData.description}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <MessageIcon />
                     </InputAdornment>
                  ),
                  endAdornment: (
                     <InputAdornment position="end">
                        {`${formData.description.length} / 1000`}
                     </InputAdornment>
                  ),
               }}
               inputProps={{
                  maxlength: "1000",
               }}
               onChange={handleInputChange}
               error={errors.description}
               multiline
               required
               fullWidth
            />
            <Controls.Input
               name="link"
               label="Link"
               value={formData.link}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <InsertLinkIcon />
                     </InputAdornment>
                  ),
                  endAdornment: (
                     <InputAdornment position="end">
                        {`${formData.link.length} / 1000`}
                     </InputAdornment>
                  ),
               }}
               inputProps={{
                  maxlength: "1000",
               }}
               onChange={handleInputChange}
               error={errors.link}
               required
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
               required
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
