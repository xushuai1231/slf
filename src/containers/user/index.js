import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    ScrollView,
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as userActions from '../../redux/actions/user';


let { width, height } = Dimensions.get("window");
class User extends Component{

    static navigationOptions = {
        header: null,
        tabBarLabel: "我的",
        tabBarIcon: ({tintColor})=>((<Icon name="account-circle" size={25} color={tintColor}/>))
    };

    constructor(...props){
        super(...props);
    }

    //跳转设置页面
    toSetting = ()=>{
        this.props.navigation.navigate("UserSetting");
    };
    //跳转登录页面
    toLogin(){
        if(currentUser.loginState){
            this.toSetting();
        }else{
            this.props.navigation.navigate("Login");
        }
    };
    //跳转推广页面
    toExtension =()=>{

        //打印用户信息
        console.log(currentUser);

        storage.load({
            key: 'currentUser'
        })
            .then(ret=>{
                console.log(ret);
            })
            .catch(err=>{
                console.log('用户数据获取不到！');
            })
    };

    render(){

        return(
            <ScrollView style={styles.container}>

                {/*设置用户中心头部显示头像、用户名、设置及登录跳转....*/}
                <ImageBackground
                    source={require("../../images/bg-user.jpg")}
                    style={styles.bgUser}
                >
                    {/*设置按钮*/}
                    <View style={styles.settingsBox}>
                        <Icon name="settings" size={16} style={styles.settingsIcon} />
                        <Text  onPress={this.toSetting}  style={ styles.settingsText }>设置</Text>
                    </View>

                    {/*用户名*/}
                    <Text style={styles.username}>{currentUser.loginState?currentUser.userinfo.username:''}</Text>

                    {/*用户头像*/}
                    <TouchableWithoutFeedback onPress={this.toLogin.bind(this)} style={styles.headerImgBox}>
                        <Image
                            source={currentUser.loginState?{uri: 'http://www.hotcc.cn/public/upload/avatar/'+currentUser.userinfo.avatar}:require("../../images/header-img-login.png")}
                            style={styles.headerImg}
                        />
                    </TouchableWithoutFeedback>
                </ImageBackground>


                {/*中间图标功能区域*/}

                <View style={styles.userNav}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserReplease')} >
                        <View style={styles.navItem}>
                            <Icon name="description" size={40} color="#00aea1" />
                            <Text style={styles.navItemText}>我的发布</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserCollection')} >
                        <View style={styles.navItem}>
                            <Icon name="collections" size={40} color="#fe4a6c" />
                            <Text style={styles.navItemText} >我的收藏</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('JobTab')} >
                        <View style={styles.navItem}>
                            <Icon name="card-travel" size={40} color="#ffb300" />
                            <Text style={styles.navItemText}>我的招聘</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.toExtension}>
                        <View style={styles.navItem}>
                            <Icon name="palette" size={40} color="#fa0064" />
                            <Text style={styles.navItemText}>推广服务</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </ScrollView>
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
)(User);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bgUser: {
        width: width,
        height: 130,
        position: 'relative',
    },
    settingsBox: {
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 15,
        top: Platform.OS =="ios"?30:15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    settingsText: {
        fontSize: 16,
    },
    settingsIcon: {
        paddingRight: 5,
    },
    username: {
        fontSize:16,
        textAlign: 'center',
        width: 300,
        backgroundColor: 'transparent',
        position: 'absolute',
        left: (width-300)/2,
        top: 60
    },
    headerImgBox: {

    },
    headerImg: {
        width: 80,
        height: 80,
        borderWidth: 3,
        borderColor: "#fff",
        borderRadius: 40,
        marginTop: 90,
        marginLeft: (width-80)/2,
        marginRight: (width-80)/2,
    },
    userNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 100,
    },
    navItem: {
        justifyContent: "center",
        alignItems: "center"
    },
    navItemText: {
        marginTop: 10,
    },
});