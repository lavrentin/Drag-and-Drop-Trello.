import { Button, IconButton, InputBase, Paper } from '@mui/material'
import React, {useState, useContext} from 'react'
import ClearIcon from "@material-ui/icons/Clear"
import { makeStyles,alpha} from '@material-ui/core/styles';
import StoreApi from '../../utils/storeApi';


const useStyle = makeStyles((theme) => ({
    card:{
        width:'380px',
        paddingBottom: theme.spacing(4),
        margin: theme.spacing(0, 1, 1, 1),
        
    }, 
    input:{
        margin: theme.spacing(1),
        
    },
   
    confirm:{
        margin: theme.spacing(0, 1, 1, 1),
    }

}));


export default function InputCard({setOpen, listId, type}) {
    const classes = useStyle();
    const {addMoreCard, addMoreList} = useContext(StoreApi);
    const [title, setTitle] = useState('');

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBtnConfirm = () => {
       if (type === 'card') {   
          addMoreCard(title, listId);
          setTitle('');
          setOpen(false);
       }
       else{
           addMoreList(title);
           setTitle('');
          setOpen(false);
       }
    };

  

    return (
        <div>
            <div>
            <Paper className={classes.card}>
               <InputBase 
               onChange={handleOnChange}
               multiline 
               oneBlur={() => setOpen(false)}
               fullWidth
               inputProps={{
               className: classes.input,
            }}
            value={title}
               placeholder={type === 'card'?"Enter a title of this card..":"Enter list title..."}
               />
            </Paper>
            </div>
            <div className={classes.confirm}>
            
                <Button sx={{ background:"green",
        color:'#fff',
        "&:hover":{
            background:alpha('#5AAC44',0.75),
        }}} onClick={handleBtnConfirm}>{type === 'card'? `Add Card` : 'Add list'}</Button>
        
                <IconButton onClick={() =>setOpen(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}
