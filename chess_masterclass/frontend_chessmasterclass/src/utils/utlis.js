


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

export function checkCurrentPremiumPlan(props, userInfo){
    if(userInfo.premium_plan === 'grandmaster'){
        return true
    }else if(userInfo.premium_plan === 'international_master'){
        if(props.premiumPlan === 'grandmaster'){
            return false
        }else{
            return true
        }
    }else if(userInfo.premium_plan === 'master'){
        if(props.premiumPlan === 'grandmaster' || props.premiumPlan === 'international_master'){
            return false
        }else{
            return true
        }
    }else if(userInfo.premium_plan === 'free'){
        if(props.premiumPlan === 'free'){
            return true
        }else{
            return false
        }
    }
}

export function premiumPlanName(userInfo){
    if(userInfo.premium_plan === 'grandmaster'){return 'Grandmaster'}
    if(userInfo.premium_plan === 'international_master'){return 'International Master'}
    if(userInfo.premium_plan === 'master'){return 'Master'}
    if(userInfo.premium_plan === 'free'){return 'Free'}
  }