import { ListItem, ListItemText,List, InputBase, IconButton,Paper,makeStyles, ListItemSecondaryAction } from '@material-ui/core';
import React,{useState,useEffect} from 'react'
import {createAPIEndpoint, ENDPOINTS} from "../../api";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
const useStyles=makeStyles (theme =>({
  searchPaper:{
    padding:'2px 4px',
    display:'flex',
    alignItems:'center',
  },
  searchInput:{
    marginLeft:theme.spacing(1,5),
    flex:1,
  },
  listRoot:{
    marginTop:theme.spacing(1),
    maxHeight:450,    //scrool bar
    overflow:'auto',
    '& li:hover':{
      cursor:'pointer',
      backgroundColor:'#E3E3E3'
    },
    '& li:hover .MuiButtonBase-root':{
      display:'block',
      color:'#000',
    },
    '& .MuiButtonBase-root':{
      display:'none'
    },
    '& .MuiButtonBase-root:hover':{
      backgroundColor:'transparent'
    }
  }
}))

export default function SearchFoodItem(props) {

  const {addFoodItem}=props;

  const [foodItems,setFoodItems]=useState([])
  const [searchList,setSearchList]=useState([]);
  const [searchKey, setSearchKey]=useState('');
  const classes = useStyles();

  //yemek listeleri için getirdiğimiz api

  useEffect(()=>{
      createAPIEndpoint(ENDPOINTS.FOODITEM).fetchAll()
      .then(res=>{
      
        setFoodItems(res.data);
        setSearchList(res.data);
      }).catch(err=>console.log(err))
  },[])


  useEffect(()=>{
      let x = [...foodItems];
      x=x.filter(y=>{
        return y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
      });
      setSearchList(x);
  },[searchKey])

  return (
    <>
    <Paper className={classes.searchPaper}>
      <InputBase
      className={classes.searchInput}
      value={searchKey}
      onChange={e=> setSearchKey(e.target.value)}
      placeholder="Search food Items"/>
      <IconButton>
          <SearchTwoToneIcon/>
      </IconButton>
    </Paper>
    <List className={classes.listRoot}>
      {
        searchList.map((item,idx)=>(
          <ListItem
            key={idx}>
              <ListItemText
              primary={item.foodItemName}
              secondary={'$' + item.price}/>
              <ListItemSecondaryAction>
                <IconButton  onClick={e=> addFoodItem(item)} >
                    <PlusOneIcon/>
                    <ArrowForwardIosIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
        ))
      }
    </List>
    </>
  )
 
}
