import React,{ Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform,StyleSheet,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

let { width, height } = Dimensions.get("window");
let timer;


export class Register extends Component{

    static navigationOptions = {
        header: null,
    }
    constructor(...props){
        super(...props);
        this.state = {
            canGetCheckCode: true,
            checkCodeTime: 15,
        }
    }
    componentDidMount(){
        if(typeof(checkTime)!='undefined'&&checkTime>1){
            this.setState({
                canGetCheckCode: false,
                checkCodeTime: checkTime,
                tel: '',
                checkCode: '',
                password: '',
            });
            this.downCountTime();
        }
    }

    componentWillUnmount(){
        global.checkTime = this.state.checkCodeTime;
        clearInterval(timer);
    }

    changeUserInfo(){
        console.log(this.props)
    }

    goBack(){
        this.props.navigation.goBack();
    }

    getCheckCode =()=>{
        let pattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0,5-9])|(18[0,5-9]))\d{8}$/;
        console.log(pattern.test(this.state.tel));

        if(pattern.test(this.state.tel)){
            this.setState({
                canGetCheckCode: false,
                checkCodeTime: 15,
            });
            this.downCountTime();
        }else{
            alert('手机号未填写或格式错误！');
        }
    };

    downCountTime = ()=>{

        timer = setInterval(()=>{
            if(this.state.checkCodeTime>1){
                this.state.checkCodeTime--;
                this.setState({
                    checkCodeTime: this.state.checkCodeTime--,
                });
            }else{
                console.log('倒计时结束');
                this.setState({
                    canGetCheckCode: true,
                });
                clearInterval(timer);
            }
        }, 1000)

    }

    doRegister(){
        let userinfo = {
            tel: this.state.tel,
            checkCode: this.state.checkCode,
            password: this.state.password,
        };
        let telPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0,5-9])|(18[0,5-9]))\d{8}$/;
        let passwordPattern = /^[a-zA-Z0-9,.?~!@#$%^&*]{6,16}$/;

        if(telPattern.test(userinfo.tel)){
            if(passwordPattern.test(userinfo.password)){
                if(userinfo.checkCode == '666666'){
                    alert('注册成功');
                }else{
                    alert('验证码不正确');
                }
            }else{
                alert('密码未填写或格式错误!')
            }
        }else{
            alert('手机号未填写或格式错误!')
        }


        console.log(userinfo)

/*        fetch('http://rapapi.org/mockjsdata/26250/api/user/verify', {
            method: 'POST',
            body: 'honeNummber=15366123031&password=123123&verifyCode=941231'
        })
            .then(res=>res.json())
            .then((userinfo)=>{
                console.log(userinfo);
                this.props.navigation.navigate('User', userinfo);
                return userinfo;
            })
            .catch((error)=>{
                console.log(error);
            })*/
    }
    toLogin(){
        this.props.navigation.goBack();
    }

    render(){

        return (
            <View style={styles.container}>

                {/*头部导航位置*/}
                <View style={styles.navTitle}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Icon name="close" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.toLogin.bind(this)}>
                        <Text style={styles.loginText}>登录</Text>
                    </TouchableOpacity>
                </View>

                {/*Logo摆放位置*/}
                <Image source={require('../../images/logo.png')} style={styles.logo} />

                {/*登录FORM表单提交*/}
                <View style={styles.loginForm}>
                    <TouchableOpacity>
                        <TextInput
                            placeholder="手机号"
                            style={styles.loginInput}
                            autoCapitalize="none"
                            onChangeText={(text)=>this.setState({tel: text})}                        />
                    </TouchableOpacity>
                    <View style={styles.CheckCodeBox}>
                        <TextInput placeholder="动态码"
                                   style={styles.loginInput}
                                   password='true'
                                   autoCapitalize="none"
                                   onChangeText={(text)=>this.setState({checkCode: text})}
                        />
                        {this.state.canGetCheckCode?(<Text style={styles.CheckCode} onPress={this.getCheckCode}>获取动态码</Text>):(<Text style={[styles.CheckCode,styles.noCheckCode]}>{this.state.checkCodeTime}秒后可再次获取</Text>)}
                    </View>
                    <View>
                        <TextInput
                            placeholder="密码"
                            style={styles.loginInput}
                            password='true'
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={(text)=>this.setState({password: text})}
                        />
                    </View>
                    <TouchableOpacity onPress={this.changeUserInfo.bind(this)}>
                        <Text style={styles.loginBtn} onPress={this.doRegister.bind(this)}>注册</Text>
                    </TouchableOpacity>
                    <Text style={styles.agreement}>注册即代表同意《搜来福使用协议》</Text>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    loginText: {
        fontSize: 18,
    },
    navTitle: {
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 20,
        marginTop: Platform.OS==='ios' ? 15: 0,
    },
    logo: {
        width: "26%",
        marginLeft: "37%",
        resizeMode: 'contain',
        marginTop: 50,
        marginBottom: 30,

    },
    loginForm: {
        padding: 20,

    },
    loginInput: {
        marginBottom: 10,
        borderBottomWidth: Platform.OS==='ios' ? 1:0,
        borderColor: '#eee',
        fontSize: 16,
        lineHeight: 30,
        paddingTop: 10,
        paddingBottom: 10,

    },
    CheckCodeBox: {
        position: 'relative',
    },
    CheckCode: {
        borderWidth: 0.5,
        borderColor: '#fa0064',
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        color: '#fa0064',
        fontWeight: '100',
        fontSize: 12,
        position: 'absolute',
        right: 0,
        top: 7,
    },
    noCheckCode: {
        borderColor: '#aaa',
        color: '#aaa',
    },
    loginBtn: {
        backgroundColor: '#fa0064',
        color: '#fff',
        fontSize: 16,
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: 'center',
        marginTop: 20,
        borderRadius: 3,
        overflow: 'hidden',
    },
    agreement: {
        textAlign: 'center',
        color: '#aaa',
        fontSize: 12,
        margin: 20,
    },

});