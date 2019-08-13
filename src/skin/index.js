import themeArray from './themeArray'

export const loadSkin = {

  changeTheme(themeValue){
    let cssArray = themeArray
    for(let i = 0; i<cssArray.length; i++){
      var itemPath = 'static/theme/' + themeValue.toLowerCase() + '/' + cssArray[i].toLowerCase() + '.css'
      loadCss(itemPath)
    }

    localStorage.setItem('themeValue', themeValue)

    function loadCss(path){
      let head = document.getElementsByTagName('head')[0]
      let link = document.createElement('link')
      link.href = path
      link.rel = 'stylesheet'
      link.type = 'text/css'
      head.appendChild(link)
    }

  }
}