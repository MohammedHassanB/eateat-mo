import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import {modelCloseSec} from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';
/*
if(module.hot)
  {
    module.hot.accept();
  }

*/
const showRecipe= async function()
{
  try{
    const id=window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();

    //update results view to mark selected search result
    resultsView.update(model.getSearchResultPage());

    //update bookmarks view
    bookmarksView.update(model.state.bookmarks);
    //loading recipe
    await model.loadRecipe(id); 
    //rendering recipe
    recipeView.render(model.state.recipe);  
      }
  catch(err){
    recipeView.renderError();
  }
};

const showSearchResults=async function()
{
try
{
  resultsView.renderSpinner();
  //get search query
  const query=searchView.getQuery();
  if(!query) return;

  //load search query
await model.loadSearchResults(query);
//render results

resultsView.render(model.getSearchResultPage());

//render initail paginaton

paginationView.render(model.state.search);
}catch(err)
{
console.log(err);
}
};

const showPagination=function(goTo)
{
//render new results

resultsView.render(model.getSearchResultPage(goTo));

//render new paginaton

paginationView.render(model.state.search);
};

const controleServings=function(newServings)
{
//update recipe servings in the state
model.updteServings(newServings);

//update the recipe view
recipeView.update(model.state.recipe);
}

const controlAddBookmark=function()
{
  //add||remove bookmark
  if(!model.state.recipe.bookmarked)
  model.addBookmark(model.state.recipe);
  else
    model.deleteBookmark(model.state.recipe.id);
  //update recipe view
  recipeView.update(model.state.recipe);
  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks=function()
{
bookmarksView.render(model.state.bookmarks);
};


const controlAddRecipe= async function(newRecipe)
{
  try{

    //show loading spinner
    addRecipeView.renderSpinner();
    //upload the new recipe
    await model.uploadRecipe(newRecipe);
   

    //render recipe 
    recipeView.render(model.state.recipe);

    //display success message
     addRecipeView.renderMsg()

     //render bookmarks
     bookmarksView.render(model.state.bookmarks);

     //change id in url
     window.history.pushState(null,'',`#${model.state.recipe.id}`);
    //close form window

    setTimeout(function()
  {
    //addRecipeView.toggleWindow()
  },modelCloseSec*1000);
  }catch(err)
  {
       console.error(err);
       addRecipeView.renderError(err.message);
  }
} 
const init=function()
{
bookmarksView.addhandlerRender(controlBookmarks);
recipeView.addHandlerRender(showRecipe);
recipeView.addHandlerUpdateServings(controleServings);
recipeView.addHnadlerAddBookmark(controlAddBookmark);
searchView.addHandlerSearch(showSearchResults);
paginationView.addHandlerClick(showPagination);
addRecipeView.addHandlerUpload(controlAddRecipe);

}
init();
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
