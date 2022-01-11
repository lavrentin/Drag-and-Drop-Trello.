import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../List/Title';
import Card from '../Card';
import InputContainer from '../input/inputContainer';
import {Droppable} from 'react-beautiful-dnd'

const useStyle = makeStyles((theme) => ({
    root: {
        minWidth: '400px',
        backgroundColor: 'red',
        marginLeft: theme.spacing(1),
    },
    cardContainer:{
        marginTop:theme.spacing(4),
       
    }
}));


export default function List({list}) {
    const classes = useStyle();
    return(
        <div>
            <Paper className={classes.root}>
               <CssBaseline />
               <Title title={list.title} listId={list.id}/>     
               <Droppable droppableId={list.id}>
                {(provided)=>(
                    <div
                    ref={provided.innerRef} {...provided.droppableProps}
                    className={classes.cardContainer}
                    >
                                      {list.cards.map((card, index)=>(
                      <Card key={card.id} card={card} index={index} />
    ))} 
          {provided.placeholder}
                    </div>
                )}
   
    </Droppable>
                   <InputContainer listId={list.id} type="card"/>
            </Paper>
        </div>
    );
}