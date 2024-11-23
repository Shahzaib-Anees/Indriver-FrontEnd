import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser'
import { googleAuthentication } from '@/Utils/configs/Methods/Methods'

interface GoogleAuthResponse {
    type: string;
    params: {
        id_token: string;
    };
}
const GoogleAuthentication = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "442696293250-mt34bv2e651s6s6b4hv239r6a7vdus9v.apps.googleusercontent.com",
        webClientId: "442696293250-mt34bv2e651s6s6b4hv239r6a7vdus9v.apps.googleusercontent.com",
        // expoClientId: "442696293250-mt34bv2e651s6s6b4hv239r6a7vdus9v.apps.googleusercontent.com"
    });

    //User Click Handle Authenticate Functionality
    const authenticateWithGoogle = async (token: string) => {
        try {
            const response = await googleAuthentication(token);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if ((response as GoogleAuthResponse)?.type === "success") {
            const { id_token } = (response as GoogleAuthResponse).params;
            (async () => {
                const credentials = await authenticateWithGoogle(id_token);
            })()
        }
    }, [response])


    return (
        <>
            <TouchableOpacity onPress={() => promptAsync()} style={{
                width: "100%",
                padding: 14,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                gap: 10,
            }}>
                <Image source={require("@/assets/images/googleIcon.png")} style={{
                    width: 23,
                    height: 23,
                    resizeMode: 'contain',
                }} />
                <Text style={{
                    fontSize: 19,
                    fontWeight: 600,
                    color: "#fbfbfb",
                }}>
                    Continue with Google
                </Text>
            </TouchableOpacity>
        </>
    )
}

export default GoogleAuthentication