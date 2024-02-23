import { Button } from "@mui/material";
import { deleteMission } from "../utils/document/missionDocUtil";

export default function MissionDocument({ id, link, canModify }) {
   const handleDelete = async () => {
      const deleteCheck = window.confirm(
         "Are you sure you wish to delete this mission document?"
      );
      if (deleteCheck) {
         await deleteMission(id);
         window.alert("mission documented deleted");
      }
   };
   const handleUpdate = () => {
      console.log(id);
   };
   return (
      <div>
         <a href={link} target="_blank">
            {link}
         </a>
         {canModify ? (
            <>
               <Button onClick={handleDelete} value={id}>
                  Delete {id}
               </Button>
               <Button onClick={handleUpdate}>Update</Button>
            </>
         ) : (
            ""
         )}
      </div>
   );
}
