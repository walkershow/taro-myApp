import Nerv from "nervjs";
import Taro, { showToast as _showToast, request as _request, setStorage as _setStorage } from "@tarojs/taro-h5";

import { AtForm, AtInput, AtButton } from 'taro-ui';
import './login.scss';
import * as gc from 'utilscore/libs/validator.js';
console.log(gc);
//import {isEmpty} from 'utilscore'
//console.log(isEmpty(''))
//var us = require('utilscore')
//console.log(us)
//let txt = mask('12398765432',3,7) 
//console.log(txt) // => "123****5432"
const rule = [{
  name: 'name',
  checkType: 'string',
  checkRule: "1-8",
  errorMsg: "name should be 1-8 char"
}, {
  name: 'password',
  checkType: 'string',
  checkRule: "6",
  errorMsg: "name should be 6 char"

}];
export default class Login extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      name: '',
      password: ''

    };
  }
  onSubmit(e) {
    //Taro.setStorage({
    //key:"session3rd",
    //data:"123456"
    //})
    const checkRes = gc.graceChecker.check(this.state, rule);
    if (checkRes) {
      console.log("validate pass");
      return;
    } else {
      console.log(gc.graceChecker.error);
      _showToast({
        title: gc.graceChecker.error,
        icon: 'none'
      });
      return;
    }
    return _request({
      url: 'http://localhost:3721/users'
    }).then(res => {
      console.log(res.data);
      if (res.statusCode === 200) {
        _setStorage({
          key: 'session3rd',
          data: res.data,
          success(res) {
            Taro.navigateTo({
              url: '/pages/index/index'
            });
          } });
      } else if (res.status !== 200) {

        _showToast({
          title: '发生错误，请重试！',
          icon: 'none'
        });
      }
    });
    //Taro.navigateTo({
    //url:'/pages/index/index'
    //})
  }
  onReset(e) {}
  handleNameChange(value) {
    console.log(value);
    this.setState({
      name: value
    });
  }
  handlePasswordChange(value) {
    console.log(value);
    this.setState({
      password: value
    });
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: '登陆'
  };

  render() {
    return <AtForm onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}> 
        <AtInput name="name" title="用户名" type="text" placeholder="" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
        <AtInput name="password" title="密码" type="text" placeholder="" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
        <AtButton formType="submit">登陆</AtButton>
        <AtButton formType="reset">重置</AtButton>
        </AtForm>;
  }
}