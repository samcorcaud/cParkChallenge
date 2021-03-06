import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { DatePicker } from './DatePicker';
import { API } from '../Backend/API';

/**
 * The ReportView class display the "ReportView" screen on wich the user can send report.
 * This class set and stock the state of the different variables.
 * It manages everything there is to manage concerning this part of the application.
 */
export class ReportView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            latitude: null,
            longitude: null,
            error: null,
            date: new Date(),
        };

        this.setTime = this.setTime.bind(this);
    }

    /**
     * Set the state of the time variable on the current date.
     * @param time, time of the device.
     */
    setTime(time) {
        console.log('Time has been changed in parent to', time);
        this.setState({ date: time });
    }

    /**
     * Retrieves the current position of the phone before other functions via "componentDidMount()" function.
     */
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
            },
            (error) => this.setState({ error: error.message }),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            },
        );
    }

    render() {
        return (
            <View style={stylesReport.container}>
                <View style={stylesReport.header}>
                    <Text style={stylesReport.titleStyle}>cPark challenge</Text>
                </View>
                <View style={stylesReport.boxStyle}>
                    <Text style={stylesReport.textStyle}>Title</Text>
                    <TextInput style={stylesReport.textInputStyle}
                               placeholder="Title"
                               onChangeText={(title) => this.setState({ title })}
                               value={this.state.title}/>
                    <Text style={stylesReport.textStyle}>Date</Text>
                    <DatePicker setDate={this.setTime}/>
                    <View style={stylesReport.sendTouchable}>
                        <TouchableOpacity onPress={() => {
                            API.postData({
                                position: {
                                    lat: this.state.latitude,
                                    long: this.state.longitude
                                },
                                title: this.state.title,
                                dateTime: this.state.date
                            });
                        }}>
                            <View style={stylesReport.sendTouchableButton}>
                                <Text style={stylesReport.textStyle}>Send report</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={stylesReport.footer}>
                    <TouchableOpacity style={stylesReport.touchablePosition}
                                      onPress={this.props.showList}>
                        <View style={stylesReport.touchableButton}>
                            <Text style={stylesReport.textStyleList}>Lists of reports</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const stylesReport = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#C2D3DA',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    header: {
        position: 'absolute',
        height: 75,
        top: 0,
        width: '100%',
        backgroundColor: '#1D65A6',
        alignItems: 'center',
        textAlign: 'center',


    },
    titleStyle: {
        fontStyle: 'normal',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        bottom: 2,
        position: 'absolute',


    },
    footer: {
        position: 'absolute',
        height: 45,
        bottom: 0,
        width: '100%',
        //backgroundColor: '#1D65A6',
        alignItems: 'center'

    },
    boxStyle: {
        borderRadius: 5,
        borderWidth: 2,
        //margin: 10,
        borderColor: 'black',
        height: 200,
        width: '80%',
        alignItems: 'center'

    },
    textStyle: {
        fontStyle: 'normal',
        fontWeight: '400',
        color: 'black',
        textAlign: 'center',
    },
    textStyleList: {
        fontStyle: 'normal',
        fontWeight: '400',
        color: 'white',
        textAlign: 'center',
    },
    textInputStyle: {
        height: 50,
        width: 180,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        textAlign: 'center',


    },
    buttonStyle: {
        position: 'absolute',
        bottom: 0,
        width: '80%',
        color: '#F18904',


    },
    positionButton: {
        position: 'absolute',
        bottom: 10,

    },
    touchableButton: {
        width: 160,
        backgroundColor: '#1D65A6',
        alignItems: 'center',
        height: 30,
        borderColor: 'white',
        borderRadius: 5,
        borderWidth: 2,

    },
    touchablePosition: {
        position: 'absolute',
        bottom: 10
    },
    sendTouchable: {
        position: 'absolute',
        bottom: 10
    },
    sendTouchableButton: {
        width: 160,
        //backgroundColor: '#72A2C0',
        alignItems: 'center',
        height: 30,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 2,
    }
});
