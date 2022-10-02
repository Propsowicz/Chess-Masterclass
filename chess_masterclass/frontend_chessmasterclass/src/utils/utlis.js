


export function alertMsg(div_id, txt, btn_id, ){
    let alertDiv = document.querySelector(`#${div_id}`)
    let msg = document.createElement('p')     
    let btn = document.querySelector(`#${btn_id}`)    
    
    msg.innerText = txt
    msg.style.color = 'red'
    btn.disabled = true
    alertDiv.appendChild(msg)

    setTimeout(() => {  
    alertDiv.removeChild(msg)
    btn.disabled = false
    }, 3000)
    
}

