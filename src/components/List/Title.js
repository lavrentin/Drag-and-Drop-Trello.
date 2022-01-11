import React, {useContext, useState} from 'react'
import { InputBase, Typography} from '@material-ui/core';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';
import storeApi from '../../utils/storeApi';


const useStyle = makeStyles((theme) => ({
    editableTitleContainer:{
        marginLeft:theme.spacing(1),
        display:'flex',
        
    },
    editableTitle: {
   flexGrow:1,
   fontSize:"1.2rem", 
   fontWeight:"bold",
   
   
    },
    input:{
        fontSize:"1.2rem", 
   fontWeight:"bold",
        margin:theme.spacing(1),
        '&:focus':{
            background: '#ddd',
        },
    }
}));


export default function Title({title, listId}) {
    const [open, setOpen] = useState(false);
    const {updateListTitle} = useContext(storeApi);
    const classes = useStyle();
    const [newTitle, setNewTitle] = useState('title');
    const handleOnChange = (e) => {
           setNewTitle(e.target.value);
    }
    const handleOnBlur = () => {
        updateListTitle(newTitle, listId)

        setOpen(false);
        
    }
    return (
        <div>
            {open ?(
                  <div>
                  <InputBase 
                  onChange={handleOnChange}
                  autoFocus
                  value={newTitle}
                  inputProps={{
                      className: classes.input,
                  }}
                  fullWidth
                  onBlur={handleOnBlur}
                  >                     
                  </InputBase>
              </div>
            ) : (
            <div className={classes.editableTitleContainer}>
            <Typography onClick={() => setOpen(!open)} className={classes.editableTitle} >
                {title} 
            </Typography>
            <MoreHorizIcon/> 
            </div>
            )}
        </div>
    );
}