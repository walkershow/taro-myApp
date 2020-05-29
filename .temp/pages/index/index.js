import Nerv from "nervjs";
import Taro, { getStorage as _getStorage, showLoading as _showLoading, request as _request, hideLoading as _hideLoading, showToast as _showToast } from "@tarojs/taro-h5";
import { View, Text, ScrollView } from '@tarojs/components';
import './index.scss';
import TaskList from '../../components/TaskList/TaskList';
import { AtButton, AtInput, AtForm } from 'taro-ui';
//import configStore from './store'
export default class Index extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      loading: false,
      value: '',
      list: []
    };
  }

  componentWillMount() {
    _getStorage({ key: 'session3rd', success(res) {
        console.log(res);
      }, fail(res) {
        console.log("failed", res);
        Taro.navigateTo({
          url: '/pages/login/login'
        });
      } });
    //fail() {
    //return Taro.login()
    //.then(response=>{
    //console.log(response.code)
    //return Taro.request({
    //url: 'http://localhost:3721/users',
    //code: response.code
    //})
    //.then(res=>{
    //if(res.statusCode===200 && res.data.rest===200){
    //Taro.setStorage({
    //key: 'session3rd',
    //data: res.data.data.session3rd
    //})
    //}else if(res.status === 500){
    //Taro.navigateTo({
    //url:'/pages/login/login'
    //})
    //
    ////Taro.showToast({
    ////title: '发生错误，请重试！',
    ////icon: 'none'
    ////})
    //}
    //})
    //})
    //.catch(err=>{
    //console.log(err);
    //Taro.showToast({
    //title: '发生错误，请重试!',
    //icon: 'none'
    //})
    //})
    //}
    //})
  }

  componentDidMount() {
    _showLoading({ title: 'loading' });
    _request({
      url: '/tasklist'
    }).then(res => {
      console.log(res);
      console.log(res.data);
      _hideLoading();
      if (res != "") {
        this.setState({
          loading: false,
          value: '',
          list: res.data
        });
      }
    });
  }
  changeValue = value => {
    this.setState({
      value: value
    });
    return this.state.value;
  };
  handleChange(e) {
    console.log(e);
    this.setState({
      value: e.target.value
    });
  }
  handleSwitch(e) {
    console.log(e);

    _showToast({
      title: e,
      icon: 'none'
    });
  }
  // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
  //return this.state.value
  updateList = () => {
    //console.log(HOST)
    console.log('update list');
    //if(this.state.loading){
    //return
    //}
    this.state.loading = true;
    let url = "/tasklist";
    if (this.state.value !== '') {
      url += "?value=" + this.state.value;
    }
    console.log(url);

    _request({
      url: url
    }).then(res => {
      console.log(res);
      console.log(res.data);
      _hideLoading();
      if (res != "") {
        this.setState({
          loading: false,
          list: res.data
        });
      }
    });
  };

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: '首页'

    //symotion-prefix)render() {
    //return (
    //<View className='index'>
    //Hello
    //</View>
    //)
    //}
  };render() {
    //const { tasks} = this.state.list
    //console.log(tasks)
    const sidebar = <View>
              {this.state.list.map(item => <Text key={item.id}>
                      {item.id}
                  </Text>)}
          </View>;
    const content = this.state.list.map(item => {
      return <View key={item.id}>
                      <Text>{item.task_name}</Text>
                      <Text>{item.proxy_id}</Text>
                      <Text>{item.status}</Text>
                  </View>;
    });
    return <View>
        <AtForm>
        <View className="at-row">
        <View className="at-col at-col--auto">
        <AtInput type="text" placeholder="search taskid" value={this.state.value} onChange={this.changeValue} />
        </View>
        <View className="at-col at-col--auto">
        <AtButton onClick={this.updateList.bind(this)}>search</AtButton>
        </View>
        </View>
        </AtForm>

        <ScrollView className="container" scrollY scrollWithAnimation scrollTop="0" lowerThreshold="10" upperThreshold="10" style="height:300px" onScrolltoupper={this.updateList}
      //onScrolltolower={this.appendNextPageList}
      >
        {this.state.loading ? <View className="txcenter">加载中</View> : this.state.list.map(item => {
          return <TaskList task_id={item.id} task_name={item.task_name} proxy_id={item.proxy_id} status={item.status} onSwitcher={this.handleSwitch.bind(this)} />;
        })}
      </ScrollView>

      </View>;
  }
}