import React, { useEffect, useRef, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonText } from '@ionic/react';
import { BrowserMultiFormatReader } from "@zxing/library";
import { saveAttendance, getAttendanceList, clearAttendance } from '../utils/storage';


const QRScanner: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState('');
    const [list, setList] = useState(getAttendanceList());
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        let codeReader: BrowserMultiFormatReader | null = null;
        if (scanning) {
            codeReader = new BrowserMultiFormatReader();
            codeReader.decodeFromVideoDevice(null, videoRef.current!, (result, err) => {
                if (result) {
                    const text = result.getText();
                    if (text.startsWith("ATTEND:")) {
                        const mssv = text.replace("ATTEND:", "").trim();
                        saveAttendance(mssv);
                        setList(getAttendanceList());
                    }
                }
                if (err && !(err.name === 'NotFoundException')) {
                    setError('Lỗi khi quét mã QR hoặc không thể truy cập camera.');
                }
            });
        }
        return () => {
            codeReader?.reset();
        };
    }, [scanning]);

    const handleReset = () => {
        clearAttendance();
        setList([]);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Quét QR</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="flex flex-col items-center justify-center">
                {error && <IonText color="danger">{error}</IonText>}
                <div className="w-full flex flex-col items-center my-4">
                    <video ref={videoRef} className="w-64 h-64 bg-black" />
                    <IonButton onClick={() => setScanning(s => !s)} color={scanning ? 'danger' : 'primary'} className="mt-2">
                        {scanning ? 'Dừng quét' : 'Bắt đầu quét'}
                    </IonButton>
                    <IonButton onClick={handleReset} color="medium" className="mt-2">Reset</IonButton>
                </div>
                <IonList className="w-full max-w-md mx-auto">
                    {list.length === 0 && <IonItem><IonLabel>Chưa có dữ liệu.</IonLabel></IonItem>}
                    {list.map((item, idx) => (
                        <IonItem key={idx}>
                            <IonLabel>{item.mssv}</IonLabel>
                            <IonLabel slot="end">{item.time}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};


export default QRScanner;