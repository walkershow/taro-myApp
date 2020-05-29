import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtForm, AtSwitch} from 'taro-ui'
import './TaskList.scss'

export default class TaskList extends Taro.Component {
    constructor(){
        super(...arguments)
        this.state={switcher:this.props.status}
    }
    handler
    handleChange = (switcher) => {
        console.log("task %d change value %s to %s", this.props.task_id,this.state.switcher, switcher)
        //console.log(this.props.task_id)
        //console.log(switcher)
        //console.log(this.state.switcher)
        const ret = Taro.request({
            url:'http://192.168.1.181:8011/switcher',
            cache:"no-cache",
            method:"POST",
            header: {
    'content-type': 'application/json' // 默认值
  },
            data: {task_id:this.props.task_id,
                switcher:switcher},

            //timeout:5
        }).then(res=>{
                console.log(res)
            console.log(res.statusCode)
            console.log(res.data)
            console.log("hihi")
            this.setState({
                switcher
            })
            if (switcher){

            this.props.onSwitcher(this.props.task_id+'开启成功')
            }
            else{
            this.props.onSwitcher(this.props.task_id+'关闭成功')
            }
            return switcher
            
        }).catch(err=>{
            console.log(err)
            console.log('err')
            this.setState({
                switcher:this.state.switcher
            })
            this.props.onSwitcher(this.props.task_id+'操作发生异常')
            return this.state.switcher
            
        })
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
 //<View className='task-item'>
          //<View className='at-row'>
          //<View className='at-col at-col-2'>
              //{ this.props.task_id }
          //</View>
          //<View className='at-col at-col-1'>
              //{ this.props.proxy_id }
          //</View>
          //<View className='at-col at-col-1'>
              //{ this.props.status }
          //</View>
          //</View>
          //<View className='at-row'>
          //<View className='at-col at-col-4 at-col--wrap'>
              //{ this.props.task_name }
          //</View>
          //</View>
        //</View>
        //<AtForm>

            //<AtSwitch  checked={this.state.switcher} onChange={this.handleChange} />

  render () {
    return (
     //<View className='task-item'>
        <AtForm>
          <View className='at-row'>
          <View className='at-col at-col-auto '>
            <AtSwitch title={this.props.task_id+''} checked={Boolean(this.state.switcher)} onChange={this.handleChange} />
          </View>
        
          </View>
          <View className='at-row ' >
          <View className='at-col at-col-auto desc-item'>
              { this.props.task_name }
          </View>
          </View>
        </AtForm>
        
    )
  }
//render () {
    //return (
      //<AtForm>
        //<AtSwitch title='开启中' checked={this.state.value} onChange={this.handleChange.bind(this)} />
      //</AtForm>
    //)
  //}
}
