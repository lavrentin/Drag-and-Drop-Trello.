import React, {useState} from 'react'
import { InputBase, Typography } from '@material-ui/core';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';


const useStyle = makeStyles((theme) => ({
    editableTitleContainer:{
        marginLeft:theme.spacing(1),
        display:'flex',
    },
    editableTitle: {
   flexGrow:1,
    },
    input:{
        margin:theme.spacing(1),
        '&:focus':{
            background: '#ddd',
        },
    }
}));


export default function Title() {
    const [open, setOpen] = useState(false);
    const classes = useStyle();
    return (
        <div>
            {open ?(
                  <div>
                  <InputBase value="Todo"
                  inputProps={{
                      className: classes.input,
                  }}
                  fullWidth
                  onBlur={() => setOpen(!open)}
                  >                     
                  </InputBase>
              </div>
            ) : (
            <div className={classes.editableTitleContainer}>
            <Typography onClick={() => setOpen(!open)} className={classes.editableTitle} >
                Todo 
            </Typography>
            <MoreHorizIcon/> 
            </div>
            )}
        </div>
    );
}