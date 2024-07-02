import view from "./view";
import previewView from "./previewView.js";
import icons from 'url:../../img/icons.svg';
class BookmarksView extends view
{
_parentElement=document.querySelector('.bookmarks__list');
_errorMsg='No bookmarks yet';
_message='';

addhandlerRender(handler)
{
  window.addEventListener('load',handler);
}
_generateMarkup(){
return this._data.map(bookmark=>previewView.render(bookmark,false)).join('');
}

}

export default new BookmarksView();