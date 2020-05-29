import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import './task_list.scss';

export default class Task_list extends Taro.Component {

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return <View className="task_list">
          <View className="flex1">
              this.props.task_id
          </View>
          <View className="flex6">
              this.props.task_name
          </View>
          <View className="flex1">
              this.props.proxy_id
          </View>
          <View className="flex1">
              this.props.status
          </View>
      </View>;
  }
}