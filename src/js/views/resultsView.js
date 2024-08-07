import view from "./view";
import previewView from "./previewView.js";
import icons from 'url:../../img/icons.svg';
class resultsView extends view
{
_parentElement=document.querySelector('.results');
_errorMsg='no recipes found for your query! Please try again';
_message='';
_generateMarkup(){
  return this._data.map(result=>previewView.render(result,false)).join('');
  }
}

export default new resultsView();