import { View, Text, TextInput, StyleSheet, Touchable, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { addDatainDb, signUpUser } from '@/Utils/configs/Methods/Methods';
import AuthMessageHandler from '@/components/customComponents/AuthMessageHandler/AuthMessageHandler';
import { Link, useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = () => {
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [ifTrySeePassword, setIfTrySeePassword] = useState<boolean>(true);
    const [ifWrongInput, setIfWrongInput] = useState<boolean>(false);
    const [ifSignUpSuccess, setIfSignUpSuccess] = useState<"success" | "failed" | false>(false);
    const [ifTrySignUp, setIfTrySignUp] = useState<boolean>(false);
    const router = useRouter();
    const submitForm = async () => {
        setIfTrySignUp(true);
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
            // Sign Up 
            const newUserCredentials: object | any = await signUpUser(userEmail, userPassword);
            // Add to Database 
            const dataBaseResponse = await addDatainDb("users", newUserCredentials?.uid, {
                name: userName,
                email: userEmail,
                password: userPassword,
                ridesHistory: [],
                profilePicture: "",
                driver: false,
                city: "",
                isVerified : false,
            })
            console.log(dataBaseResponse);
            await AsyncStorage.setItem("uid", newUserCredentials?.uid);
            setIfSignUpSuccess('success');
        } catch (error) {
            console.log(error);
            setIfSignUpSuccess('failed');
            setIfWrongInput(true);
        } finally {
            if (ifWrongInput) {
                setUserName(userName);
                setUserEmail(userEmail);
                setUserPassword(userPassword);
                return;
            }
            router.push('/MainPage');
        }
    }
    return (
        <>
            <SafeAreaProvider>
                {/* Header  */}
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 30,
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
                <ScrollView>
                    <View style={{
                        flex: 6,
                        marginTop: 20,
                    }}>
                        <View style={{
                            paddingHorizontal: 10,
                        }}>
                            <Text style={{
                                marginLeft: 10,
                                color: "#fbfbfb",
                                fontSize: 19,
                                fontWeight: 700,
                            }}>Create your account</Text>
                        </View>
                        {/* Form  */}
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
                                    Full Name
                                </Text>
                                <View style={styles.inputFieldContainer}>
                                    <View style={{
                                        paddingHorizontal: 5
                                    }}>
                                        <AntDesign name="user" size={20} color="#fff" />
                                    </View>
                                    <TextInput
                                        onChangeText={setUserName}
                                        value={userName}
                                        placeholder='Enter your name'
                                        placeholderTextColor="#fff"
                                        inputMode='text'
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
                            </View>
                            <View style={{
                                padding: 10,
                            }}>
                                <TouchableOpacity onPress={submitForm} disabled={ifTrySignUp} style={{
                                    width: 320,
                                    paddingVertical: 12,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: ifTrySignUp ? "gray" : "#b0f221",
                                }} >
                                    <Text style={{
                                        color: ifTrySignUp ? "#fff" : "#101010",
                                        fontSize: 22,
                                        fontWeight: 700,
                                    }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            {/* Sign In Navigation  */}
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
                                    }}>if you already have an account ?</Text>
                                    <Link href={"/Login"} style={{
                                        padding: 8,
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: "#c6c5c4",
                                            fontWeight: 700,
                                        }}>
                                            Login in
                                        </Text>
                                    </Link>
                                </View>
                            </View>
                        </View>
                    </View>
                    {
                        ifTrySignUp && (ifSignUpSuccess === "success" ? <AuthMessageHandler text="Registered Successfully" /> : ifSignUpSuccess === "failed" ? <AuthMessageHandler text="Registration failed" /> : null)
                    }
                </ScrollView>
            </SafeAreaProvider>
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
export default Register;