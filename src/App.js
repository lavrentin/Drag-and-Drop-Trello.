
import React, {useState} from 'react';
import {v4 as uuid} from "uuid";
import InputContainer from './components/input/inputContainer';
import List from './components/List/List';
import store from './utils/store';
import StoreApi from './utils/storeApi';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext } from 'react-beautiful-dnd';
// import { data, cards } from './utils/store'

const useStyle = makeStyles((theme) => ({
    root:{
      display:'flex',
      minHeight:'100vh',
      width:'100%',
      overflowY:'auto',
      color:'red',
      backgroundImage: `url(https://wallpapercave.com/wp/wp7242546.jpg)`,
    }
}))

export default function App() {
  const [data, setData] = useState(store);
  const classes = useStyle();
  const addMoreCard = (title, listId) => {
    const newCardId = uuid();
       const newCard = { 
         id:newCardId,
         title,
       };
       const list = data.lists[listId];
       list.cards = [...list.cards,newCard];

       const newState = {
         ...data,
         lists:{
           ...data.lists,
           [listId]:list,
         },
       };
 setData(newState);
  };

  const addMoreList = (title) => {
    const newListId = uuid();
    const newList = {
      id:newListId,
      title,
      cards:[],
    };
   const newState = {
     listIds:[...data.listIds,newListId],
     lists:{
       ...data.lists,
       [newListId]: newList,
     },
   };
     setData(newState)
  };

  const updateListTitle = (title, listId) => {
       const list = data.lists[listId];
       list.title = title;

        const newState = {
          ...data,
          lists:{
            ...data.lists,
            [listId]:list
          }
        }
           setData(newState);
  };
const onDragEnd = (result) => {
  const {destination, source, draggableId} = result; 
  if (!destination) {
    return;
  }

  const sourceList = data.lists[source.droppableId];
  const destinationList = data.lists[destination.droppableId];
  console.log(sourceList)
  const draggingCard = sourceList.cards.filter(
    (card) => card.id === draggableId
  )[0];
  if (source.droppableId ===destination.droppableId) {
    sourceList.cards.splice(source.index, 1);
    destinationList.cards.splice(destination.index, 0, draggingCard);
    const newSate = {
      ...data,
      lists:{
        ...data.lists,
        [sourceList.Id]: sourceList,
      },
    };
    setData(newSate);
  }
  else{
    sourceList.cards.splice(source.index,1);
    destinationList.cards.splice(destination.index,0,draggingCard);
    const newState = {
      ...data,
      lists:{
        ...data.lists,
        [sourceList.id]:sourceList,
        [destination.id]:destinationList,
      },
    };
    setData(newState);
  }
};
  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList,updateListTitle }}>
     <DragDropContext onDragEnd={onDragEnd}>
    <div className={classes.root}>
      {data.listIds.map((listId) => {
        const list = data.lists[listId];
       return  <List list={list} key={listId}/>
})}
     <InputContainer type="list"/>
    </div>
 </DragDropContext>
    </StoreApi.Provider>
  );
}


