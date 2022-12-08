import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1dd96',
    },
    text_judul: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#265e80',
        alignSelf: 'center',
    },
    text_body: {
        fontSize: 18,
        color: '#265e80',
        margin: 10,
    },
    btn_style: {
        borderRadius: 8,
        backgroundColor: '#a1346f',
    },
    btn_container: {
        width: '90%',
        alignSelf: 'center',
    },
    drawer: {
        flex: 1,
        backgroundColor: '#f0952a',
    },
    drawer_header: {
        backgroundColor: '#265e80',
        height: 275,
    },
    text_drawer_header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f1dd96',
        position: 'absolute',
        bottom: 10,
        left: 20,
    },
    container_logout: {
        height: 70,
        marginLeft: 30,
        bottom: 15,
    },
    linear_progress: {
        height: 30,
        position: 'absolute',
        width: '100%',
    },
    text_linear_progress: {
        position: 'relative',
        textAlign: 'center',
        color: '#fff',
        fontSize: 24,
    },
    text_score: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#265e80',
        marginTop: 30,
        textAlign: 'right',
        marginRight: 10,
    },
    slider_container: {
        marginHorizontal: 20,
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#917f54',
    },
    dialog: {
        backgroundColor: '#f1dd96',
        borderRadius: 10,
    },
    img: {
        width: 100,
        height: 100,
    },
    text_atas: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor:'#000',
        textShadowOffset:{width:2, height:2},
        textShadowRadius:2,
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center',
        top: 0
    },
    text_bawah: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor:'#000',
        textShadowOffset:{width:2, height:2},
        textShadowRadius:2,
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center',
        bottom: 0
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        borderRadius: 100,
    },
    input: {
        borderColor: '#fff',
        height: 40,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    listitem:{
        width:'90%',
        backgroundColor:'#f1dd96',
        alignSelf:'center',
        borderBottomColor:'#000',
        borderBottomWidth:1
    }
});
