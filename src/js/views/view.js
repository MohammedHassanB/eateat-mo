import icons from 'url:../../img/icons.svg';
export default class view{
  _data;
  render(data,render=true)
  {
 if(!data||( Array.isArray(data) &&data.length===0)){
  return  this.renderError();
    } 
    this._data=data;
    const html=this._generateMarkup();
  
    if(!render) return html;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin",html);
  }

  update(data)
  {
   
    this._data=data;
    const newHtml=this._generateMarkup();
    const newDom=document.createRange().createContextualFragment(newHtml);
    const newElements=Array.from(newDom.querySelectorAll('*'));
    const curElements=Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl,i)=>{
     const curEl=curElements[i];
     //updates changed text
     if(!newEl.isEqualNode(curEl)&&newEl.firstChild?.nodeValue.trim()!=='')
      {
        curEl.textContent=newEl.textContent;
       
      }
     // update changed attributes
     if(!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(att=>curEl.setAttribute(att.name,att.value));
    });
  }
  _clear()
  {
   this._parentElement.innerHTML='';
  }

  renderSpinner()
{
const html=`<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
        this._clear(this._parentElement);
        this._parentElement.insertAdjacentHTML("afterbegin",html);
}
renderError(errorMsg=this._errorMsg)
{
const html=`<div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${errorMsg}</p>
        </div>`;
        this._clear(this._parentElement);
        this._parentElement.insertAdjacentHTML("afterbegin",html);
}

renderMsg(message=this._message)
{
const html=`<div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
        this._clear(this._parentElement);
        this._parentElement.insertAdjacentHTML("afterbegin",html);
}

}