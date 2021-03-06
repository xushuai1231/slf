import React, { Component } from 'react'
import { Text,
    TouchableOpacity,
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    Dimensions,
    Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Picker from 'react-native-picker';
import Spinner from 'react-native-spinkit';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {EsPhoneType, NewAndOld} from "../../../components/picker";
import {UploadImages} from "../../../components/uploadImages";
import {AreaChoose} from "../../../components/areaChoose";
import {Radio} from "../../../components/radio";
import {HeaderComponent} from "../../../components/header";
import {Toast} from "../../../components/toast";

let {width, height} = Dimensions.get('window');
let message = [];

export class Replease4to7 extends Component {

    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(...props){
        super(...props);
        this.state = {
            showToast: false,
            showLoad: false,
            direction: null,                //朝向
            images: null,                   //图片
            agent: null,                    //身份(个人/经纪人)
            area: null,                     //区域
            brand: null,                    //品牌
            new_and_old: null,              //新旧
            es_type: null                      //类型
        }
    }

    componentWillMount(){
        if(!currentUser.userinfo){
            this.props.navigation.navigate('Login', '确认登陆之后，才可以免费发布消息哦！');
        }
    };
    componentWillUnmount(){
        Picker.hide();
    }


    //提交信息
    doSubmit = ()=>{
        message = [];
        let repleaseInfo = {

            //input输入框取出的值
            title: this.refs.title._lastNativeText,
            address: this.refs.address._lastNativeText,
            price: this.refs.price._lastNativeText,
            contacts: this.refs.contacts._lastNativeText,
            tel: this.refs.tel._lastNativeText,
            qq: this.refs.qq._lastNativeText,
            wechat: this.refs.wechat._lastNativeText,
            describe: this.refs.describe._lastNativeText,


            //picker选取的值
            area: this.state.area==null?undefined:this.state.area.join(''),
            es_type: this.state.es_type==null?undefined:this.state.es_type.join(''),
            new_and_old: this.state.new_and_old==null?undefined:this.state.new_and_old.join(''),

            city: City.name,                     //城市
            user_id: currentUser.userinfo.id,
            //单选和复选选取的值
            agent: this.state.agent,

            sort_name: this.props.navigation.state.params[0],

            //图片
            images: this.state.images,

        };

        let telPattern = /^1[3|4|5|7|8][0-9]{9}$/;
        let qqPattern = /^[1-9][0-9]{5,10}$/;

        (repleaseInfo.title==null)||(repleaseInfo.title=='')?message.push('请填写信息标题!'):null;
        (repleaseInfo.address==null)||(repleaseInfo.address=='')?message.push('请填写交易地址!'):null;
        (repleaseInfo.price==null)||(repleaseInfo.price=='')?message.push('请填写价格!'):null;
        (repleaseInfo.contacts==null)||(repleaseInfo.contacts=='')?message.push('请填写联系人!'):null;


        !telPattern.test(repleaseInfo.tel)||(repleaseInfo.tel==null)||(repleaseInfo.tel=='')?message.push('请填写正确的手机号!'):null;

        repleaseInfo.area==null?message.push('请选择所属区域!'):null;
        repleaseInfo.es_type==null?message.push('请选择类型!'):null;
        repleaseInfo.new_and_old==null?message.push('请选择成色!'):null;
        repleaseInfo.images==null?message.push('请上传图片!'):null;

        if(repleaseInfo.qq){
            !qqPattern.test(repleaseInfo.qq)?message.push('QQ号输入有误!'):null;
        }


        if(message.length>0){
            this.setState({
                showToast: true
            });
            setTimeout(()=>{
                this.setState({
                    showToast: false
                });
            },200)
        }else{

            this.setState({
                showLoad: true
            });

            console.log(repleaseInfo);

            Http.post(Ip+'api/es/create', repleaseInfo ,{'Content-Type': 'application/json'},)
                .then( res=>{
                    if(res.success){
                        this.setState({
                            showLoad: false
                        });
                        alert(res.message);
                    }else{
                        alert(res.message)
                    }
                })
        }



    };


    render () {

        return (

            <View>
                <Toast
                    message={message[0]}
                    show={this.state.showToast}
                />

                <HeaderComponent
                    headerLeft={
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='navigate-before' size={25} color='#aaa' />
                        </TouchableOpacity>
                    }
                    headerTitle={<Text style={{fontSize: 18}}>{this.props.navigation.state.params}</Text>}
                />

                {this.state.showLoad?(
                    <View style={styles.coverLoad}>
                        <View style={styles.spinner}>
                            <Spinner
                                size={80}
                                type='Pulse'
                                color='#fa0064'
                                style={styles.spinner}
                            />
                            <Text style={styles.loadText}>传输中...</Text>
                        </View>
                    </View>
                ):null}

                <KeyboardAwareScrollView>

                    <ScrollView>

                        {/*提示消息*/}
                        <Text style={styles.system}>您今天还可免费发布5条信息!</Text>

                        {/*图片上传*/}
                        <UploadImages
                            images={(data)=>this.setState({images: data})}
                        />

                        <View style={styles.item}>
                            <View style={styles.itemTitle}>
                                <Text style={styles.itemTitleText}>基本信息</Text>
                            </View>
                            <AreaChoose
                                area={(data)=>this.setState({area: data})}
                            />
                            <View style={styles.info}>
                                <Text style={styles.infoTitle}>标题</Text>
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder="请填写信息标题"
                                    placeholderTextColor="#ccc"
                                    maxLength={25}
                                    style={styles.infoInput}
                                    underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                                    ref="title"
                                />
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infoTitle}>交易地址</Text>
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder="请填写交易地址"
                                    placeholderTextColor="#ccc"
                                    maxLength={50}
                                    style={styles.infoInput}
                                    underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                                    ref="address"
                                />
                            </View>

                            {/*品牌、成色选择器*/}
                            <View style={styles.pickerGroup}>
                                <EsPhoneType
                                    brand={(data)=>this.setState({es_type: data})}
                                    data={["数码", "卡片", "单反", "微单", "单电", "镜头", "闪光灯", "脚架", "读卡器", "存储卡", "相机", "电池", "其他"]}
                                />

                                <NewAndOld
                                    new_and_old={(data)=>this.setState({new_and_old: data})}
                                />
                            </View>

                        </View>

                        <View style={styles.item}>
                            <View style={styles.itemTitle}>
                                <Text style={styles.itemTitleText}>价格详情</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infoTitle}>价格(元)</Text>
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder="请填写价格"
                                    placeholderTextColor="#ccc"
                                    keyboardType="numeric"
                                    maxLength={15}
                                    style={styles.infoInput}
                                    underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                                    ref="price"
                                />
                            </View>
                        </View>

                        <View style={styles.item}>
                            <View style={styles.itemTitle}>
                                <Text style={styles.itemTitleText}>与我联系</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infoTitle}>联系人</Text>
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder="请填写联系人"
                                    placeholderTextColor="#ccc"
                                    maxLength={10}
                                    style={styles.infoInput}
                                    underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                                    ref="contacts"
                                />
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infoTitle}>手机号</Text>
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder="请填写手机号"
                                    placeholderTextColor="#ccc"
                                    keyboardType="numeric"
                                    style={styles.infoInput}
                                    underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                                    ref="tel"
                                />
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infoTitle}>QQ</Text>
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder="请填写QQ号(可不填)"
                                    placeholderTextColor="#ccc"
                                    keyboardType="numeric"
                                    maxLength={11}
                                    style={styles.infoInput}
                                    underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                                    ref="qq"
                                />
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infoTitle}>微信</Text>
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder="请填写微信号(可不填)"
                                    placeholderTextColor="#ccc"
                                    maxLength={25}
                                    style={styles.infoInput}
                                    underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                                    ref="wechat"
                                />
                            </View>

                        </View>

                        <View style={styles.item}>
                            <View style={styles.itemTitle}>
                                <Text style={styles.itemTitleText}>其他</Text>
                            </View>

                            <View style={styles.info}>
                                <View style={styles.info}>
                                    <Text style={styles.infoTitle}>身份</Text>
                                    <Radio data={['个人','经纪人']} select={(data)=>this.setState({agent: data})}/>
                                </View>
                            </View>

                            <View style={styles.info}>
                                <Text style={styles.infoTitle}>内容描述</Text>
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder="(选填)内容描述介意大大提高成功率哦！"
                                    placeholderTextColor="#ccc"
                                    multiline= { true }
                                    maxLength={5000}
                                    style={styles.infoInputAeaa}
                                    underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                                    ref="describe"
                                />

                            </View>
                        </View>

                        <TouchableOpacity onPress={this.doSubmit}>
                            <Text style={styles.submitBtn}>
                                立即发布
                            </Text>
                        </TouchableOpacity>

                        <View style={{height: 60}} />

                    </ScrollView>

                </KeyboardAwareScrollView>

            </View>

        )
    }

}

const styles = StyleSheet.create({

    //提交加载动画效果
    coverLoad: {
        width: width,
        height: height,
        backgroundColor: 'rgba(255,255,255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
    },
    spinner: {
        alignItems: 'center',
    },
    loadText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#fa0064',
        fontSize: 18,
    },

    //提示消息
    system: {
        backgroundColor: '#fa0064',
        color: '#fff',
        padding: 5,
        paddingLeft: 10,
    },
    //图片上传样式
    imgUploadBox:{
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 15,
        paddingTop: 15,
    },
    imgUploadImg: {
        width: 70,
        height: 70,
    },
    imgUploadText: {
        fontSize: 16,
        marginTop: 15,
        color: '#999',
    },
    imagesBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imagesItem: {
        width: width/3-20,
        height: width/3-20,
        margin: 10,
    },

    //数据注入区域
    item:{
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        marginTop: 5,
    },
    itemTitle: {
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    itemTitleText: {
        padding: 10,
    },
    info:{
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    infoTitle: {
        padding: 10,
        color: '#444',
        fontSize: 12,
    },
    infoInput: {
        width: width,
        textAlign: 'center',
        fontSize: 16,
        padding: 0,
        marginBottom: 10,
    },
    infoInputAeaa: {
        width: width*0.9,
        fontSize: 14,
        padding: 10,
        marginBottom: 10,
        height: 100,
        backgroundColor: '#f0f0f0',
        textAlignVertical: 'top',
    },

    //picker选择区
    pickerGroup: {
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
    },



    //发布按钮
    submitBtn: {
        marginTop: 20,
        height: 40,
        lineHeight: Platform.OS=='ios'?40:30,
        textAlign: 'center',
        width: width,
        fontSize: 16,
        color: '#fff',
        backgroundColor: '#fa0064',
        overflow: 'hidden',
        fontWeight: '500',
    },


});