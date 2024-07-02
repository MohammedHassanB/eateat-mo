import view from "./view";
import icons from 'url:../../img/icons.svg';
class paginationView extends view
{
_parentElement=document.querySelector('.pagination');

addHandlerClick(handler)
{
  this._parentElement.addEventListener('click',function(e)
{
 const btn=e.target.closest('.btn--inline');
 if(!btn) return;
 const goTo=+btn.dataset.goto;
handler(goTo);
});
}
_generateMarkup(){
  const currentPage=this._data.page;
  const numPages=Math.ceil(+(this._data.result.length)/this._data.resultPerPage);
  // page 1 and there are other pages
 if(currentPage===1 && numPages>1)
  {
    return this._generateMarkupBtnNext(currentPage);
  }

//last page
if(currentPage===numPages&&numPages>1)
  {
    return this._generateMarkupBtnprev(currentPage);
  }
//other page
if(currentPage<numPages)
 { 
  return this._generateMarkupBtnprevAndNext(currentPage);

}
//page 1 and no other pages

  
return '';
 
}

  _generateMarkupBtnNext(pageNum)
  {
    return`<button data-goto='${pageNum+1}' class="btn--inline pagination__btn--next">
            <span>page ${pageNum+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }

  _generateMarkupBtnprev(pageNum)
  {
    return`<button data-goto='${pageNum-1}' class="btn--inline pagination__btn--prev">
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
  </svg>
  <span>page ${pageNum-1}</span>
</button>`;
  }
  _generateMarkupBtnprevAndNext(pageNum)
  {
    return`<button data-goto='${pageNum-1}' class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>page ${pageNum-1}</span>
  </button>
  <button data-goto='${pageNum+1}' class="btn--inline pagination__btn--next">
            <span>page ${pageNum+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }

}



export default new paginationView();

