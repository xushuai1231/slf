import React,{ Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, Platform,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

import * as userActions from '../../redux/actions/user';

class Login extends Component{

    static navigationOptions =({navigation})=>({
        headerTitle: '',
        headerLeft: (
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Icon name="navigate-before" size={25} color="#666" />
            </TouchableOpacity>
        ),
        headerRight: (
            <Text style={{color: '#333', paddingRight: 10, fontSize: 16,}} onPress={()=>navigation.navigate('Register')}>注册</Text>
        ),
        headerStyle: {
            backgroundColor: '#f9f9f9',
            borderBottomWidth: 0,
        }

    });

    constructor(...props){
        super(...props);
        this.state={
            username: '',
            password: '',
        }
    }


    componentDidMount(){
        MessageBarManager.registerMessageBar(this.refs.alert)
    }
    componentWillUnmount(){
        MessageBarManager.unregisterMessageBar();
    }

    goBack(){
        this.props.navigation.goBack();
    }

    doLogin(){
        console.log(this.state);
        if((this.state.username=='admin')&&(this.state.password=='123123')){
            this.props.userActions.login();
            this.goBack();
        }else{
            MessageBarManager.showAlert({
                message: '用户名或密码填写错误',
                alertType: 'error',
                animationType: 'SlideFromRight',
                avatar: (<Icon name="info" color="#fff" size={20} />)
            })
        }

    }
    toRegister(){
        this.props.navigation.navigate('Register');
    }

    render(){
        return (
            <View style={styles.container}>

                <MessageBar ref="alert" />

                {/*Logo摆放位置*/}
                <Image source={require('../../images/logo.png')} style={styles.logo} />

                {/*登录FORM表单提交*/}
                <View style={styles.loginForm}>
                    <TouchableOpacity>
                        <TextInput
                            placeholder="用户名"
                            autoCapitalize="none"
                            style={styles.loginInput}
                            onChangeText={(text)=>this.setState({username: text})}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <TextInput
                            placeholder="密码"
                            style={styles.loginInput}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={(text)=>this.setState({password: text})}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.doLogin.bind(this)}>
                        <Text style={styles.loginBtn}> 登录</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }

}

const mapStateToProps = (state)=>{
    return {
        user: state.user,
        nav: state.nav
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

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

});