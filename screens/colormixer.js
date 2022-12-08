import { View, NativeModules } from "react-native";
import { LinearProgress, Text, Button, Slider, Dialog } from '@rneui/base';
import React from "react";
import style from "../assets/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rgbHex from 'rgb-hex';

export default class ColorMixer extends React.Component {
    batas = 255;
    // qRed = Math.floor(Math.random() * 255) + 1;
    // qBlue = Math.floor(Math.random() * 255) + 1;
    // qGreen = Math.floor(Math.random() * 255) + 1;


    constructor() {
        super();
        this.state = {
            count: this.batas,
            time: 0,
            hintUsed: true,
            hintR: false,
            hintG: false,
            hintB: false,
            oneSecInterval: setInterval(() => {
                // jika waktu masih ada dan confirm dialog give up tidak tampil waktu hitung mundur dan total waktu main tambah 1
                if (this.state.count >= 0 && !global.confirmgiveup && !this.state.result) {
                    this.setState(
                        this.state = {
                            count: this.state.count - 1,
                            time: this.state.time + 1
                        }
                    )
                }
                // jika skor di state >=100 dan hintR/G/B salah satunya belum muncul
                if (this.state.skor >= 100 && this.state.hintR == false) {
                    this.setState(
                        this.state = {
                            hintUsed: false
                        }
                    )
                } else if (this.state.skor >= 100 && this.state.hintG == false) {
                    this.setState(
                        this.state = {
                            hintUsed: false
                        }
                    )
                } else if (this.state.skor >= 100 && this.state.hintB == false) {
                    this.setState(
                        this.state = {
                            hintUsed: false
                        }
                    )
                } else if (this.state.hintR == true && this.state.hintG == true && this.state.hintB == true) {
                    this.setState(
                        this.state = {
                            hintUsed: true
                        }
                    )
                } else if (this.state.skor < 100) {
                    this.setState(
                        this.state = {
                            hintUsed: true
                        }
                    )
                }
                //jika confirm dialog giveup tampil, setstate agar rendernya jalan
                if (global.confirmgiveup) {
                    this.setState(
                        this.state = {
                            confirmgiveup: true
                        }
                    )
                }
            }, 1000),
            redVal: 255,
            greenVal: 255,
            blueVal: 255,
            hint: '',
            hintMultiplier: 1,
            guessMultiplier: 0,
            //tampilan result di set false
            result: false,
            // skorPenampung: 0,
            skor: 1000,
            tebakan: 0,
            totalTebakan: 0,
            numberRed: Math.floor(Math.random() * 255) + 1,
            numberGreen: Math.floor(Math.random() * 255) + 1,
            numberBlue: Math.floor(Math.random() * 255) + 1,
            nomor: 0,
            hintuse: 0,
            average: 0,
            username: global.activeuser,
        }
    }



    doSave = async (username, skor) => {
        try {
            // var item = { name: username, score: skor };
            const storage = await AsyncStorage.getItem('result');
            if (storage != null) {
                console.debug('storage:' + storage);
                let arr = JSON.parse(storage);
                console.debug('arr:' + arr);
                let item = [username, skor];
                console.debug('item:' + item);
                arr.push(item);
                await AsyncStorage.setItem('result', JSON.stringify(arr));
            } else if (storage == null) {
                let item = [[username, skor]];
                console.debug('item:' + item);
                await AsyncStorage.setItem('result', JSON.stringify(item));
            }
            alert('data berhasil disimpan');
            this.setState({
                result: true

            })

        } catch (e) {
            // saving error
        }
    }

    answerCheck() {
        this.state.tebakan++;
        this.state.totalTebakan++;
        var total;
        var no;
        var skorsoal;

        // var penampung;
        // var g;

        //jika jawaban benar
        if (this.state.redVal == this.state.numberRed && this.state.greenVal == this.state.numberGreen && this.state.blueVal == this.state.numberBlue) {
            if (this.state.tebakan >= 5)
                this.state.guessMultiplier = 1;
            else if (this.state.tebakan < 5)
                this.state.guessMultiplier = 5 - this.state.tebakan;
            skorsoal = this.state.hintMultiplier * this.state.guessMultiplier * this.state.count;
            console.debug('hintmul:' + this.state.hintMultiplier);
            console.debug('guessmul:' + this.state.guessMultiplier);
            console.debug('sisawaktu:' + this.state.count);
            console.debug('skorsoalini' + skorsoal);
            total = this.state.skor + skorsoal;
            console.debug('finalscore:' + total);
            no = this.state.nomor + 1;
            console.debug('nomorsoalberhasil' + no);
            this.setState(
                this.state = {
                    skor: total,
                    count: this.batas,
                    hintR: false,
                    hintG: false,
                    hintB: false,
                    nomor: no,
                    redVal: 255,
                    greenVal: 255,
                    blueVal: 255,
                    hint: '',
                    hintMultiplier: 1,
                    guessMultiplier: 0,
                    // skorPenampung: 0,
                    hintUsed: false,
                    tebakan: 0,
                    numberRed: Math.floor(Math.random() * 255) + 1,
                    numberGreen: Math.floor(Math.random() * 255) + 1,
                    numberBlue: Math.floor(Math.random() * 255) + 1
                }
            )
            console.debug(this.state.numberRed);
            console.debug(this.state.numberGreen);
            console.debug(this.state.numberBlue);
        }
        //jika jawaban salah
        else {
            alert("Wrong color mix, try again " + global.activeuser + " :)");
        }

        // // jika button guess dipencet >=5 dalam sebuah soal (nyoba jawab ke 5x dst.)
        // if (this.state.tebakan >= 5) {
        //     //jika jawaban benar
        //     if (this.state.redVal == this.state.numberRed && this.state.greenVal == this.state.numberGreen && this.state.blueVal == this.state.numberBlue) {
        //         //guessmultiplier jadi ==1
        //         this.setState(
        //             this.state = {
        //                 guessMultiplier: 1,
        //             }
        //         )
        //         //penampung = skor untuk soal saat itu
        //         penampung = this.state.hintMultiplier * this.state.guessMultiplier * this.state.count;
        //         //isi state skorpenampung dengan skor soal saat itu
        //         this.state.skorPenampung = penampung;
        //         //var total = state skor ditambah skor barusan
        //         total = this.state.skor + this.state.skorPenampung.toFixed(0);
        //         //var nomor = state nomor +1
        //         no = this.state.nomor + 1;
        //         this.setState(
        //             this.state = {
        //                 // skorPenampung: penampung,
        //                 skor: total,
        //                 count: this.batas,
        //                 nomor: no,
        //                 redVal: 255,
        //                 greenVal: 255,
        //                 blueVal: 255,
        //                 hint: '',
        //                 skorPenampung: 0,
        //                 hintMultiplier: 1,
        //                 guessMultiplier: 0,
        //                 hintUsed: false,
        //                 tebakan: 0,
        //                 numberRed: Math.floor(Math.random() * 255) + 1,
        //                 numberGreen: Math.floor(Math.random() * 255) + 1,
        //                 numberBlue: Math.floor(Math.random() * 255) + 1
        //             }
        //         )
        //         console.debug(this.state.numberRed);
        //         console.debug(this.state.numberGreen);
        //         console.debug(this.state.numberBlue);
        //     }
        //     else {
        //         alert("Wrong color mix, try again " + global.activeuser + " :)");
        //     }
        // }
        // // nyoba jawab 1-4x dalam sebuah soal
        // else {
        //     //jika jawaban benar
        //     if (this.state.redVal == this.state.numberRed && this.state.greenVal == this.state.numberGreen && this.state.blueVal == this.state.numberBlue) {
        //         this.state.guessMultiplier = 5 - this.state.tebakan;
        //         penampung = this.state.hintMultiplier * this.state.guessMultiplier * this.state.count;
        //         this.state.skorPenampung = penampung;
        //         total = this.state.skor + this.state.skorPenampung;
        //         no = this.state.nomor + 1;
        //         this.setState(
        //             this.state = {

        //                 skor: total,
        //                 count: this.batas,
        //                 nomor: no,
        //                 redVal: 255,
        //                 greenVal: 255,
        //                 blueVal: 255,
        //                 hint: '',
        //                 hintMultiplier: 1,
        //                 guessMultiplier: 0,
        //                 skorPenampung: 0,
        //                 hintUsed: false,
        //                 tebakan: 0,
        //                 numberRed: Math.floor(Math.random() * 255) + 1,
        //                 numberGreen: Math.floor(Math.random() * 255) + 1,
        //                 numberBlue: Math.floor(Math.random() * 255) + 1
        //             }
        //         )
        //         console.debug(this.state.numberRed);
        //         console.debug(this.state.numberGreen);
        //         console.debug(this.state.numberBlue);
        //     }
        //     else {
        //         alert("Wrong color mix, try again " + global.activeuser + " :)");
        //     }
        // }
    }

    restart() {
        this.setState(
            this.state = {
                count: this.batas,
                hintR: false,
                hintG: false,
                hintB: false,
                time: 0,
                redVal: 255,
                greenVal: 255,
                blueVal: 255,
                hint: '',
                hintMultiplier: 1,
                guessMultiplier: 0,
                result: false,
                hintUsed: true,
                // skorPenampung: 0,
                skor: 0,
                tebakan: 0,
                totalTebakan: 0,
                numberRed: Math.floor(Math.random() * 255) + 1,
                numberGreen: Math.floor(Math.random() * 255) + 1,
                numberBlue: Math.floor(Math.random() * 255) + 1,
                nomor: 0,
                hintuse: 0,
                average: 0,

            }
        )
    }

    cekHint(acak) {
        console.debug(acak);
        var hasilacak = acak[Math.floor(Math.random() * acak.length)];
        console.debug(hasilacak);
        switch (hasilacak) {
            case this.state.numberRed:
                console.debug('masuk red');
                if (!this.state.hintR) {
                    this.state.hintR = true;
                    this.state.hint += ' ' + this.state.numberRed;
                } else {
                    this.cekHint([this.state.numberRed, this.state.numberGreen, this.state.numberBlue]);
                }
                break;
            case this.state.numberGreen:
                console.debug('masuk green');
                if (!this.state.hintG) {
                    this.state.hintG = true;
                    this.state.hint += ' ' + this.state.numberGreen;
                } else {
                    this.cekHint([this.state.numberRed, this.state.numberGreen, this.state.numberBlue]);
                }
                break;
            case this.state.numberBlue:
                console.debug('masuk blue');
                if (!this.state.hintB) {
                    this.state.hintB = true;
                    this.state.hint += ' ' + this.state.numberBlue;
                } else {
                    this.cekHint([this.state.numberRed, this.state.numberGreen, this.state.numberBlue]);
                }
                break;
        }
    }

    buyHint() {
        var u = this.state.hintuse + 1;
        this.state.skor = this.state.skor - 100;

        this.cekHint([this.state.numberRed, this.state.numberGreen, this.state.numberBlue]);

        this.setState(
            this.state = {
                // hintUsed: true,
                count: (this.state.count / 2).toFixed(0),
                // hint: "Hint : #" + rgbHex(this.state.numberRed, this.state.numberGreen, this.state.numberBlue),
                // hint: "Hint : " + 'red(' + this.state.numberRed + ',' + this.state.numberGreen + ',' + this.state.numberBlue + ')',
                //+','+this.state.numberBlue+','+this.state.numberBlue
                //ambil salah satu colorVal dari state soal
                //disini nanti juga setskornya diminus
                hintMultiplier: 0.5,
                hintuse: u
            }
        )
    }

    render() {
        // jika waktu masih ada dan belum giveup tampilkan game
        if (this.state.count > 0 && !global.giveup && !this.state.result) {
            return (
                //#region GAMEON
                <View style={style.container}>
                    <View style={style.linear_progress}>
                        <LinearProgress variant='determinate'
                            value={1 - (this.state.count / this.batas)}
                            color={"rgb(" + this.state.numberRed + "," + this.state.numberGreen + "," + this.state.numberBlue + ")"}
                            //warna e mengikuti soal
                            style={style.linear_progress} />
                        <Text style={style.text_linear_progress}>{toHHMMSS(this.state.count)}</Text>
                    </View>
                    <Text style={style.text_score}>Score: {this.state.skor}</Text>

                    {/* ---Start Soal Area--- */}
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        marginTop: 20,
                    }}>
                        <View style={{
                            width: '50%',
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: '#265e80',
                                width: '100%',
                                textAlign: 'center',
                            }}>Guess this color!</Text>
                            <View style={{
                                width: 100,
                                height: 100,
                                margin: 10,
                                backgroundColor: "rgb(" + this.state.numberRed + "," + this.state.numberGreen + "," + this.state.numberBlue + ")",
                                alignSelf: 'center',
                                borderColor: '#000',
                                borderWidth: 2,
                            }}></View>
                        </View>
                        <View style={{
                            width: '50%',
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: '#265e80',
                                width: '100%',
                                textAlign: 'center',
                            }}>Your color</Text>
                            <View style={{
                                width: 100,
                                height: 100,
                                margin: 10,
                                backgroundColor: 'rgba(' + this.state.redVal + ',' + this.state.greenVal + ',' + this.state.blueVal + ',1)',
                                alignSelf: 'center',
                                borderColor: '#000',
                                borderWidth: 2,
                            }}></View>
                        </View>
                    </View>
                    {/* ---End Soal Area--- */}
                    {/* ---Start Hint Area--- */}
                    <View>
                        <Text style={{
                            fontSize: 18,
                            color: '#265e80',
                            margin: 20,
                            alignSelf: 'center',
                        }}>{this.state.hint}</Text>
                        <Button
                            title="Buy Hint"
                            onPress={() => { this.buyHint() }}
                            buttonStyle={style.btn_style}
                            containerStyle={style.btn_container}
                            disabled={this.state.hintUsed} />
                    </View>
                    {/* ---End Hint Area--- */}
                    {/* ---Start Container Slider--- */}
                    <View style={style.container}>
                        {/* ---Start Red Slider--- */}
                        <View style={style.slider_container}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: 'red',
                                    margin: 20,
                                    alignSelf: 'center',
                                }}
                            >
                                Red: {this.state.redVal}
                            </Text>
                            <Slider
                                value={this.state.redVal}
                                minimumValue={0}
                                maximumValue={255}
                                step={1}
                                thumbStyle={{
                                    backgroundColor: 'red',
                                }}
                                onValueChange={(value) => {
                                    this.setState({
                                        redVal: value
                                    })
                                }}

                            ></Slider>
                        </View>
                        {/* ---End Red Slider--- */}
                        {/* ---Start Green Slider--- */}
                        <View style={style.slider_container}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: 'green',
                                    margin: 20,
                                    alignSelf: 'center',
                                }}
                            >
                                Green: {this.state.greenVal}
                            </Text>
                            <Slider
                                value={this.state.greenVal}
                                minimumValue={0}
                                maximumValue={255}
                                step={1}
                                thumbStyle={{
                                    backgroundColor: 'green',
                                }}
                                onValueChange={(value) => {
                                    this.setState({
                                        greenVal: value
                                    })
                                }}

                            ></Slider>
                        </View>
                        {/* ---End Green Slider--- */}
                        {/* ---Start Blue Slider--- */}
                        <View style={style.slider_container}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: 'blue',
                                    margin: 20,
                                    alignSelf: 'center',
                                }}
                            >
                                Blue: {this.state.blueVal}
                            </Text>
                            <Slider
                                value={this.state.blueVal}
                                minimumValue={0}
                                maximumValue={255}
                                step={1}
                                thumbStyle={{
                                    backgroundColor: 'blue',
                                }}
                                onValueChange={(value) => {
                                    this.setState({
                                        blueVal: value
                                    })
                                }}

                            ></Slider>
                        </View>

                        {/* ---End Blue Slider--- */}
                    </View>
                    {/* ---End Container Slider--- */}
                    <View style={{
                        bottom: 40,
                    }}>
                        <Button
                            title="Guess Color"
                            buttonStyle={style.btn_style}
                            containerStyle={style.btn_container}
                            onPress={() => { this.answerCheck() }}
                        />
                    </View>
                </View>
                //#endregion
            )
        }
        // jika waktu habis dan result tidak tampil, tampilkan dialog 
        else if (this.state.count <= 0 && !this.state.result) {
            return (
                //#region GAMEOVER
                <Dialog
                    isVisible={true}
                    overlayStyle={style.dialog}
                >
                    <Dialog.Title title="GAME OVER" />
                    <Text>Good Game Great Eyes!</Text>
                    <Dialog.Actions>
                        <Dialog.Button title="SHOW RESULT" onPress={() =>
                            this.doSave(global.activeuser, this.state.skor)
                        } />
                    </Dialog.Actions>
                </Dialog>
                //#endregion
            )
        }
        // jika give up dan result tidak tampil, tampilkan dialog
        else if (global.giveup == true && !this.state.result) {
            return (
                //#region GAMEOVER
                <Dialog
                    isVisible={true}
                    overlayStyle={style.dialog}
                >
                    <Dialog.Title title="GAME OVER" />
                    <Text>Good Game Great Eyes!</Text>
                    <Dialog.Actions>
                        <Dialog.Button title="SHOW RESULT" onPress={() =>
                            this.doSave(global.activeuser, this.state.skor)
                        } />
                    </Dialog.Actions>
                </Dialog>
                //#endregion
            )
        }
        // jika tampilan result true, tampilkan result
        else if (this.state.result == true) {
            global.giveup = false;
            this.props.navigation.setOptions({ title: 'Result' })
            var avegues = 0;
            if (this.state.nomor == 0)
                avegues = (this.state.totalTebakan / 1).toFixed(2);
            else if (this.state.totalTebakan != 0 || this.state.nomor != 0)
                avegues = (this.state.totalTebakan / this.state.nomor).toFixed(2);
            return (
                <View style={style.container}>
                    <Text style={style.text_judul}>
                        Final Score : {this.state.skor}
                    </Text>
                    <Text style={style.text_body}>
                        Total time played : {toHHMMSS(this.state.time)}{'\n'}{'\n'}
                        Color mixed : {this.state.nomor}{'\n'}{'\n'}
                        Average guesses : {avegues}{'\n'}{'\n'}
                        Hints used : {this.state.hintuse}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly',
                        marginTop: 15,
                    }}>

                        <Button title={'HIGH SCORES'}
                            buttonStyle={style.btn_style}
                            containerStyle={{ width: '42%', margin: 5 }}
                            onPress={() => this.props.navigation.navigate("HighScore")}
                        />

                        <Button title={'PLAY AGAIN'}
                            buttonStyle={style.btn_style}
                            containerStyle={{ width: '42%', margin: 5 }}
                            onPress={() => this.restart()} />
                    </View>
                    <Button title={'MAIN MENU'}
                        buttonStyle={style.btn_style}
                        containerStyle={style.btn_container}
                        onPress={() => this.props.navigation.navigate("Home")} />
                </View>
            )
        }

    }
}

function toHHMMSS(v) {
    var sec_num = parseInt(v, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}