import { Button } from "@mui/material";
import { deleteTask } from "../utils/taskDocUtil";

export default function TaskDocument({ id, link }) {
   const handleDelete = () => {
      const deleteCheck = window.confirm(
         "Are you sure you wish to delete this task document?"
      );
      if (deleteCheck) {
         deleteTask(id);
         window.alert("task documented deleted");
      }
   };
   return (
      <div>
         <a href={link} target="_blank">
            {link}
         </a>
         <Button onClick={handleDelete} value={id}>
            Delete {id}
         </Button>
      </div>
   );
}
