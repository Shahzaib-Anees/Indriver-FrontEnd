import { View, Text, Image, FlatList, useWindowDimensions, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import Slides from '@/Utils/ImageSlides/Slides'
import Animated from 'react-native-reanimated'
import GoogleAuthentication from '@/components/customComponents/GoogleAuthenticationButton/GoogleAuthenticationButton'
import { Link } from 'expo-router'

const AuthenticationInterface = () => {
    const { width } = useWindowDimensions();
    const [ifScrollImageHero, setIfScrollImageHero] = useState<boolean>(false);
    return (
        <>
            <SafeAreaView style={{
                flex: 1,
            }}>
                <View style={{
                    flex: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 40,
                }}>
                    <Image source={require("@/assets/images/IndriverHeroIcon.png")} style={{
                        width: 100,
                        resizeMode: 'contain',
                    }} />
                    <FlatList data={Slides}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled bounces={false}
                        keyExtractor={(item) => item.id}
                        // onScroll={()=>setIfScrollImageHero(!ifScrollImageHero)}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                    width: width,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image source={item.image} style={{
                                        width: item?.width,
                                        height: item?.height,
                                        resizeMode: 'contain',
                                    }} />
                                    <View style={{
                                        gap: 2,
                                        marginTop: 35,
                                        paddingHorizontal: 5,
                                    }}>
                                        <Text style={{
                                            fontSize: 26,
                                            fontWeight: 'bold',
                                            color: '#fbfbfb',
                                            textAlign: 'center',
                                        }}>{item.title}</Text>
                                        <View style={{
                                            gap: 1,
                                            marginTop: 5,
                                        }}>
                                            <Text style={{
                                                fontSize: 17,
                                                fontWeight: 600,
                                                color: '#c6c5c4',
                                                textAlign: 'center',
                                            }}>{item.subtitle1}</Text>
                                            {
                                                item?.subtitle2 &&
                                                (<Text style={{
                                                    fontSize: 17,
                                                    fontWeight: 600,
                                                    color: '#c6c5c4',
                                                    textAlign: 'center',
                                                }}>
                                                    {item.subtitle2}
                                                </Text>)
                                            }
                                        </View>
                                    </View>
                                </View>
                            )
                        }} />
                </View>
                <View style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 11,
                    gap: 27,
                }}>
                    {/* Animated Pagination  */}
                    <View style={{
                        flexDirection: 'row',
                        gap: 8,
                        marginTop: 40,
                    }}>
                        <Animated.View style={{
                            width: 8,
                            height: 8,
                            borderRadius: 10,
                            backgroundColor: '#fbfbfb',
                            opacity: !ifScrollImageHero ? 1 : 0.5,
                        }} />
                        <Animated.View style={{
                            width: 8,
                            height: 8,
                            borderRadius: 10,
                            backgroundColor: '#fbfbfb',
                            opacity: ifScrollImageHero ? 1 : 0.5,
                        }} />
                    </View>
                    {/* Button Container  */}
                    <View style={{
                        width: "100%",
                        gap: 14,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity style={{
                            width: "100%",
                            padding: 14,
                            backgroundColor: "#b0f221",
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                        }}>
                            <Link href={"/Login"}>
                                <Text style={{
                                    fontSize: 19,
                                    fontWeight: 500,
                                    color: "#101010",
                                }}>
                                    Login to your account
                                </Text>
                            </Link>
                        </TouchableOpacity>
                        <GoogleAuthentication />
                        <Text style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#c6c5c4",
                            textAlign: 'center',
                            marginTop: 2,
                        }}>
                            Joining our app means you agree with our <Text style={{
                                textDecorationLine: 'underline',
                            }}>
                                Terms of Service
                            </Text> and <Text style={{
                                textDecorationLine: 'underline',
                            }}>
                                Privacy Policy
                            </Text>
                        </Text>
                    </View>
                </View>
            </SafeAreaView >
        </>
    )
}

export default AuthenticationInterface