import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from 'react-native-spinkit';

import * as jobActions from '../../../../redux/actions/job';
import {HeaderComponent} from "../../../../components/header";


let { width, height } = Dimensions.get("window");
class JobDetail extends Component{

    static navigationOptions = {
        header: null,
    };
    componentDidMount(){
        this.props.jobActions.getJob(this.props.navigation.state.params);
    }

    componentWillUnmount(){
        this.props.jobActions.getJob('no');
    }

    render(){

        let infos = this.props.job;

        return (
            <View style={styles.container}>

                <HeaderComponent
                    headerLeft={
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='navigate-before' size={25} color='#aaa' />
                        </TouchableOpacity>
                    }
                    headerTitle={<Text style={{fontSize: 18}}>详情</Text>}
                    headerRight={<Icon name="favorite" color="#fa0064" size={20} />}
                />

                {infos.length>1
                    ?
                    <ScrollView>

                        <View style={styles.headerInfo}>
                            <Text style={styles.headerInfoTitle} >{infos[1][0]}</Text>
                            <View style={styles.extensionBox}>
                                <Text style={{padding: 3, color: '#fa0064', fontSize: 10, borderWidth: 0.5, borderColor: '#fa0064',borderRadius: 2, marginRight: 5, }}>顶</Text>
                                <Text style={{padding: 3, color: '#fa0064', fontSize: 10, borderWidth: 0.5, borderColor: '#fa0064',borderRadius: 2, marginRight: 5, }}>火</Text>
                                <Text style={{padding: 3, color: '#fa0064', fontSize: 10, borderWidth: 0.5, borderColor: '#fa0064',borderRadius: 2, marginRight: 5, }}>折</Text>
                                <Text style={{padding: 3, color: '#fa0064', fontSize: 10, borderWidth: 0.5, borderColor: '#fa0064',borderRadius: 2, marginRight: 5, }}>新</Text>
                            </View>
                            <View style={styles.headerInfoBody}>
                                <Text style={styles.headerInfoBodyTextPrice}>{infos[1][1].tag}{infos[1][1].unit}</Text>
                                <View style={styles.headerInfoBodyText}>
                                    <Text style={styles.headerInfoBodyTextTime}>{infos[1][2]}</Text>
                                    <View style={{backgroundColor: '#ccc', height: 16, width: 1, marginLeft: 10,marginRight: 10}}></View>
                                    <Text style={styles.headerInfoBodyTextSeeCount}>浏览：{infos[1][3]}次</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.bodyInfo}>
                            <View style={styles.bodyInfoHeader}>
                                {
                                    infos[2].map((item)=>(
                                        <View  style={styles.bodyInfoHeaderText} key={item.name}>
                                            <Text style={styles.topText}>{item.name}</Text>
                                            <Text style={styles.BottomText}>{item.tag}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                            <View style={styles.bodyInfoBody}>
                                {
                                    infos[3].map((item)=>(
                                        <View style={styles.infoCity} key={item.name}>
                                            <Text  style={styles.infoCityTab}>{item.name} ：</Text>
                                            <Text  style={styles.infoCityText}>{item.tag}</Text>
                                        </View>
                                    ))
                                }
                                <View style={styles.infoBox}>
                                    {
                                        infos[4].map((item)=>(
                                            <View style={styles.infoItem} key={item.name}>
                                                <Text style={styles.infoItemName}>
                                                    {item.name} ：
                                                </Text>
                                                <Text style={styles.infoItemContent} numberOfLines={1}>
                                                    {item.tag}
                                                </Text>
                                            </View>
                                        ))
                                    }

                                </View>
                            </View>

                        </View>

                        <TouchableOpacity>
                            <View style={styles.companyArea}>
                                <View>
                                    <Text style={{fontSize: 15,}}>南京农纷期电子商务有限公司</Text>
                                    <View style={styles.companyInfo}>
                                        <View style={styles.companyInfoTextBox}>
                                            <Icon name="person" size={14} color="#fa0064"/>
                                            <Text style={{marginLeft: 7}}>民营公司</Text>
                                        </View>
                                        <View style={styles.companyInfoTextBox}>
                                            <Icon name="person" size={14} color="#fa0064"/>
                                            <Text style={{marginLeft: 7}}>500-1000人</Text>
                                        </View>
                                    </View>
                                </View>
                                <Icon name="navigate-next" size={25} color="#333" />
                            </View>
                        </TouchableOpacity>

                        <View style={styles.bodyInfoDescribe}>
                            <Text style={styles.bodyInfoDescribeTitle}>详情描述</Text>
                            <View style={styles.infoCheckbox}>
                                {
                                    infos[5][0]!=null?infos[5][0].map((item)=>(
                                        <Text key={item} style={styles.infocheckboxItem}>{item}</Text>
                                    )):null
                                }
                            </View>
                            <View>
                                <Text style={styles.bodyInfoDescribeContent}>{infos[5][1]}</Text>
                            </View>
                        </View>

                    </ScrollView>
                    :
                    (
                        <View style={styles.coverLoad}>
                            <Spinner
                                size={30}
                                type='FadingCircleAlt'
                                color='#fa0064'
                                style={styles.spinner}
                            />
                        </View>
                    )
                }


            </View>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        job: state.job,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        jobActions: bindActionCreators(jobActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JobDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    //提交加载动画效果
    coverLoad: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    spinner: {
        alignItems: 'center',
        paddingBottom: '50%',
    },

    /*具体信息头部信息介绍*/
    headerInfo: {
        padding: 10,
        backgroundColor: '#fff',
    },
    headerInfoTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        paddingTop: 5,
        paddingBottom: 10,
        fontFamily: 'Helvetica',
    },
    extensionBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    extensionText: {
        padding: 3,
        color: '#fff',
        backgroundColor: '#fa0064',
        borderRadius: 3,
        marginLeft: 10,
        overflow: 'hidden',
        fontSize:12,
    },
    headerInfoBody: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        paddingBottom: 5,
    },
    headerInfoBodyText: {
        flexDirection: 'row',
        height: 20,
        alignItems: 'center',
    },
    headerInfoBodyTextPrice: {
        color: '#fa0064',
        fontSize: 16,
        lineHeight: 20,
    },
    headerInfoBodyTextTime: {
        color: '#aaa',
        fontSize:12,
    },
    headerInfoBodyTextSeeCount: {
        color: '#aaa',
        fontSize:12,
    },

    //公司信息那一块样式
    companyArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 10,
    },
    companyInfo: {
        flexDirection: 'row',
    },
    companyInfoTextBox: {
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10,
        alignItems: 'center',
    },

    /*底部具体信息介绍*/
    bodyInfo: {
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 10,
    },
    bodyInfoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    bodyInfoHeaderText: {
        alignItems: 'center',
    },
    topText: {
        color: '#999',
        paddingBottom: 10,
        fontSize: 13,
    },
    BottomText: {
        fontSize: 14,
    },
    bodyInfoBody: {
        borderTopWidth: 1,
        borderColor: '#ddd',
        margin: 10,
    },
    infoCity: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        // backgroundColor: '#eee',
    },
    infoCityTab: {
        color: '#999',
        fontSize: 13,
        paddingRight: 10,
        width: 80,
    },
    infoCityText: {
        color: '#333',
        fontSize: 13,
    },
    infoBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    infoItem: {
        flexDirection: 'row',
        width: '50%',
        height: 25,
        alignItems: 'center',
    },
    infoItemName: {
        fontSize: 13,
        color: '#999',
        paddingRight: 5,
    },
    infoItemContent: {
        fontSize: 12,
        maxWidth: '85%'
    },

    /*联系人信息*/
    contact: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    avatar: {
        width: 50,
        height: 50,
    },
    contactInfoBox: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    contactName: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    contactNameText: {
        fontSize: 18,
    },
    tel: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    telInfo: {
        color: "#999",
    },
    contactInfo: {
        fontSize: 12,
        color: "#999",
    },

    /*房子描述*/
    bodyInfoDescribe: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
    bodyInfoDescribeTitle: {
        fontSize: 18,
        fontWeight: '500',
        paddingTop: 5,
    },
    bodyInfoDescribeContent: {
        fontSize: 14,
        color: '#999',
        lineHeight: 30,
    },
    infoCheckbox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 15,
        paddingBottom: 10,
    },
    infocheckboxItem:{
        padding: 3,
        borderWidth: 1,
        fontSize: 12,
        color: '#666',
        borderColor: '#aaa',
        marginRight: 10,
        marginBottom: 10,
    }

});