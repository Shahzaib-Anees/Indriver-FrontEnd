import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Provider, useSelector } from 'react-redux';
const CustomDrawer = (prop) => {
    const [userInfo, setUserInfo] = useState({});
    const [ifDriverMode, setIfDriverMode] = useState(false);
    const router = useRouter();
    const userGlobalInfo = useSelector((state) => state.user);
    useEffect(() => {
        setUserInfo(userGlobalInfo?.info);
    }, []);
    return (
        <View style={{
            flex: 1,
        }}>
            {/* Header  */}
            <TouchableOpacity onPress={() => router.push({
                pathname: "/SingleUser/[id]",
                params: {
                    id: `${userGlobalInfo?.uid}`,
                }
            })} style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 2,
                paddingHorizontal: 8,
                paddingVertical: 10,
            }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Image source={userInfo?.profileImage ? `${userInfo?.profileImage}` : require('@/assets/images/userLocalImage.png')} style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        borderWidth: 1,
                        marginLeft: 3,
                    }} />
                    < Text style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#fbfbfb',
                        marginLeft: 3,
                    }}>{userInfo?.name}</Text>
                </View>
                <View style={{
                    marginLeft: 40,
                }}>
                    <SimpleLineIcons name="arrow-right" size={17} color="#a2a2a3" />
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 8,
                borderTopWidth: 0.5,
                borderTopColor: "#a2a2a3",
                borderBottomWidth: 0.5,
                borderBottomColor: "#a2a2a3",
            }}>
                <DrawerContentScrollView {...prop} >
                    <DrawerItemList {...prop} style={{
                        padding: 0,
                        margin: 0
                    }} />
                </DrawerContentScrollView>
            </View>
            <View style={{
                flex: 1.7,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 11,
            }}>
                <TouchableOpacity style={{
                    width: "93%",
                    padding: 13,
                    backgroundColor: "#b0f221",
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                }}>
                    <Text style={{
                        fontSize: 19,
                        fontWeight: 600,
                        color: "#101010",
                    }}>
                        {
                            ifDriverMode ? "Pasenger mode" : "Driver mode"
                        }
                    </Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    gap: 23,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        backgroundColor: "#ffff",
                        borderRadius: 50,
                    }}>
                        <Image source={require("@/assets/images/facebookLogoIcon.png")} style={{
                            width: 35,
                            height: 35,
                            borderRadius: 50,
                        }} />
                    </View>
                    <View style={{
                        backgroundColor: "#ffff",
                        borderRadius: 50,
                    }}>
                        <Image source={require("@/assets/images/instagramLogoIcon.png")} style={{
                            width: 35,
                            height: 35,
                            borderRadius: 50,
                        }} />
                    </View>
                </View>
            </View>
        </View >
    )
}

export default CustomDrawer