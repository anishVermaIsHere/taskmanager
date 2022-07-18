
export const validate={
  taskName(val,errorMsg){
    const p1=/^[A-Za-z]+\s|[a-zA-Z]{3,30}$/ig;
    return p1.test(val)?'':errorMsg;
  },
  userName(val,erroMsg){
    const userNamePtn=/^[a-z]+\d+/ig;
    return userNamePtn.test(val)
  },
  userPwd(val,erroMsg){
    const pwdPtn=/^[a-z]+\d{2,3}/ig;
    return pwdPtn.test(val)
  }
}

