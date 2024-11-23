import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

const Handler = (props: { text: string }) => {
    const [ifCallStatus, setIfCallStatus] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIfCallStatus(false);
        }, 1000);
    }, [])

    return (
        <>
            {ifCallStatus &&
                < View style={styles.indicator} >
                    <Text style={{
                        color: "#dedede",
                        fontSize: 16,
                        fontWeight: 700,
                    }}>{props.text}</Text>
                </View >
            }
        </>
    )


}

const styles = StyleSheet.create({
    indicator: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        width: 200,
        position: "absolute",
        left: "50%",
        transform: [{ translateX: -100 }],
        bottom: 20,
        borderRadius: 50,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Handler