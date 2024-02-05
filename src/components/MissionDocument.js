import { Button } from "@mui/material";
import { deleteMission } from "../utils/missionDocUtil";

export default function MissionDocument({ id, link, canDelete }) {
   const handleDelete = () => {
      const deleteCheck = window.confirm(
         "Are you sure you wish to delete this mission document?"
      );
      if (deleteCheck) {
         deleteMission(id);
         window.alert("mission documented deleted");
      }
   };
   return (
      <div>
         <a href={link} target="_blank">
            {link}
         </a>
         {canDelete ? (
            <Button onClick={handleDelete} value={id}>
               {" "}
               Delete {id}{" "}
            </Button>
         ) : (
            ""
         )}
      </div>
   );
}
