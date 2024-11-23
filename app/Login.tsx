import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { signInUser } from '@/Utils/configs/Methods/Methods';
import AuthMessageHandler from '@/components/customComponents/AuthMessageHandler/AuthMessageHandler';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [ifWrongInput, setIfWrongInput] = useState<boolean>(false);
    const [ifTrySeePassword, setIfTrySeePassword] = useState<boolean>(true);
    const [ifSignInSuccess, setIfSignInSuccess] = useState<"success" | "failed" | false>(false);
    const [ifTrySignIn, setIfTrySignIn] = useState<boolean>(false);
    const router = useRouter();
    const submitForm = async () => {
        setIfTrySignIn(true);
        if (userEmail === "" || userPassword === "") {
            alert("Please fill the form");
            setIfWrongInput(true);
            return;
        } else {
            if (!userEmail.includes("@") || !userEmail.includes(".com")) {
                alert("Please enter a valid email address");
                setIfWrongInput(true);
                return;
            }
            if (userPassword.length < 8) {
                alert("Password must be at least 8 characters long");
                setIfWrongInput(true);
                return;
            }
        }
        try {
            const userCredentials: any = await signInUser(userEmail, userPassword);
            await AsyncStorage.setItem("uid", userCredentials?.uid);
            setIfSignInSuccess('success');
        } catch (error) {
            console.log(error);
            setIfSignInSuccess('failed');
            setIfWrongInput(false);
        } finally {
            if (ifWrongInput) {
                setUserEmail(userEmail);
                setUserPassword(userPassword);
                return;
            }
            router.push('/MainPage');
        }
    }
    return (
        <>
            {/* Header  */}
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 60,
                gap: 8,
            }}>
                <Text style={{
                    marginLeft: 10,
                    color: "#fbfbfb",
                    fontSize: 27,
                    fontWeight: 700,
                }}>Welcome to</Text>
                <Image source={require("@/assets/images/IndriverHeroIcon.png")} style={{
                    width: 100,
                    height: 50,
                    resizeMode: "contain",
                }} />
            </View>
            {/* Form  */}
            <View style={{
                flex: 4,
                marginTop: 10,
            }}>
                <View style={{
                    padding: 10,
                }}>
                    <View style={{
                        padding: 10,
                        gap: 6,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            color: "#82ABBA",
                            fontWeight: 500
                        }}>
                            Email Address
                        </Text>
                        <View style={styles.inputFieldContainer}>
                            <View style={{
                                paddingHorizontal: 5
                            }}>
                                <Feather name="mail" size={20} color="#fff" />
                            </View>
                            <TextInput
                                onChangeText={setUserEmail}
                                value={userEmail}
                                placeholder='Enter your email'
                                placeholderTextColor="#fff"
                                inputMode='email'
                                style={styles.input}
                            />
                        </View>
                    </View>
                    <View style={{
                        padding: 10,
                        gap: 6,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            color: "#82ABBA",
                            fontWeight: 500
                        }}>
                            Password
                        </Text>
                        <View style={styles.inputFieldContainer}>
                            <View style={{
                                paddingHorizontal: 5
                            }}>
                                <Feather name="lock" size={20} color="#fff" />
                            </View>
                            <TextInput
                                onChangeText={setUserPassword}
                                value={userPassword}
                                placeholder='Enter your password'
                                secureTextEntry={ifTrySeePassword}
                                placeholderTextColor="#fff"
                                style={styles.input}
                            />
                            <View style={styles.eyeIconContainer} onTouchEnd={() => setIfTrySeePassword(!ifTrySeePassword)}>
                                {ifTrySeePassword ? <Feather name="eye" size={20} color="#fff" /> : <Feather name="eye-off" size={20} color="#fff" />}
                            </View>
                        </View>
                        <Text style={{
                            alignSelf: "flex-end",
                            color: "#82ABBA",
                            fontSize: 13,
                            fontWeight: 500,
                        }}>Forgot Password ?</Text>
                    </View>
                    <View style={{
                        padding: 10,
                    }}>
                        <TouchableOpacity onPress={submitForm} disabled={ifTrySignIn} style={{
                            width: "100%",
                            paddingVertical: 12,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: ifTrySignIn ? "gray" : "#b0f221",
                        }} >
                            <Text style={{
                                color: ifTrySignIn ? "#fff" : "#101010",
                                fontSize: 22,
                                fontWeight: 500,
                            }}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Registraion Navigation  */}
                <View style={{
                    marginTop: 20,
                    gap: 20,
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <View style={{
                            width: "40%",
                            height: 1,
                            backgroundColor: "#82ABBA",
                        }} />
                        <Text style={{
                            fontSize: 17,
                            color: "#82ABBA",
                            fontWeight: 700,
                            paddingHorizontal: 10,
                        }}>Or</Text>
                        <View style={{
                            width: "40%",
                            height: 1,
                            backgroundColor: "#82ABBA",
                        }} />
                    </View>
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{
                            fontSize: 17,
                            color: "#82ABBA",
                            fontWeight: 700,
                        }}>if you don't have an account ?</Text>
                        <Link href={"/Register"} style={{
                            padding: 8,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: "#c6c5c4",
                                fontWeight: 700,
                            }}>
                                Create Account
                            </Text>
                        </Link>
                    </View>
                </View>
            </View>
            {
                ifTrySignIn &&
                (ifSignInSuccess === "success" ? <AuthMessageHandler text="Log in successfully" /> : ifSignInSuccess === "failed" ? <AuthMessageHandler text="Log in failed" /> : null)
            }
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "78%",
        height: 50,
        padding: 10,
        color: "#fff",
        fontSize: 17,
    },
    inputFieldContainer: {
        height: 52,
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#82ABBA",
        color: "#fff",
        fontSize: 16,
    },
    eyeIconContainer: {
        width: 40,
        paddingHorizontal: 10,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderLeftWidth: 1,
        borderLeftColor: "#fff",
    }
});
export default Login