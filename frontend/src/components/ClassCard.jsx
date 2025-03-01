import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ClassCard = ({ title, description }) => {
  return (
    <Card raised="true" sx={{ maxWidth: 300, margin: "20px auto", padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Open</Button>
        <Button size="small" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

/*
import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SimpleCard = ({ title, description, onDelete }) => {
    return (
        <Card sx={{ maxWidth: 300, margin: "20px auto", padding: 2, position: "relative" }}>
            // {/* Trash button on the top-right corner */
//             <IconButton
//                 sx={{ position: "absolute", top: 8, right: 8 }}
//                 color="error"
//                 onClick={onDelete}
//             >
//                 <DeleteIcon />
//             </IconButton>

//             <CardContent>
//                 <Typography variant="h5" component="div">
//                     {title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                     {description}
//                 </Typography>
//             </CardContent>
//         </Card>
//     );
// };

// export default SimpleCard;

// */

export default ClassCard;
