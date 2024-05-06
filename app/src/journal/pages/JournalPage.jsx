import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from "@mui/icons-material";


export const JournalPage = () => {
  return (
    <JournalLayout>
      
      {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, excepturi consequatur? Quo aperiam iusto odio facere voluptates a. Quasi qui ex itaque fugiat nisi ducimus esse saepe in. Assumenda, ex?</Typography> */}
      {/* <NothingSelectedView/> */}
      {/* <NoteView/> */}

      <IconButton 
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'secondary.main',
            ':hover': { backgroundColor: 'secondary.main', opacity: 0.9 },
            position:'fixed',
            right: 50,
            bottom: 50
          }}
      >
        <AddOutlined sx={{ fontSize: 30}}/>

      </IconButton>
      
    </JournalLayout>
  )
}
